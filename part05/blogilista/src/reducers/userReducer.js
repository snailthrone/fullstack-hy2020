import { get, login } from '../services/users'

const initialState = {
  user: null,
  users: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return { ...state, user: action.user }
  case 'INIT_USERS':
    return { ...state, users: action.data }
  case 'LOGIN':
    return { ...state, user: action.user }
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

export const initUser = () => async dispatch => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    dispatch({ type: 'INIT_USER', user })
  }
}

export const initUsers = () => async dispatch => {
  const data = await get()
  dispatch({ type: 'INIT_USERS', data })
}

export const userLogin = ({ username, password }) => async dispatch => {
  try {
    const user = await login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    dispatch({ type: 'LOGIN', user })
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