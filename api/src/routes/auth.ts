import { Router } from 'express'
import { User } from '../controllers/index'

export const authRouter = Router()

authRouter.post('/signup', User.signup)
authRouter.post('/signin', User.signin)