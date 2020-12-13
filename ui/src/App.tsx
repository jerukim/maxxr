import React, { useState } from 'react'

import { UserData } from './types'

import Home from './Home'
import Auth from './Auth'
import Nav from './Nav'

import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  const [user, setUser] = useState<UserData | null>(null) // <UserData>

  const pathname = window.location.pathname

  const renderContent = () => {
    switch (pathname) {
      case '/home': case '/':
        return <Home />
      case '/signup': case '/signin':
        return <Auth setUser={setUser} />
      // case 'dashboard':
      //   return <Dashboard />
      // case 'profile':
      //   return <Profile />
      default:
        return <Home />
      // return user !== null ? <Dashboard/> : <Home />
    }
  }

  return (
    <div className='App'>
      <Nav />
      {renderContent()}
    </div>
  )
}

export default App
