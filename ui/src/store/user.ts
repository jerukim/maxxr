import { createSlice } from '@reduxjs/toolkit'
import { User } from '../api'
import { UserAuthInput, Thunk, AuthMethod, APIError } from '../types'

interface UserState {
    id?: number,
    username?: string,
    token?: string,
    loading: boolean,
    error: APIError | null
}

const defaultUserState: UserState = {
    id: -1,
    username: '',
    token: '',
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState,
    reducers: {
        authStart: (state) => {
            state.loading = true
            state.error = null
        },

        authSuccess: (state, action) => {
            const { id, username, token } = action.payload
            state.id = id
            state.username = username
            state.token = token
            state.loading = false
            state.error = null
        },
        authFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        signoutSuccess: (state, action) => {
            state = defaultUserState
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