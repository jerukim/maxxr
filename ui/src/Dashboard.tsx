import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useSelector } from 'react-redux'
import { RootState } from './types'

interface DashboardProps extends RouteComponentProps { }

const Dashboard = (props: DashboardProps) => {
    const { username } = useSelector((state: RootState) => state.user)
    return (
        <div>
            DASHBOARD
            {username}
        </div>
    )
}

export default Dashboard