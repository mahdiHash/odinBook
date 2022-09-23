const router = require('express').Router();
const likePostController = require('../controllers/likes/like-dislike-post');

router.post('/', likePostController);

module.exports = router;
