var User = require('../models/user') 
var Post = require('../models/post') 
var Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

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

module.exports.create_post = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, function(err, authData){
            if(err) { next(err)}
            req.user = authData._id 
            next() 
        })
    },
    body("title", "Title Cannot be blank")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("content","Content must have some value")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req.body)

        if( !errors ) { res.status(406).json({ errors : errors.array() })}
        // Validation succesful, We can create the Post 
        Post.create(
            { title : req.body.title,
              content : req.body.content,
              author: req.user,
              comments : [],
              timestamp: Date.now(),
            },
            (err, post) =>{
                if (err || !post) { return res.json(err) }
                return res.status(201).json(post)
            }
        )
    }


]

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