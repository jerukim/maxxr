import React from 'react'
import ReactDOM from 'react-dom'
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router'
import { Provider } from 'react-redux'
import store from './store'
import reportWebVitals from './reportWebVitals'

import './index.css'
import App from './App'

const source = createMemorySource('/')
const history = createHistory(source)

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocationProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
