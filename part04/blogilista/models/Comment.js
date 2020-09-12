const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  content: {
    type: String,
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
