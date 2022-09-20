const router = require('express').Router();
const createCommentController = require('../controllers/comments/createComment');
const editCommentController = require('../controllers/comments/editComment');
const deleteCommentController = require('../controllers/comments/deleteComment');

router.post('/create', createCommentController);

router.put('/edit', editCommentController);

router.delete('/delete', deleteCommentController);

module.exports = router;
