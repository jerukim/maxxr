import { Router } from 'express'
import { User } from '../controllers'

export const router = Router()

router.get('/', User.wallet)

export default router