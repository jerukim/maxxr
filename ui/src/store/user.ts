import { createSlice } from '@reduxjs/toolkit'
import { User } from '../api'
import { deleteState, loadState, saveState } from '../localStorage'
import { UserAuthInput, Thunk, AuthMethod, APIError, UserData } from '../types'

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
        },
        authFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        signoutSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.data = defaultUserState.data
        },
        signoutFailure: (state, action) => {
            // state = defaultUserState
            state.loading = false
            state.error = null
        }
    }
})

export const { authStart, authSuccess, authFailure, signoutSuccess, signoutFailure } = userSlice.actions

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