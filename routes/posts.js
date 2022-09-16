const router = require('express').Router();
const createController = require('../controllers/posts/createpost');
const editController = require('../controllers/posts/editpost');
const deleteController = require('../controllers/posts/deletepost');

router.post('/create/', createController);

router.post('/edit/', editController);

router.delete('/delete/', deleteController);

module.exports = router;
