import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Blogs from './Blogs'
import Login from './Login'
import Notification from './Notification'
import User from './User'
import Users from './Users'

// Reducers
import { initBlogs } from '../reducers/blogReducer'
import { initUser, initUsers, userLogout } from '../reducers/userReducer'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const { login: { user, users } } = useSelector(state => state)

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
      dispatch(initUsers())
    } else {
      dispatch(initUser(user))
    }
  }, [dispatch, user])

  const logout = () => dispatch(userLogout())

  const match = useRouteMatch('/users/:id')
  const userMatch = match && users.find(u => u.id === match.params.id)

  return (
    <div>
      <Notification />
      {
        user ? (
          <>
            <h1>Blogs</h1>
            <div>
              <span>{user.name} logged in</span>
              <button id="logout-button" onClick={logout} type="button">Logout</button>
            </div>
            <Switch>
              <Route path="/users/:id">
                {
                  userMatch && <User {...userMatch} />
                }
              </Route>
              <Route path="/users/">
                <Users />
              </Route>
              <Route path="/">
                <Blogs />
              </Route>
            </Switch>
          </>
        ) : (
          <Login />
        )
      }
    </div>
  )
}

export default App
