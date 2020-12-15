export * from './store'
export type { AuthMethod } from './auth/Auth'

export interface APIError {
    code: number,
    message: string,
    detail: string
}

export interface UserAuthInput {
    username: string,
    password: string,
}

export interface UserData {
    id?: number,
    username?: string,
    token?: string,
    error?: APIError,
    created_at?: string,
    updated_at?: string,
}

