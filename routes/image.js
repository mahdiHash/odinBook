const router = require('express').Router();
const uploadController = require('../controllers/image/upload');
const deleteController = require('../controllers/image/deleteImg');

router.post('/upload', uploadController);

router.delete('/delete', deleteController);

module.exports = router;
