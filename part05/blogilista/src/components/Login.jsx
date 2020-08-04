import React from 'react'
import { useDispatch } from 'react-redux'

// Hooks
import useField from '../hooks/useField'

// Reducers
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const user= await dispatch(userLogin({ username: username.value, password: password.value }))

    if (user) {
      dispatch(setNotification(`${user.name} logged in`, 'success'))
    } else {
      dispatch(setNotification('Invalid username or password', 'error'))
    }

    username.reset()
    password.reset()
  }

  return (
    <>
      <h2>Log in to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username <input id="username" {...username} reset={null} />
        </div>
        <div>
          Password <input id="password" {...password} reset={null} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
