const router = require('express').Router();
const createCommentController = require('../controllers/comments/createComment');
const editCommentController = require('../controllers/comments/editComment');
const deleteCommentController = require('../controllers/comments/deleteComment');
const getRepliesCotroller = require('../controllers/comments/getReplies');

router.post('/create', createCommentController);

router.put('/edit', editCommentController);

router.delete('/delete', deleteCommentController);

router.get('/replies', getRepliesCotroller);

module.exports = router;
