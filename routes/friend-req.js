const router = require('express').Router();
const sendReqController = require('../controllers/friend-req/sendReq');
const acceptReqController = require('../controllers/friend-req/acceptReq');
const getAllReqsController = require('../controllers/friend-req/getReqs');

router.post('/send', sendReqController);

router.post('/accept', acceptReqController);

router.get('/', getAllReqsController);

module.exports = router;
