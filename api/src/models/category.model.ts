import db from '../db'

class Category {
    async findAll() {
        const categories = await db('category')

        return categories
    }
}

export default new Category()