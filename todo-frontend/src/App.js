import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import { ProtectedRoute } from './ProtectedRoute'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Switch>
        {/* <Route exact path='/' component={Login} /> */}
        <Route exact path='/' component={Dashboard} />
        <ProtectedRoute exact path='/todo' component={Dashboard} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  )
}

export default App
