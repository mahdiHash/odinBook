const router = require('express').Router();
const setUsernameController = require('../controllers/users/setUsername');
const getFriendsController = require('../controllers/users/getFriends');
const getPostsController = require('../controllers/users/getPosts');
const getUserProfileController = require('../controllers/users/getUser');
const setProfileInfoController = require('../controllers/users/setProfileInfo');

router.put('/setusername', setUsernameController);

router.get('/friends', getFriendsController);

router.post('/setprofileinfo', setProfileInfoController);

router.get('/:username/posts', getPostsController);

router.get('/:username', getUserProfileController);

module.exports = router;
