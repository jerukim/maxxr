import { Router } from 'express'
import { Category } from '../controllers'

export const router = Router()

router.get('/', Category.list)

export default router