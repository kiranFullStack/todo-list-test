import React, { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './Dashboard'

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  return (
    <div className='app'>
      <Dashboard />
    </div>
  )
}

export default App
