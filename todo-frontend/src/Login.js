import React from 'react'
import auth from './auth'

const Login = (props) => {
  return (
    <div>
      <h1>Landing Page</h1>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push('/todo')
          })
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Login
