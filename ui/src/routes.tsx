import React, { Suspense, lazy } from 'react'
import { Router } from '@reach/router'

const Home = lazy(() => import('./Home'))
const Signin = lazy(() => import('./auth/Signin'))
const Signup = lazy(() => import('./auth/Signup'))
const Dashboard = lazy(() => import('./Dashboard'))


const Routes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Home path='/' />
                <Signin path='auth/signin' />
                <Signup path='auth/signup' />
                <Dashboard path='/dashboard' />
            </Router>
        </Suspense>
    )
}

export default Routes