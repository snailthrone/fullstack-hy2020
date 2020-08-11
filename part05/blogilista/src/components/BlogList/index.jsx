import React, { useState }  from 'react'
import { useSelector } from 'react-redux'

// Components
import NewBlog from '../NewBlog'

import * as s from './index.styled'

const Blogs = () => {
  const { blogs } = useSelector(state => state)
  const [showNewBlogForm, setNewBlogForm] = useState(false)

  const toggleNewBlog = () => setNewBlogForm(state => !state)

  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

  return (
    <s.Container>
      <div>
        {
          showNewBlogForm ? (
            <NewBlog hideForm={toggleNewBlog} />
          ) : (
            <s.AddButton id="blog-form-button" onClick={toggleNewBlog}>Add Blog</s.AddButton>
          )
        }
      </div>
      {
        sortedBlogs.map(blog => (
          <s.Post key={blog.id}>
            <s.BlogLink to={`/blogs/${blog.id}`}>
              {blog.title} <s.Author>{blog.author}</s.Author>
            </s.BlogLink>
          </s.Post>
        ))
      }
    </s.Container>
  )}

export default Blogs
