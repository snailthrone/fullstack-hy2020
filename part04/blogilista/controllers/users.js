const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const { body: { name, password, username } } = request
  const saltRounds = 10
  try {
    if (password.length < 3) {
      next(new Error('Password is too short'))
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      username,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter