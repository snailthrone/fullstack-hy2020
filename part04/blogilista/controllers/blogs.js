const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()

// Models
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const { body: { title, author, url, likes = 0 }, token } = request

  if (!token) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({
    author,
    likes,
    title,
    url,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async(request, response, next) => {

  const { token } = request

  if (!token) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async(request, response, next) => {
  const { body: { id, title, author, url, likes } } = request
  try {
    const updated = await Blog.findOneAndUpdate(id, { author, likes, title, url }, { new: true })
    response.json(updated.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
