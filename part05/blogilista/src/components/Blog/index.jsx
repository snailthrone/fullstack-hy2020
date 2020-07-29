import React, { useState } from 'react'
import { func, number, shape, string } from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div>
      {blog.title} {blog.author}
      {' '}
      <button className="info-button" onClick={() => setShowInfo(info => !info)} type="button">{showInfo ? 'Hide' : 'Show'}</button>
      {
        showInfo && (
          <div>
            <p>{blog.url}</p>
            <p>likes: <span className="blog-likes">{blog.likes}</span> <button className="like-button" onClick={handleLike(blog)} type="button">Like</button></p>
            <p>{blog.user.name}</p>
          </div>
        )
      }
      <div>
        <button className="remove-button" onClick={removeBlog(blog)} type="button">Remove</button>
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
  handleLike: func.isRequired,
  removeBlog: func.isRequired,
}

export default Blog
