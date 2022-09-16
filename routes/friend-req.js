const router = require('express').Router();
const sendReqController = require('../controllers/friend-req/sendReq');

router.post('/send', sendReqController);

module.exports = router;
