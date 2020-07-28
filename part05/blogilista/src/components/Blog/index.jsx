import React, { useState } from 'react'
import { func, number, shape, string } from 'prop-types'

import { like, remove } from '../../services/blogs'

const Blog = ({ blog, setMessage, setBlogs }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleLike = async () => {
    const likedBlog = await like({ ...blog, likes: blog.likes + 1 })
    setBlogs(blogs => blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
  }

  const removeBlog = async () => {
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

  return (
    <div>
      {blog.title} {blog.author}
      {' '}
      <button onClick={() => setShowInfo(info => !info)} type="button">{showInfo ? 'Hide' : 'Show'}</button>
      {
        showInfo && (
          <div>
            <p>{blog.url}</p>
            <p>likes: {blog.likes} <button onClick={handleLike} type="button">Like</button></p>
            <p>{blog.user.name}</p>
          </div>
        )
      }
      <div>
        <button onClick={removeBlog} type="button">Remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: shape({
    title: string.isRequired,
    author: string.isRequired,
    url: string.isRequired,
    likes: number.isRequired,
    user: shape({
      name: string.isRequired,
    }).isRequired,
  }).isRequired,
  setMessage: func.isRequired,
  setBlogs: func.isRequired,
}

export default Blog
