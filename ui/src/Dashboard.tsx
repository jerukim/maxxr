import React, { useEffect, useState } from 'react'
import { getToken } from './api/utils'
import {
    CreditCardList,
    CreditCardItem,
    CategoryItem,
    CategoryList
} from './components'
import {
    CardData,
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

    return (
        <div className='dashboard'>
            <div className='dashboard-container'>
                <CreditCardList>
                    {wallet.map(card =>
                        <CreditCardItem card={card} />
                    )}
                </CreditCardList>

                <CategoryList>
                    {categories.map(category =>
                        <CategoryItem
                            category={category}
                            wallet={wallet}
                        />
                    )}
                </CategoryList>
            </div>
        </div>
    )
}

export default Dashboard