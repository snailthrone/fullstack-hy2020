const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

// Controller
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
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

if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.requestLogger)
}
app.use(middleware.tokenExtractor)

app.use('/api/blogs/', blogRouter)
app.use('/api/login', loginRouter)
app.use('/api/users/', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
