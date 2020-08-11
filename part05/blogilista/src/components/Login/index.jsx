import React from 'react'
import { useDispatch } from 'react-redux'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { userLogin } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'

import * as s from './index.styled'
import { Form, FormLabel, FormLabelText, FormInput } from '../Form'

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
    <s.Container>
      <s.Heading>Log in to Application</s.Heading>
      <Form onSubmit={handleLogin}>
        <FormLabel>
          <FormLabelText>Username</FormLabelText>
          <FormInput id="username" {...username} reset={null} />
        </FormLabel>
        <FormLabel>
          <FormLabelText>Password</FormLabelText>
          <FormInput id="password" {...password} reset={null} />
        </FormLabel>
        <s.LoginButton id="login-button" type="submit">Login</s.LoginButton>
      </Form>
    </s.Container>
  )
}

export default Login
