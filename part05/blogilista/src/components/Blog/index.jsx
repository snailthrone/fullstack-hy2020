import React from 'react'
import { number, shape, string } from 'prop-types'
import { useDispatch } from 'react-redux'

import { likeBlog, removeBlog, showInfo } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer.js'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => dispatch(likeBlog(blog))

  const handleRemove = async () => {
    const { message, status } = await dispatch(removeBlog(blog))
    dispatch(setNotification(message, status))
  }

  const toggleInfo = () => dispatch(showInfo(blog))

  return (
    <div>
      {blog.title} {blog.author}
      {' '}
      <button className="info-button" onClick={toggleInfo} type="button">{blog.showInfo ? 'Hide' : 'Show'}</button>
      {
        blog.showInfo && (
          <div>
            <p>{blog.url}</p>
            <p>likes: <span className="blog-likes">{blog.likes}</span> <button className="like-button" onClick={handleLike} type="button">Like</button></p>
            <p>{blog.user.name}</p>
          </div>
        )
      }
      <div>
        <button className="remove-button" onClick={handleRemove} type="button">Remove</button>
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
    }).isRequired
  }).isRequired
}

export default Blog
