import { Card } from 'antd'

import {
    CardData,
    CardTypeSymbol
} from '../types'

interface CreditCardItemProps {
    symbol: CardTypeSymbol,
    card: CardData
}

const CreditCardItem = ({ symbol, card }: CreditCardItemProps) => {
    const cardKey = `${card.card_id}-${card.name}`
    return (
        <Card
            key={cardKey}
            className='dashboard-card'
            title={card.name}
        >
            <div className='dashboard-card-rewards'>

                <div className='dashboard-card-reward'>
                    <h3>{card.base_rate}{symbol}</h3>
                    <h3>default</h3>
                </div>

                {card.reward_categories.map(({ category, category_rate }, i) => {
                    const rewardKey = `${i}-${card.card_id}-${category}`

                    return (
                        <div
                            key={rewardKey}
                            className='dashboard-card-reward'
                        >
                            <h3>{category_rate}{symbol}</h3>
                            <h3>{category}</h3>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default CreditCardItem