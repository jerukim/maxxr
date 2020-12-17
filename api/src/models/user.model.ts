import db from '../db'
import { UserInput, UserData } from '../types'

class User {
    async create(data: UserInput): Promise<UserData> {
        const [user] = await db('user')
            .insert(data)
            .returning(User.returnValues)

        return user
    }

    async update(id: number, data: UserData | object): Promise<UserData> {
        const [user] = await db('user')
            .where({ id })
            .update(data)
            .returning(User.returnValues)

        return user
    }

    async getUserByName(username: string): Promise<UserData> {
        const [user] = await db('user')
            .where({ username })

        return user
    }

    async getUserByToken(token: string): Promise<UserData> {
        const [user] = await db('user')
            .where({ token })

        return user
    }

    static returnValues = ['id', 'username', 'token', 'created_at']
}

export default new User()