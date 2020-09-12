const Blog = require('../models/blog')
const User = require('../models/User')

const newBlog = {
  title: 'You may not need d3',
  author: 'Jerome Cukier',
  url: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/',
  likes: 5
}

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  blogsInDatabase,
  newBlog,
  usersInDatabase,
}