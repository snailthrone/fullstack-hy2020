import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../reducers/userReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const { login: { user: { name } } } = useSelector(state => state)
  const logout = () => dispatch(userLogout())
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            blogs
          </Link>
        </li>
        <li>
          <Link to="/users/">
            users
          </Link>
        </li>
      </ul>
      <div>
        <span>{name} logged in</span>
        <button id="logout-button" onClick={logout} type="button">Logout</button>
      </div>
    </nav>
  )
}

export default NavBar
