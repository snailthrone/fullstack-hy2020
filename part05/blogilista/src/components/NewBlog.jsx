import React, { useState } from 'react'

import { create } from '../services/blogs'
import { func } from 'prop-types'

const NewBlog = ({ setBlogs, setMessage, toggleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await create({ title, author, url })
      setBlogs(blogs => blogs.concat(blog))
      setMessage({ message: `A new blog ${title} by ${author} added.`, type: 'success' })
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleNewBlog(false)
    } catch (exception) {
      setMessage({ message: 'Error', type: 'error' })
    }
  }

  return (
    <>
      <h2>Create a New Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title <input onChange={({ target }) => setTitle(target.value)} type="text" value={title} />
        </div>
        <div>
          Author <input onChange={({ target }) => setAuthor(target.value)} type="text" value={author} />
        </div>
        <div>
          Url <input onChange={({ target }) => setUrl(target.value)} type="text" value={url} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  setBlogs: func.isRequired,
  setMessage: func.isRequired,
  toggleNewBlog: func.isRequired,
}

export default NewBlog