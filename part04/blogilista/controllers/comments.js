const commentRouter = require('express').Router()

const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments.map(comment => comment.toJSON()))
})

commentRouter.post('/', async (request, response, next) => {
  const { body, token } = request

  console.log(request.token)
  
  if (!token) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const blog = await Blog.findById(body.blog)

  const comment = await new Comment({
    content: body.content,
    blog: blog._id
  })

  try {
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    console.log(blog.comments)
    await blog.save()
    response.status(201).json(savedComment.toJSON())
  } catch (error) {
    next(error)
  }

})

module.exports = commentRouter