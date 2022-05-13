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

createUser('testUser1', '1234')