import React, { useEffect, useState } from 'react';

// Components
import BlogList from './BlogList'
import Login from './Login'
import NewBlog from './NewBlog'
import Notification from './Notification';

// Services
import blogService from '../services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('')
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
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (message) {
      const messageRemove = setTimeout(() => setMessage(null), 5000)

      return () => clearTimeout(messageRemove)
    }
  }, [message])

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url })
      console.log(blog);
      setBlogs(blogs => blogs.concat(blog))
      setMessage({ message: `A new blog ${title} by ${author} added.`, type: 'success' })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setMessage({ message: 'Error: Title is missing', type: 'error' })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setMessage({ message: 'Successful login', type: 'success' })
    } catch (exception) {
      setMessage({ message: 'Invalid username or password', type: 'error' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginFormProps = {
    fields: [ 
      {
        handler: ({ target }) => setUsername(target.value),
        label: 'Username',
        type: 'text',
        value: username
      },
      {
        handler: ({ target }) => setPassword(target.value),
        label: 'Password',
        type: 'password',
        value: password
      }
    ],
    submit: {
      handler: handleLogin,
      title: 'Login'
    }
  }

  const blogFormProps = {
    fields: [
      {
        handler: ({ target }) => setTitle(target.value),
        label: 'Title',
        value: title,
      }, 
      {
        handler: ({ target }) => setAuthor(target.value),
        label: 'Author',
        value: author,
      },
      {
        handler: ({ target }) => setUrl(target.value),
        label: 'Url',
        value: url,
      }
    ],
    submit: {
      handler: createBlog,
      title: 'Create'
    }
  }

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
            <NewBlog {...blogFormProps} />
            <h2>Blogs</h2>
            <div>
              <p>{user.name} logged in</p>
              <button onClick={logout} type="button">Logout</button>
            </div>
            <BlogList blogs={blogs} name={user.name} />
          </>
        ) : (
          <Login {...loginFormProps} />
        )
      }
    </div>
  )
}

export default App;
