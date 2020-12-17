import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '.'
import { User } from '../api'
import { deleteState, loadState, saveState } from '../localStorage'
import { UserAuthInput, Thunk, AuthMethod, APIError, UserData } from '../types'

export const useAuth = () => {
    return useSelector((state: RootState) => !!state.user.data.token)
}

interface UserState {
    data: UserData,
    loading: boolean,
    error: APIError | null
}

const persistedUserState = loadState('user')

const defaultUserState: UserState = {
    data: {
        id: -1,
        username: '',
        token: '',
    },
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: persistedUserState || defaultUserState,
    reducers: {
        authStart: (state) => {
            state.loading = true
            state.error = null
        },

        authSuccess: (state, action) => {
            const { id, username, token } = action.payload
            state.data.id = id
            state.data.username = username
            state.data.token = token
            state.loading = false
            state.error = null

            saveState('user', state)
        },
        authFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        signoutSuccess: (state) => {
            state.data = defaultUserState.data
            state.loading = false
            state.error = null

            deleteState('user')
        },
        signoutFailure: (state, action) => {
            const { error } = action.payload
            state.data = defaultUserState.data
            state.loading = false
            state.error = error
        }
    }
})

export const {
    authStart,
    authSuccess,
    authFailure,
    signoutSuccess,
    signoutFailure
} = userSlice.actions

export default userSlice.reducer

export const auth = (method: AuthMethod, credentials: UserAuthInput): Thunk => async dispatch => {
    dispatch(authStart())

    try {
        const user = await User.auth(method, credentials)

        if (user.error) throw user.error

        dispatch(authSuccess(user))

        return

    } catch (err) {
        dispatch(authFailure(err))
    }
}

export const signout = (): Thunk => async dispatch => {
    dispatch(authStart())

    try {
        const res = await User.signout()

        if (res.status !== 204) throw new Error('signout failure')

        dispatch(signoutSuccess())

    } catch (error) {
        dispatch(signoutFailure(error))
    }
}