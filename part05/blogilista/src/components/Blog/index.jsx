import React from 'react'
import { number, shape, string } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { addComment, likeBlog, removeBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer.js'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const { login: { user } } = useSelector(state => state)
  const comment = useField('text')
  const handleComment = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment.value, user.token))
    comment.reset()
  }

  const handleLike = () => dispatch(likeBlog(blog))

  const handleRemove = async () => {
    const { message, status } = await dispatch(removeBlog(blog))
    dispatch(setNotification(message, status))
  }
  console.log(blog)
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      {' '}
      <div>
        <p><a href={blog.url}></a></p>
        <p><span className="blog-likes">{blog.likes}</span> likes <button className="like-button" onClick={handleLike} type="button">Like</button></p>
        <p>Added by {blog.user.name}</p>
      </div>
      <div>
        <form onSubmit={handleComment}>
          <input {...comment} reset={null} />
          <button>Add comment</button>
        </form>
        {
          blog.comments.length > 0 && (
            <>
              <h3>Comments</h3>
              <ul>
                {blog.comments.map(({ content, id }) => (
                  <li key={id}>{content}</li>
                ))}
              </ul>
            </>
          )
        }
      </div>
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
