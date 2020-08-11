import React from 'react'
import { number, shape, string } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { addComment, likeBlog, removeBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer.js'

import { FormInput } from '../Form'
import { Heading3 } from '../common'
import * as s from './index.styled'

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
