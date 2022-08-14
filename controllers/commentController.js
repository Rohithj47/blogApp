require("dotenv").config();
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const req = require("express/lib/request");

exports.comments = function (req, res) {
  Comment.find()
    .sort([["timestamp", "descending"]])
    .exec((err, data) => {
      if (err) return res.json(err);

      let comments = data.filter(
        (comment) => comment.postId === req.params.post_id
      );

      return res.json(comments);
    });
};


exports.create_comment = [
    body("username", "Usernmae cannot be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("content", "Comment cannot be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
    // process request
    (req, res) => {
      // extract errors
      const errors = validationResult(req.body);
  
      if (!errors.isEmpty()) return res.json(err);
  
      const { username, content } = req.body;
  
      // create comment
      Comment.create(
        { username, content, postId: req.params.post_id, timestamp: Date.now() },
        (err, comment) => {
          if (err) return res.json(err);
  
          return res.json(comment);
        }
      );
    },
  ];

  exports.edit_comment = [
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    },
    (req, res) => { 
      let { content } = req.body

        Comment.findById(req.params.id, (err, oldComment) =>{
              if (err) {
                  res.sendStatus(404).json({"message" : "No Comment Found"})
              }
        })

          let newComment = { 
            content : content,
            timestamp : Date.now() 
          }

        Comment.findByIdAndUpdate(req.params.id, newComment, 
            { new: true },
            (err, newComment) => {
                if(err) { return next(err) }
                res.json(newComment)
            }
            )
    }
  ]

  exports.delete_comment = [
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    },
    (req, res) => { 
      Comment.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.json(err);
    
          res.status(200).json({
            message: "Comment deleted successfully",
          });
        });
    }
  ]

  exports.comment_get = function(req, res){
      Comment.findById(req.params.id, (err, comment) => {
          if (err) { res.send(406).json({error: err}) }
          res.send({comment})
      })
  }
