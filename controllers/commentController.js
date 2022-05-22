require("dotenv").config();
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
