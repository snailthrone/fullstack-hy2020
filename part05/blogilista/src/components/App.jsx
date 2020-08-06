import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Blog from './Blog'
import Blogs from './Blogs'
import Login from './Login'
import NavBar from './NavBar'
import Notification from './Notification'
import User from './User'
import Users from './Users'

// Reducers
import { initBlogs } from '../reducers/blogReducer'
import { initUser, initUsers, } from '../reducers/userReducer'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const { blogs: { blogs }, login: { user, users } } = useSelector(state => state)

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
      dispatch(initUsers())
    } else {
      dispatch(initUser(user))
    }
  }, [dispatch, user])

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogFound = blogMatch && blogs.find(b => b.id === blogMatch.params.id)

  const userMatch = useRouteMatch('/users/:id')
  const userFound = userMatch && users.find(u => u.id === userMatch.params.id)

  return (
    <div>
      <Notification />
      {
        user ? (
          <>
            <NavBar />
            <h1>Blogs</h1>
            <Switch>
              <Route path="/users/:id">
                {
                  userFound && <User {...userFound} />
                }
              </Route>
              <Route path="/blogs/:id">
                { blogFound && <Blog blog={blogFound} /> }
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
