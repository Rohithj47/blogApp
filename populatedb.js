var User = require('./models/user')
var comment = require('./models/comment')
var post = require('./models/post')
var mongoose = require('mongoose')
require('dotenv').config()

var MongoURI = process.env.MONGOURI
mongoose.connect(
  MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

function createUser(username, password){
    var user = new User({ username: username, password : password })
    user.save(function(err){
        if(err){
            console.log('error')
            return
        }
        console.log(user)
    })
}

function createPost(title, content, author){
  var newPost = new post({ title: title, content : content, author : author})
  newPost.save(function(err){
    if (err){
      console.log('error saving Post by' + author )
      return
    }
    console.log(newPost)
  })

}
// var postSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   comments: { type: Array, default: []},
//   published: { type: Boolean },
//   timestamp: { type: Date },
//   imgUrl: { type: String },
//   likes: { type: Array, default: [] },
// })
// createUser('testUser1', '1234')
createPost('sampe Title', 'Blah Blah Blah Content', '627dff9142ef7edb02dcd631')