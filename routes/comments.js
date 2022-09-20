const router = require('express').Router();
const createCommentController = require('../controllers/comments/createComment');
const editCommentController = require('../controllers/comments/editComment');

router.post('/create', createCommentController);

router.put('/edit', editCommentController);

module.exports = router;
