import { loadState } from '../localStorage'

export const getToken = () => {
    const { data: { token } } = loadState('user')

    return token
}