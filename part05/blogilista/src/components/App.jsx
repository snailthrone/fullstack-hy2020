import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

// Components
import Blog from './Blog'
import Blogs from './BlogList'
import Login from './Login'
import Navigation from './Navigation'
import Notification from './Notification'
import User from './User'
import Users from './Users'

// Reducers
import { initBlogs } from '../reducers/blogReducer'
import { initUser, initUsers, } from '../reducers/userReducer'

import * as s from './index.styled'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4dd0e1;
    margin: 0;
  }

  html, body {
    height: 100%;
  }
`

const App = () => {
  const dispatch = useDispatch()
  const { blogs, login: { user, users } } = useSelector(state => state)

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
    <>
      <GlobalStyle />
      <s.Container>
        <Notification />
        {
          user ? (
            <>
              <Navigation />
              <s.Heading1>Blogs</s.Heading1>
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
      </s.Container>
    </>
  )
}

export default App
