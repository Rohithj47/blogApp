var mongoose = require('mongoose')

var Schema = mongoose.Schema

var postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: { type: Array, default: []},
    published: { type: Boolean },
    timestamp: { type: Date },
    imgUrl: { type: String },
    likes: { type: Array, default: [] },
})

module.exports = mongoose.model('Post', postSchema)