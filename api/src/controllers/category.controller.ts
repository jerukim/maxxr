import { Request, Response, NextFunction } from 'express'
import { Category } from '../models/index'

class CategoryController {
    async list(_: Request, response: Response, next: NextFunction) {
        try {
            const categories = await Category.findAll()

            response
                .status(200)
                .json(categories)
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()