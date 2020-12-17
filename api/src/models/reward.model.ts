import db from '../db'

class Reward {
    async findAllByCardId(cardId: number) {
        const rewards = await db('reward')
            .leftJoin('category', 'reward.category_id', '=', 'category.id')
            .leftJoin('subcategory', 'reward.subcategory_id', '=', 'subcategory.id')
            .select('reward.rate', 'reward.active_quarter', 'reward.expires_at', 'reward.expires_in', 'category.name as category', 'subcategory.name as subcategory')
            .where({ card_id: cardId })

        return rewards
    }
}

export default new Reward()