import React, { useCallback, useEffect, useState } from 'react'

// Components
import Blog from './Blog'
import Login from './Login'
import NewBlog from './NewBlog'
import Notification from './Notification'

// Services
import { get, setToken } from '../services/blogs'

const App = () => {
  const [showNewBlog, setShowNewBlog] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const getBlogs = useCallback(async () => {
    const blogs = await get()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (message) {
      const messageRemove = setTimeout(() => setMessage(null), 5000)

      return () => clearTimeout(messageRemove)
    }
  }, [message])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const toggleNewBlog = () => setShowNewBlog(show => !show)

  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

  return (
    <div>
      {
        message && (
          <Notification {...message} />
        )
      }
      {
        user ? (
          <>
            <h2>Blogs</h2>
            <div>
              <span>{user.name} logged in</span>
              <button onClick={logout} type="button">Logout</button>
            </div>
            <div>
              {
                showNewBlog && <NewBlog setBlogs={setBlogs} setMessage={setMessage} toggleNewBlog={toggleNewBlog} />
              }
              <button onClick={toggleNewBlog}>{showNewBlog ? 'Cancel' : 'Add Blog'}</button>
            </div>
            {
              sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} setMessage={setMessage} setBlogs={setBlogs} />)
            }
          </>
        ) : (
          <Login setMessage={setMessage} setUser={setUser} />
        )
      }
    </div>
  )
}

export default App
