import { Router } from 'express'
import { isAuthenticated } from '../middleware'
import { User } from '../controllers/index'

export const authRouter = Router()

authRouter.post('/signup', User.signup)
authRouter.post('/signin', User.signin)

authRouter.use(isAuthenticated)

authRouter.post('/signout', User.signout)