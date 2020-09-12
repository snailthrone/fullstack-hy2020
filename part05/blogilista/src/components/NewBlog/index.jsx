import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { func } from 'prop-types'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

import { Form, FormLabel, FormLabelText, FormInput, Heading2 } from '../common'

import * as s from './index.styled'

const NewBlog = ({ hideForm }) => {
  const dispatch = useDispatch()
  const { login } = useSelector(state => state)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async event => {
    event.preventDefault()
    const { message, status } = await dispatch(createBlog({ title: title.value, author: author.value, url: url.value }, login.user.token))
    dispatch(setNotification(message, status))

    title.reset()
    author.reset()
    url.reset()
    hideForm()
  }

  return (
    <s.Container>
      <Heading2>Create a New Blog</Heading2>
      <Form onSubmit={addBlog}>
        <FormLabel>
          <FormLabelText>Title</FormLabelText> <FormInput id="title" {...title} reset={null} />
        </FormLabel>
        <FormLabel>
          <FormLabelText>Author</FormLabelText> <FormInput id="author" {...author} reset={null} />
        </FormLabel>
        <FormLabel>
          <FormLabelText>Url</FormLabelText> <FormInput id="url" {...url} reset={null} />
        </FormLabel>
        <s.ButtonWrapper>
          <s.Button id="add-blog-button" type="submit">Add</s.Button>
          <s.Button id="cancel-button" onClick={hideForm} type="button">Cancel</s.Button>
        </s.ButtonWrapper>
      </Form>
    </s.Container>
  )
}

NewBlog.propTypes = {
  hideForm: func.isRequired
}

export default NewBlog