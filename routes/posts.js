const router = require('express').Router();
const createController = require('../controllers/posts/createpost');

router.post('/create/', createController);

module.exports = router;
