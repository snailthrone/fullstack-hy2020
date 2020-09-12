import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { func } from 'prop-types';

import { LOGIN } from '../mutations';

const Login = ({ setToken }) => {
  const [login, result] = useMutation(LOGIN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('token', JSON.stringify(token));
    }
  }, [result.data, setToken]);

  const submit = async event => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">
            Username:{' '}
            <input
              id="username"
              onChange={({ target: { value } }) => setUsername(value)}
              type="text"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:{' '}
            <input
              id="password"
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: func.isRequired,
};

export default Login;
