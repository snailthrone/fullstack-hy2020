import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import NewBlog from './NewBlog'

// Reducers
import { showDialog } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const { blogs: { blogs, showNewBlog } } = useSelector(state => state)

  const toggleNewBlog = () => dispatch(showDialog())

  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

  return (
    <>
      <div>
        {
          showNewBlog && <NewBlog />
        }
        <button id="blog-form-button" onClick={toggleNewBlog}>{showNewBlog ? 'Cancel' : 'Add Blog'}</button>
      </div>
      {
        sortedBlogs.map(blog => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))
      }
    </>
  )}

export default Blogs
