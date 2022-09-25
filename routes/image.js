const router = require('express').Router();
const uploadController = require('../controllers/image/upload');
const deleteController = require('../controllers/image/deleteImg');
const getController = require('../controllers/image/getImg');

router.post('/upload', uploadController);

router.delete('/delete', deleteController);

router.get('/get/:imgName', getController);

module.exports = router;
