const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  author: String,
  likes: Number,
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
