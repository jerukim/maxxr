import { Request, Response, NextFunction } from 'express'
import { Auth, User, UserCard, Reward, Category } from '../models/index'
import {
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError,
} from '../models/error'
import { SubcategoryData, RewardData, RecommendedCardData, RewardCategory } from 'src/types'

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

            const subcategories: SubcategoryData[] = []

            // map rewards to cards
            const wallet = userCards.map((card, i) => {
                const cardRewards = userCardsRewards[i]

                let baseRate = 0
                const cardRewardsByCategory: { [key: string]: RewardData[] } = {}
                const extras = []

                for (const reward of cardRewards) {
                    if (!reward.category && !reward.subcategory) {
                        baseRate = reward.rate
                        continue
                    }

                    if (reward.category) {
                        cardRewardsByCategory[reward.category] = [...(cardRewardsByCategory[reward.category] || []), reward]
                    }

                    if (reward.subcategory) {
                        extras.push(reward)
                        subcategories.push({ card_id: card.card_id, ...reward })
                    }
                }

                const reward_categories: RewardCategory[] = Object.entries(cardRewardsByCategory).map(([category, rewards]) => {
                    return {
                        category,
                        category_rate: rewards.length ? rewards[0].rate : null,
                        rewards
                    }
                })

                return {
                    ...card,
                    base_rate: baseRate,
                    reward_categories,
                    reward_subcategories: extras
                }
            })

            let categories = await Category.findAll()

            // map card rewards to categories
            categories = categories.map(category => {
                const recommended: RecommendedCardData[] = []

                for (const card of wallet) {
                    const { reward_categories, card_id, base_rate } = card

                    const { rewards, category_rate } = reward_categories.find((reward: RewardData) =>
                        reward.category === category.name
                    ) || { rewards: [], category_rate: null }

                    recommended.push({
                        card_id,
                        base_rate,
                        category_rate,
                        rewards
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

                recommended = recommended.sort((a: RecommendedCardData, b: RecommendedCardData) => {
                    return (b.category_rate || b.base_rate) - (a.category_rate || a.base_rate)
                })

                return {
                    ...category,
                    recommended
                }
            })

            response
                .status(200)
                .json({
                    wallet,
                    categories,
                    subcategories
                })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new UserController()