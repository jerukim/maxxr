import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import userReducer from './user'

const rootReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, unknown, Action<string>>
