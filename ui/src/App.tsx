import React, { Suspense, lazy, useState } from 'react'
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router
} from '@reach/router'

import { UserData } from './types'

import './App.css'
import 'antd/dist/antd.css'
import Nav from './Nav'

const Home = lazy(() => import('./Home'))
const Auth = lazy(() => import('./Auth'))
const Dashboard = lazy(() => import('./Dashboard'))

const source = createMemorySource('/')
const history = createHistory(source)

const App = () => {
  const [user, setUser] = useState<UserData | null>(null) // <UserData>

  return (
    <LocationProvider history={history}>
      <div className='App'>
        <Nav user={user} />

        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Home path='/' />
            <Auth path='auth/*' setUser={setUser} />
            <Dashboard path='/dashboard' user={user} />
          </Router>
        </Suspense>
      </div>
    </LocationProvider>
  )
}

export default App
