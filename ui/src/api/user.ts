import { UserAuthInput } from '../types'

interface UserModel {
    [key: string]: any
}

const signin = async (credentials: UserAuthInput) => {
    return await fetch(`/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(res => res.json())
}

const signup = async (credentials: UserAuthInput) => {

}

export default {
    signin,
    signup
} as UserModel