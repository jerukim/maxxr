import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getToken } from './api/utils'
import { Card } from 'antd'
import { RootState } from './types'

interface CardData {
    card_id: number,
    name: string,
    type: 'point' | 'mile' | 'cash',
    issuer: string,
    network: string,
    approved_on: string,
    rewards: RewardData[]
}

interface RewardData {
    rate: number,
    active_quarter: string | null,
    expires_at: string | null,
    expires_in: string | null,
    category: string | null,
    subcategory: string | null,
}

interface RecommendedCardData {
    card_id: number,
    base_rate: number,
    category_rate: number | null,
    rewards: RewardData[]
}

interface CategoryData {
    id: number,
    name: string,
    recommended: RecommendedCardData[]
}

const Dashboard = () => {
    const { username } = useSelector((state: RootState) => state.user.data)
    const [wallet, setWallet] = useState<CardData[]>([])
    const [categories, setCategories] = useState<CategoryData[]>([])
    const token = getToken()

    // load wallet and category information
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

    const typeSymbolMap: { [key in CardData['type']]: string } = {
        point: 'x',
        mile: 'x',
        cash: '%',
    }

    return (
        <div className='dashboard'>
            {window.screen.width}
            <div className='dashboard-container'>
                <div className='dashboard-cards'>
                    <h1>My Wallet</h1>
                    {wallet.map(card => {
                        const cardKey = `${card.card_id}-${card.name}`
                        const symbol = typeSymbolMap[card.type]

                        return (
                            <Card key={cardKey} className='dashboard-card' title={card.name}>
                                <div className='dashboard-card-rewards'>
                                    {card.rewards.map((reward, i) => {
                                        const rewardKey = `${i}-${cardKey}-${reward.category}`

                                        return (
                                            <div key={rewardKey} className='dashboard-card-reward'>
                                                <h3>{reward.rate}{symbol}</h3>
                                                <h3>{reward.category || 'default'}</h3>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Card>
                        )
                    })}
                </div>

                <div className='dashboard-categories'>
                    <h1>Categories</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard