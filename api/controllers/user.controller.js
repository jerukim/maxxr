const { Auth, User } = require('../models')
const {
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError,
} = require('../models/error')

class UserController {
    async signup(request, response, next) {
        try {
            const data = request.body

            if (!data.username || !data.password) {
                throw new ValidationError('missing username or password')
            }

            const password = await Auth.hashPassword(data.password)

            const token = Auth.generateToken()

            const user = await User.create({
                ...data,
                password,
                token
            })

            response
                .status(201)
                .json(user)

        } catch (error) {
            if (error.code === '23505') {
                error = new ConflictError('username already exists')
            }
            next(error)
        }
    }

    async signin(request, response, next) {
        try {
            const data = request.body

            if (!data.username || !data.password) {
                throw new ValidationError('missing username or password')
            }

            const user = await User.getUserByName(data.username)

            if (!user) {
                throw new NotFoundError('user not found')
            }

            const valid = await Auth.checkPassword(user.password, data.password)

            if (!valid) {
                throw new AuthenticationError('incorrect password')
            }

            const token = Auth.generateToken()

            const updatedUser = await User.update(user.id, { token })

            response
                .status(200)
                .json(updatedUser)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController