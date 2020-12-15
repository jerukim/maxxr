import { AuthMethod, UserAuthInput, UserData } from '../types'

export const auth = async (method: AuthMethod, credentials: UserAuthInput): Promise<UserData> => {
    return await fetch(`/auth/${method}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(res => res.json())
}