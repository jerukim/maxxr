const db = require('../db/db')

class User {
    async create(data) {
        const [user] = await db('user')
            .insert(data)
            .returning(User.returnValues)

        return user
    }

    async update(id, data) {
        const [user] = await db('user')
            .where({ id })
            .update(data)
            .returning(User.returnValues)

        return user
    }

    async getUserByName(username) {
        const [user] = await db('user')
            .where({ username })
            .returning([User.returnValues])

        return user
    }

    static returnValues = ['id', 'username', 'token', 'created_at']
}


module.exports = new User