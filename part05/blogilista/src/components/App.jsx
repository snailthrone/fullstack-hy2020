import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Blog from './Blog'
import Login from './Login'
import NewBlog from './NewBlog'
import Notification from './Notification'

// Reducers
import { initBlogs, showDialog } from '../reducers/blogReducer'
import { initUser, userLogout } from '../reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { blogs: { blogs, showNewBlog }, login: user } = useSelector(state => state)

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
    } else {
      dispatch(initUser(user))
    }
  }, [dispatch, user])

  const logout = () => dispatch(userLogout())

  const toggleNewBlog = () => dispatch(showDialog())

  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

  console.log(blogs)

  return (
    <div>
      <Notification />
      {
        user ? (
          <>
            <h2>Blogs</h2>
            <div>
              <span>{user.name} logged in</span>
              <button id="logout-button" onClick={logout} type="button">Logout</button>
            </div>
            <div>
              {
                showNewBlog && <NewBlog />
              }
              <button id="blog-form-button" onClick={toggleNewBlog}>{showNewBlog ? 'Cancel' : 'Add Blog'}</button>
            </div>
            {
              sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)
            }
          </>
        ) : (
          <Login />
        )
      }
    </div>
  )
}

export default App
