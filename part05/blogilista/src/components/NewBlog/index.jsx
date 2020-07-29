import React, { useState } from 'react'
import { func } from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title <input id="title" onChange={({ target }) => setTitle(target.value)} type="text" value={title} />
        </div>
        <div>
          Author <input id="author" onChange={({ target }) => setAuthor(target.value)} type="text" value={author} />
        </div>
        <div>
          Url <input id="url" onChange={({ target }) => setUrl(target.value)} type="text" value={url} />
        </div>
        <button id="add-blog-button" type="submit">Add</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  createBlog: func.isRequired,
}

export default NewBlog