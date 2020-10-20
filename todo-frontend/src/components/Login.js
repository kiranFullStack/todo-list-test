import React, { useState } from 'react'
import auth from '../auth'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import watermark from './logo-watermark.png'

const Login = (props) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div className='login-container'>
      <img
        src={watermark}
        alt=''
        style={{ height: '30vh', marginBottom: '68px' }}
      />
      <div className='login-form'>
        <TextField
          id='outlined-basic-1'
          label='Email'
          variant='filled'
          type='text'
          className='login-feild'
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <br />
        <TextField
          id='outlined-basic-1'
          label='Password'
          variant='filled'
          className='login-feild'
          type='password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <br />
        <br />
        {password === 'torrecapital' && email === 'dev@torrecapital.com' ? (
          <Button
            color='primary'
            variant='contained'
            style={{ width: '100%', backgroundColor: '#fdb715' }}
            onClick={() => {
              auth.login(() => {
                props.history.push('/todo')
              })
            }}
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              variant='contained'
              disabled
              style={{ width: '100%', height: '68px' }}
            >
              Login
            </Button>
            <br />
            Email = "dev@torrecapital.com", Password = "torrecapital"
          </>
        )}
      </div>
    </div>
  )
}

export default Login
