import React from 'react'

import Nav from './Nav'
import Routes from './routes'

import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <div className='App'>
      <Nav />
      <Routes />
    </div>
  )
}

export default App
