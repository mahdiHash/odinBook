const router = require('express').Router();
const createController = require('../controllers/posts/createpost');
const editController = require('../controllers/posts/editpost');
const deleteController = require('../controllers/posts/deletepost');
const getPostsController = require('../controllers/posts/getPosts');
const getPostCommentsController = require('../controllers/posts/getComments');
const getPostsByHashtagController = require('../controllers/posts/getHashtagPosts');
const getPostById = require('../controllers/posts/getPostById');

router.post('/create/', createController);

router.post('/edit/', editController);

router.delete('/delete/', deleteController);

router.get('/comments', getPostCommentsController);

router.get('/hashtag/:hashtag', getPostsByHashtagController);

router.get('/post/', getPostById);

router.get('/', getPostsController);

module.exports = router;
