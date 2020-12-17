import { Request, Response, NextFunction } from 'express'
import { Auth, User, UserCard, Reward } from '../models/index'
import {
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError,
} from '../models/error'

class UserController {
    async signup(request: Request, response: Response, next: NextFunction) {
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

    async signin(request: Request, response: Response, next: NextFunction) {
        try {
            const data = request.body

            if (!data.username || !data.password) {
                throw new ValidationError('missing username or password')
            }

            const user = await User.getUserByName(data.username)

            if (!user) {
                throw new NotFoundError('user not found')
            }
            // user.password = ''

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

    async signout(_: Request, response: Response, next: NextFunction) {
        try {
            const { user } = response.locals

            await User.update(user.id, {
                ...user,
                token: null
            })

            response
                .status(204)
                .send()

        } catch (error) {
            next(error)
        }
    }

    async wallet(_: Request, response: Response, next: NextFunction) {
        try {
            const { user } = response.locals

            const userCards = await UserCard.findAllByUserId(user.id)

            const userCardsRewards = await Promise.all(userCards.map(({ card_id }) => {
                return Reward.findAllByCardId(card_id)
            }))

            const wallet = userCards.map((card, i) => {
                return {
                    ...card,
                    rewards: userCardsRewards[i]
                }
            })

            response
                .status(200)
                .json(wallet)

        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()