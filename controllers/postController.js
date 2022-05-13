var User = require('../models/user') 
var Post = require('../models/post') 
var Comment = require('../models/comment')

module.exports.posts_get = function(req,res, next){
    Post.find({})
    .exec(function(err, posts){
        if (err){ next(err) }
        res.json({posts: posts})
    })
}