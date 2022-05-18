var express = require('express')
var router = express.Router()

var post_controller = require('../controllers/postController') 
var comment_controller = require('../controllers/commentController') 
var user_controller = require('../controllers/userController') 
var verifyToken = require('../config/verifyToken')

// GET posts
router.get('/posts', post_controller.posts);

// POST create post
router.post("/posts/create", verifyToken,  post_controller.create_post);

router.get('/posts/:id', post_controller.post_get);

// POST publish post
router.post("/posts/:id/publish", verifyToken, post_controller.publish);

// POST unpublish post
router.post("/posts/:id/unpublish", verifyToken, post_controller.unpublish);

// PUT update post
router.put("/posts/:id/edit", verifyToken, post_controller.post_update);

// DELETE delete post
router.delete("/posts/:id/delete", verifyToken, post_controller.delete_post);


// get post likes
router.get("/posts/:id/likes", post_controller.likes);

// like post
router.put("/posts/:id/like", verifyToken, post_controller.like);

// dislike post
router.put("/posts/:id/dislike", verifyToken, post_controller.dislike);

// User All Users
router.get('/users', user_controller.get_users)

// POST login
router.post("/user/login", user_controller.login_post);

// POST signup
router.post("/user/signup", user_controller.signup_post);

// get single user
router.get("/user/:id", user_controller.user);

// // google auth
// router.post("/user/google", user_controller.google);


module.exports = router;



