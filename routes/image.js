const router = require('express').Router();
const uploadController = require('../controllers/image/upload');

router.post('/upload', uploadController);

module.exports = router;
