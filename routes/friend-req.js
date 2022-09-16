const router = require('express').Router();
const sendReqController = require('../controllers/friend-req/sendReq');
const acceptReqController = require('../controllers/friend-req/acceptReq');

router.post('/send', sendReqController);

router.post('/accept', acceptReqController);

module.exports = router;
