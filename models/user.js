 var mongoose = require('mongoose')

 var Schema = mongoose.Schema

 var userSchema = new Schema({
     username: { type: String, maxlength: 20, required: true },
     password: { type: String, required: true }
 })

 module.exports = mongoose.model('User', userSchema)