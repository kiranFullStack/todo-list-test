import React, { useState } from 'react'
import auth from './auth'

const Login = (props) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div>
      <h1>Landing Page</h1>
      email
      <input
        type='text'
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      {email}
      <br />
      password
      <input
        type='text'
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {password}
      <br />
      {password === 'password' && email === 'email@email.com' ? (
        <button
          onClick={() => {
            auth.login(() => {
              props.history.push('/todo')
            })
          }}
        >
          Login
        </button>
      ) : (
        'enter your email & password'
      )}
      <br />
      <h1>email@email.com</h1>
      <h1>password</h1>
    </div>
  )
}

export default Login
