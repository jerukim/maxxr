// const db = require('../db/db')
import db from '../db'

interface UserInput {
    username: string,
    password: string,
}

interface UserData {
    id: number,
    username: string,
    password: string,
    token: string,
    created_at: string,
    updated_at: string,
}

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
        // .returning()

        return user
    }

    static returnValues = ['id', 'username', 'token', 'created_at']
}

export default new User()