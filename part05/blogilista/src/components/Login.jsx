import React, { useState } from 'react';

import { login, setToken } from '../services/blogs'

const Login = ({ setMessage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
      setMessage({ message: 'Successful login', type: 'success' })
    } catch (exception) {
      setMessage({ message: 'Invalid username or password', type: 'error' })
    }
  }

  return (
    <>
      <h2>Log in to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username <input onChange={({ target }) => setUsername(target.value)} type="text" value={username} />
        </div>
        <div>
          Password <input onChange={({ target }) => setPassword(target.value)} type="password" value={password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login;
