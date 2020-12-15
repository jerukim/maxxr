import React, { Suspense, lazy } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Signin = lazy(() => import('./auth/Signin'))
const Signup = lazy(() => import('./auth/Signup'))
const Dashboard = lazy(() => import('./Dashboard'))

const Routes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path='/auth'>
                    <AuthRoutes />
                </Route>

                <Route path='/dashboard'>
                    <Dashboard />
                </Route>

                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
        </Suspense>
    )
}

const AuthRoutes = () => {
    const { path } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${path}/signin`}>
                <Signin />
            </Route>
            <Route path={`${path}/signup`}>
                <Signup />
            </Route>
        </Switch>
    )
}

export default Routes