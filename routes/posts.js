const router = require('express').Router();
const createController = require('../controllers/posts/createpost');
const editController = require('../controllers/posts/editpost');
const deleteController = require('../controllers/posts/deletepost');
const getPostsController = require('../controllers/posts/getPosts');

router.post('/create/', createController);

router.post('/edit/', editController);

router.delete('/delete/', deleteController);

router.get('/', getPostsController);

module.exports = router;
