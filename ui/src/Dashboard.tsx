import React, { useEffect, useState } from 'react'
import { getToken } from './api/utils'
import { Card } from 'antd'
import CreditCardList from './components/CreditCardList'
import CreditCardItem from './components/CreditCardItem'

import {
    CardData,
    CardTypeSymbolMap,
    CategoryData,
} from './types'

const Dashboard = () => {
    const [wallet, setWallet] = useState<CardData[]>([])
    const [categories, setCategories] = useState<CategoryData[]>([])
    const token = getToken()

    useEffect(() => {
        const getDashboardData = async () => {
            const res = await fetch('/wallet', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())

            setWallet(res.wallet)
            setCategories(res.categories)
        }

        if (!wallet.length && !categories.length) {
            getDashboardData()
        }
    }, [categories.length, token, wallet.length])

    // const userHasCards = wallet.length > 0

    const typeSymbolMap: CardTypeSymbolMap = {
        point: 'x',
        mile: 'x',
        cash: '%',
    }

    return (
        <div className='dashboard'>
            <div className='dashboard-container'>

                <CreditCardList>
                    {wallet.map(card => (
                        <CreditCardItem
                            card={card}
                            symbol={typeSymbolMap[card.type]}
                        />
                    ))}
                </CreditCardList>

                <div className='dashboard-categories'>
                    <h1>Categories</h1>
                    {categories.map(category => {

                        const categorytopCard = category.recommended[0]
                        const topCard = wallet.find(card => card.card_id === categorytopCard.card_id)
                        const topCardType = topCard?.type || 'cash'
                        const topCardTypeSymbol = typeSymbolMap[topCardType]
                        const topCardRewardRate = categorytopCard.category_rate || categorytopCard.base_rate
                        const topRewardRate = `${topCardRewardRate}${topCardTypeSymbol}`

                        const rewardValue = 1 * topCardRewardRate

                        const rewardValueDescription = `$1 spent = ${rewardValue} cents`

                        return (
                            <Card className='dashboard-category' title={category.name} extra={topRewardRate}>
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
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard