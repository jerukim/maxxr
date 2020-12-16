import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { loadState, saveState } from '../localStorage'
import throttle from 'lodash/throttle'
import userReducer from './user'

const rootReducer = combineReducers({
    user: userReducer
})

const persistedState = loadState()

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
})

const persistUser = () => {
    const { user } = store.getState()

    saveState({ user })
}

store.subscribe(throttle(persistUser, 1000))

export default store

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, unknown, Action<string>>
