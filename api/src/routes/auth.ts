import { Router } from 'express'
import { isAuthenticated } from '../middleware'
import { User } from '../controllers/index'

const router = Router()

router.post('/signup', User.signup)
router.post('/signin', User.signin)

router.use(isAuthenticated)

router.post('/signout', User.signout)

export default router