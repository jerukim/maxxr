import { Card } from 'antd'
import { typeSymbolMap } from '../constants'
import {
    CardData,
    CategoryData
} from '../types'

interface CategoryItemProps {
    wallet: CardData[],
    category: CategoryData
}

const CategoryItem = ({ category, wallet }: CategoryItemProps) => {
    const categorytopCard = category.recommended[0]
    const topCard = wallet.find(card => card.card_id === categorytopCard.card_id)
    const topCardType = topCard?.type || 'cash'
    const topCardTypeSymbol = typeSymbolMap[topCardType]
    const topCardRewardRate = categorytopCard.category_rate || categorytopCard.base_rate
    const topRewardRate = `${topCardRewardRate}${topCardTypeSymbol}`

    const rewardValue = 1 * topCardRewardRate

    const rewardValueDescription = `$1 spent = ${rewardValue} cents`

    return (
        <Card
            key={category.name}
            className='dashboard-category'
            title={category.name}
            extra={topRewardRate}
        >
            <div className='dashboard-category-card-info'>
                <div className='dashboard-category-card-name'>
                    <h3>{topCard?.name || 'N/A'}</h3>
                </div>
                <div className='dashboard-category-card-reward-value'>
                    <h3>{rewardValueDescription}</h3>
                </div>
            </div>
        </Card>
    )
}

export default CategoryItem