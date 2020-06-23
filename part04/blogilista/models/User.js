const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  name: String,
  passwordHash: String,
  username: {
    minlength: 3,
    required: true,
    type: String,
    unique: true,
  },
})

userSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
    delete object.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User