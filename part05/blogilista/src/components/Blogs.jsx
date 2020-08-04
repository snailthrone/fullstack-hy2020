import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Blog from './Blog'
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
        sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </>
  )}

export default Blogs
