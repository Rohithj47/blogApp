var User = require('../models/user') 
var Post = require('../models/post') 
var Comment = require('../models/comment')

module.exports.posts = function(req,res, next){
    Post.find()
    .exec(function(err, posts){
        if (err){ next(err) }
        return res.json(posts)
    })
}

module.exports.post_get = function(req,res, next){
    Post.findById(req.params.id)
    .exec(function(err, post){
        if (err)
        {
            return next(err) 
        }
        res.json({post: post})
    })
}

module.exports.create_post = function(req, res, next){
    console.log('Checking Auth token' + req.token)
    res.end()
}

module.exports.publish = function(req, res, next){
    res.send("Not Handled yet")
}

module.exports.unpublish = function(req, res, next){
    res.send("Not Handled yet")
}

module.exports.post_update = function(req, res, next){
    res.send("Not Handled yet")
}

module.exports.delete_post = function(req, res, next){
    res.send("Not Handled yet")
}


module.exports.likes = function(req, res, next){
    res.send("Not Handled yet")
}

module.exports.like = function(req, res, next){
    res.send("Not Handled yet")
}

module.exports.dislike = function(req, res, next){
    res.send("Not Handled yet")
}