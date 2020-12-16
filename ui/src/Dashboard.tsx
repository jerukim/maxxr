import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './types'


const Dashboard = () => {
    const { username } = useSelector((state: RootState) => state.user.data)
    return (
        <div>
            DASHBOARD
            {username}
        </div>
    )
}

export default Dashboard