import React, { useCallback, useEffect, useState } from 'react'

// Components
import Blog from './Blog'
import Login from './Login'
import NewBlog from './NewBlog'
import Notification from './Notification'

// Services
import { create, get, like, remove, setToken } from '../services/blogs'

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

  const createBlog = async (blog) => {
    try {
      const newBlog = await create(blog)
      setBlogs(blogs => blogs.concat(newBlog))
      setMessage({ message: `A new blog ${newBlog.title} by ${newBlog.author} added.`, type: 'success' })
      setShowNewBlog(false)
    } catch (exception) {
      setMessage({ message: 'Error', type: 'error' })
    }
  }

  const handleLike = (blog) => async () => {
    console.log(blog)
    const likedBlog = await like({ ...blog, likes: blog.likes + 1 })
    setBlogs(blogs => blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
  }

  const removeBlog = (blog) => async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await remove(blog.id)
        setBlogs(blogs => blogs.filter(({ id }) => id !== blog.id))
        setMessage({ message: `Removed ${blog.title} by ${blog.author}.`, type: 'success' })
      } catch (error) {
        setMessage({ message: `Could not remove ${blog.title} by ${blog.author}.`, type: 'error' })
      }
    }
  }

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
                showNewBlog && <NewBlog createBlog={createBlog} />
              }
              <button onClick={toggleNewBlog}>{showNewBlog ? 'Cancel' : 'Add Blog'}</button>
            </div>
            {
              sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} removeBlog={removeBlog} />)
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
