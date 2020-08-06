import { create, get, like, remove } from '../services/blogs'
import { create as createComment } from '../services/comments'

const initialState = {
  blogs: [],
  showNewBlog: false
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_COMMENT':
    return { ...state, blogs: state.blogs.map(blog => {
      if (blog.id === action.comment.blog) {
        blog.comments = [...blog.comments, action.comment]
      }
      return blog
    }) }
  case 'CREATE_BLOG':
    return { ...state, blogs: [...state.blogs, action.blog], showDialog: false }
  case 'INIT_BLOGS':
    return { ...state, blogs: action.data }
  case 'LIKE_BLOG':
    return { ...state, blogs: state.blogs.map(blog => {
      if (blog.id === action.blog.id) {
        return action.blog
      }
      return blog
    }) }
  case 'SHOW_DIALOG':
    return { ...state, showNewBlog: !state.showNewBlog }
  case 'REMOVE_BLOG':
    return { ...state, blogs: state.blogs.filter(blog => blog.id !== action.blog.id) }
  default:
    return state
  }
}

export const createBlog = (blog, token) => async dispatch => {
  try {
    const newBlog = await create(blog, token)
    dispatch({ type: 'CREATE_BLOG', blog: newBlog })
    return { message: `A new blog ${newBlog.title} by ${newBlog.author} added.`, status: 'success' }
  } catch (exception) {
    console.log(exception)
    return { message: 'Error while adding a blog', status: 'error' }
  }
}

export const addComment = (id, comment, token) => async dispatch => {
  try {
    const newComment = await createComment(id, comment, token)
    dispatch({ type: 'ADD_COMMENT', comment: newComment })
    return { message: 'New comment added', status: 'success' }
  } catch (exception) {
    return { message: 'Error while adding a comment', status: 'error' }
  }
}

export const initBlogs = () => (
  async dispatch => {
    const data = await get()
    dispatch({ type: 'INIT_BLOGS', data })
  }
)

export const likeBlog = blog => async dispatch => {
  const likedBlog = await like({ ...blog, likes: blog.likes + 1 })
  console.log(likedBlog)
  dispatch({ type: 'LIKE_BLOG', blog: likedBlog })
}

export const removeBlog = blog => async dispatch => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    try {
      await remove(blog.id)
      dispatch({ type: 'REMOVE_BLOG', blog })
      return { message: `Removed ${blog.title} by ${blog.author}.`, status: 'success' }
    } catch (error) {
      return { message: `Could not remove ${blog.title} by ${blog.author}.`, status: 'error' }
    }
  }
}

export const showDialog = () => async dispatch => {
  dispatch({ type: 'SHOW_DIALOG' })
}

export default blogReducer
