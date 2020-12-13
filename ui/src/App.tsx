import React, { useState } from 'react'

import { UserData } from './types'

import Home from './Home'
import Auth from './Auth'
import Nav from './Nav'

import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  const [user, setUser] = useState<UserData | null>(null) // <UserData>
  const [view, setView] = useState<string>('home')

  const renderContent = (view: string) => {
    switch (view) {
      case 'home':
        return <Home />
      case 'signup': case 'signin':
        return <Auth view={view} setUser={setUser} />
      // case 'dashboard':
      //   return <Dashboard />
      // case 'profile':
      //   return <Profile />
      default:
        return <Home />
    }
  }

  return (
    <div className='App'>
      <Nav setView={setView} />
      {renderContent(view)}
    </div>
  )
}

export default App
