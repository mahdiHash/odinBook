const router = require('express').Router();
const createCommentController = require('../controllers/comments/createComment');

router.post('/create', createCommentController);

module.exports = router;
