const router = require('express').Router();
const createController = require('../controllers/posts/createpost');
const editController = require('../controllers/posts/editpost');

router.post('/create/', createController);

router.post('/edit/', editController);

module.exports = router;
