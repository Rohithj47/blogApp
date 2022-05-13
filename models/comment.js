var mongoose = require('mongoose')

var Schema = mongoose.Schema

var commentSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date },
    likes: { type: Array, default: [] },
})

module.exports = mongoose.model('Comment', commentSchema)