import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { addComment, likeBlog, removeBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer.js'

import { FormInput, Heading3 } from '../common'
import * as s from './index.styled'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { login } = useSelector(state => state)
  const comment = useField('text')

  const handleComment = event => {
    event.preventDefault()
    if (comment.value.length > 0) {
      dispatch(addComment(blog.id, comment.value, login.user.token))
      comment.reset()
    }
  }

  const handleLike = () => dispatch(likeBlog(blog))

  const handleRemove = async () => {
    const response = await dispatch(removeBlog(blog, login.user.token))

    if (response) {
      dispatch(setNotification(response.message, response.status))
      history.push('/')
    }
  }

  return (
    <>
      <s.Heading>{blog.title} {blog.author}</s.Heading>
      {' '}
      <s.Container>
        <s.Text><a href={blog.url}>{blog.url}</a></s.Text>
        <s.LikeContainer>
          <s.Text><s.Strong><span className="blog-likes">{blog.likes}</span> likes</s.Strong></s.Text>
          <s.LikeButton className="like-button" onClick={handleLike} type="button">Like</s.LikeButton>
        </s.LikeContainer>
        <s.Text><s.Emphasis>Added by {blog.user.name}</s.Emphasis></s.Text>
        <Heading3>Comments</Heading3>
        <s.CommentForm onSubmit={handleComment}>
          <FormInput {...comment} reset={null} />
          <s.CommentButton>Add comment</s.CommentButton>
        </s.CommentForm>
        {
          blog.comments.length > 0 && (
            <s.CommentList>
              {blog.comments.map(({ content, id }) => (
                <s.CommentListItem key={id}><s.Emphasis>{content}</s.Emphasis></s.CommentListItem>
              ))}
            </s.CommentList>
          )
        }
        <s.RemoveButton className="remove-button" onClick={handleRemove} type="button">Remove Blog</s.RemoveButton>
      </s.Container>
    </>
  )
}

Blog.propTypes = {
  blog: shape({
    author: string.isRequired,
    comments: arrayOf(shape({
      content: string,
      id: string,
    })).isRequired,
    id: string.isRequired,
    likes: number.isRequired,
    title: string.isRequired,
    url: string.isRequired,
    user: shape({
      id: string.isRequired,
      name: string.isRequired,
      username: string.isRequired,
    }).isRequired
  }).isRequired
}

export default Blog
