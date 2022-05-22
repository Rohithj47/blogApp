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

  exports.edit_comment = []
  exports.delete_comment = []
  exports.comment_get = []
