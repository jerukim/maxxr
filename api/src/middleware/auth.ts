import { User } from '../models'
import { NextFunction, Request, Response } from 'express'
import { AuthenticationError } from '../models/error'

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { authorization } = request.headers

        if (!authorization) throw new AuthenticationError('missing token')

        const [, token] = authorization.split(' ')

        const user = await User.getUserByToken(token)

        if (!user) throw new AuthenticationError('invalid token')

        response.locals.user = user

        next()

    } catch (error) {
        next(error)
    }
}