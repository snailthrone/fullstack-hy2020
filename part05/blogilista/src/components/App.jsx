import React, { useEffect, useState } from 'react';

// Components
import BlogList from './BlogList'
import Login from './Login'
import NewBlog from './NewBlog'
import Notification from './Notification';

// Services
import { setToken } from '../services/blogs'

const App = () => {
  const [showNewBlog, setShowNewBlog] = useState(false);
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null)

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    getBlogs()
  }, [])

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

  const toggleNewBlog = () => setShowNewBlog(show => !show);

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
            <BlogList blogs={blogs} name={user.name} />
          </>
        ) : (
          <Login setMessage={setMessage} setUser={setUser} />
        )
      }
    </div>
  )
}

export default App;
