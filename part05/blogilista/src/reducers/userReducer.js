import { login, setToken } from '../services/blogs'


const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initUser = () => async dispatch => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    dispatch({ type: 'INIT_USER', user })
    setToken(user.token)
  }
}

export const userLogin = ({ username, password }) => async dispatch => {
  try {
    const user = await login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    dispatch({ type: 'LOGIN', user })
    setToken(user.token)
    return user
  } catch (exception) {
    return null
  }
}

export const userLogout = () => async dispatch => {
  window.localStorage.removeItem('loggedUser')
  dispatch({ type: 'LOGOUT' })
}

export default userReducer