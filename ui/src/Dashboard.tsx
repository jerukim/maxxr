import React from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { UserData } from './types'

interface DashboardProps extends RouteComponentProps {
    user: UserData | null
}

const Dashboard = (props: DashboardProps) => {
    const { user } = props
    return (
        <div>
            DASHBOARD
            {user?.username}
        </div>
    )
}

export default Dashboard