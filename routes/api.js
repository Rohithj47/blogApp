var express = require('express')
var router = express.Router()

var post_controller = require('../controllers/postController') 
var comment_controller = require('../controllers/commentController') 
var user_controller = require('../controllers/userController') 

/* GET users listing. */
router.get('/', (req, res)=>{
  res.send("Hey APi")
})
router.get('/posts', post_controller.posts_get);

module.exports = router;

module.exports = router