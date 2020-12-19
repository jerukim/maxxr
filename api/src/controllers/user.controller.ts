import { Request, Response, NextFunction } from 'express'
import { Auth, User, UserCard, Reward, Category } from '../models/index'
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

            const userCardsRewards = await Promise.all(
                userCards.map(({ card_id }) => Reward.findAll(card_id, user.id))
            )

            // map rewards to cards
            const wallet = userCards.map((card, i) => {
                const rewards = userCardsRewards[i]
                return {
                    ...card,
                    rewards
                }
            })

            let categories = await Category.findAll()

            // map card rewards to categories
            categories = categories.map(category => {
                // add type
                const recommended: any[] = []

                for (const card of wallet) {
                    const { rewards, card_id } = card

                    // add type
                    const baseReward = rewards.find(
                        (reward: any) => !reward.category && !reward.subcategory
                    )

                    // find all the rewards for card that matches category
                    // add type
                    const cardCategoryRewards = rewards.filter((reward: any) =>
                        reward.category === category.name
                    )

                    recommended.push({
                        card_id,
                        base_rate: baseReward.rate,
                        category_rate: cardCategoryRewards.length ? cardCategoryRewards[0].rate : null,
                        rewards: cardCategoryRewards
                    })
                }

                return {
                    ...category,
                    recommended
                }
            })

            // sort category card recommendations by rate
            categories = categories.map(category => {
                let { recommended } = category

                recommended = recommended.sort((a: any, b: any) => {
                    return (b.category_rate || b.base_rate) - (a.category_rate || a.base_rate)
                })

                return {
                    ...category,
                    recommended
                }
            })

            response
                .status(200)
                .json({ wallet, categories })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new UserController()