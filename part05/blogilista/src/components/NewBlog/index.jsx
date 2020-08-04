import React from 'react'
import { useDispatch } from 'react-redux'

// Hooks
import useField from '../../hooks/useField'

// Reducers
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async event => {
    event.preventDefault()

    const { message, status } = await dispatch(createBlog({ title: title.value, author: author.value, url: url.value }))
    dispatch(setNotification(message, status))

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title <input id="title" {...title} reset={null} />
        </div>
        <div>
          Author <input id="author" {...author} reset={null} />
        </div>
        <div>
          Url <input id="url" {...url} reset={null} />
        </div>
        <button id="add-blog-button" type="submit">Add</button>
      </form>
    </>
  )
}

export default NewBlog