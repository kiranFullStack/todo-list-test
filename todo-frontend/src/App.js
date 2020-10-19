import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import { ProtectedRoute } from './ProtectedRoute'

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Login} />
        <ProtectedRoute exact path='/todo' component={Dashboard} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  )
}

export default App
