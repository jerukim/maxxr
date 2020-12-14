export interface UserAuthInput {
    username: string,
    password: string,
}

export interface UserData {
    id: number,
    username: string,
    password?: string,
    token: string,
    created_at?: string,
    updated_at?: string,
}

