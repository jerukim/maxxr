import db from '../db'

class Reward {
    async findAll(cardId: number, userId: number) {
        const rewards = await db('reward')
            .select('reward.rate', 'reward.active_quarter', 'reward.expires_at', 'reward.expires_in', 'category.name as category', 'subcategory.name as subcategory')
            .leftJoin('category', 'reward.category_id', '=', 'category.id')
            .leftJoin('subcategory', 'reward.subcategory_id', '=', 'subcategory.id')
            .join('card', 'reward.card_id', '=', 'card.id')
            .join('user_card', 'user_card.card_id', '=', 'card.id')
            .where({ 'reward.card_id': cardId, 'user_card.user_id': userId })
            .whereRaw('(reward.active_quarter ISNULL OR reward.active_quarter::INTEGER = EXTRACT(QUARTER FROM CURRENT_DATE)::INTEGER)')
            .whereRaw('(reward.expires_at ISNULL OR reward.expires_at >= CURRENT_DATE)')
            .whereRaw('(reward.expires_in ISNULL OR user_card.approved_on + reward.expires_in::INTERVAL <= CURRENT_DATE)')
            .orderBy('reward.rate')

        return rewards
    }
}

export default new Reward()