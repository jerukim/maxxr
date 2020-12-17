import db from '../db'

class UserCard {
    async findAllByUserId(userId: number) {
        const userCards = await db('user_card')
            .join('card', 'user_card.card_id', '=', 'card.id')
            .join('reward_type', 'card.reward_type_id', '=', 'reward_type.id')
            .join('issuer', 'card.issuer_id', '=', 'issuer.id')
            .join('network', 'card.network_id', '=', 'network.id')
            .select('user_card.card_id', 'card.name', 'reward_type.name as type', 'issuer.name as issuer', 'network.name as network', 'user_card.approved_on')
            .where({ user_id: userId })

        return userCards
    }
}

export default new UserCard()