import React, { Suspense, lazy } from 'react'
import { Switch, Route, useRouteMatch, Redirect, RouteProps } from 'react-router-dom'
import { Loading } from './components'
import { useAuth } from './store/user'

const Home = lazy(() => import('./Home'))
const Signin = lazy(() => import('./auth/Signin'))
const Signup = lazy(() => import('./auth/Signup'))
const Dashboard = lazy(() => import('./Dashboard'))

const Routes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route path='/auth'>
                    <AuthRoutes />
                </Route>

                <PrivateRoute path='/dashboard'>
                    <Dashboard />
                </PrivateRoute>

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

interface PrivateRouteProps extends RouteProps { }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const isAuthenticated = useAuth()
    const { location } = rest

    return (
        <Route {...rest}>
            {isAuthenticated ?
                children :
                <Redirect to={{ pathname: '/auth/signin', state: { from: location } }} />
            }
        </Route>
    )
}

export default Routes