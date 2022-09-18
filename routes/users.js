const router = require('express').Router();
const setUsernameController = require('../controllers/users/setUsername');
const getFriendsController = require('../controllers/users/getFriends');

router.put('/setusername', setUsernameController);

router.get('/friends', getFriendsController)

module.exports = router;
