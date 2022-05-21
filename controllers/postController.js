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
            req.authData = authData 
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
        const { title, content, published, imgUrl } = req.body;
        Post.create(
            { title : title,
              content : content,
              author: req.authData._id,
              published : published,
              timestamp: Date.now(),
              imgUrl : imgUrl
            },
            (err, post) =>{
                if (err || !post) { return res.json(err) }
                return res.status(201).json(post)
            }
        )
    }


]

module.exports.publish = [
    (req, res, next) =>{
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) { next(err) }
            req.authData = authData
            next()
        })
    },
    (req,res) => {
        let doc = Post.findOneAndUpdate(
            {_id : req.params.id}, 
            {published : true},
            {new : true},
            (err, post) => {
                if (err) { return next(err) }
                res.status(200).json(post)
            }
            )
    }
]

module.exports.unpublish = function(req, res, next){
    (req, res, next) =>{
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) { next(err) }
            req.authData = authData
            next()
        })
    },
    (req,res) => {
        let doc = Post.findOneAndUpdate(
            {_id : req.params.id}, 
            {published : false },
            {new : true},
            (err, post) => {
                if (err) { return next(err) }
                res.status(200).json(post)
            }
            )
    }
}

module.exports.post_update = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, function(err, authData){
            if(err) { next(err)}
            req.authData = authData 
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
        let { title, content, published, imgUrl } = req.body

        Post.findById(req.params.id, (err, oldPost) =>{
            if (err) {
                res.sendStatus(404).json({"message" : "No Post Found"})
            }
            if (typeof published === 'undefined'){
                published = oldPost.published
            }
            if (typeof imgUrl === 'undefined'){
                imgUrl = oldPost.imgUrl
            }
        })
        // Validation succesful, We can update the Post 

        let newPost = { 
                  title : title,
                  content : content,
                  author: req.authData._id,
                  published : published,
                  timestamp: Date.now(),
                  imgUrl : imgUrl
                }
        Post.findByIdAndUpdate(req.params.id, newPost, 
            { new: true },
            (err, newPost) => {
                if(err) { return next(err) }
                res.json(newPost)
            }
            )
    }
]

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