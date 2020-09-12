require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.TEST_MONGODB_URI
const JWT_SECRET = process.env.SECRET

module.exports = {
  JWT_SECRET,
  MONGODB_URI,
  PORT
}
