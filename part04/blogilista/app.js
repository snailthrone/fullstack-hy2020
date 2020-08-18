const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

// Controllers
const blogRouter = require('./controllers/blogs')
const commentRouter = require('./controllers/comments')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const usersRouter = require('./controllers/users')

// Utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

logger.info('Connecting to', config.MONGODB_URI)

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(({ message }) => logger.error(`Error connecting to MongoDB: ${message}`))

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs/', blogRouter)
app.use('/api/comments', commentRouter)
app.use('/api/login', loginRouter)
app.use('/api/users/', usersRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
