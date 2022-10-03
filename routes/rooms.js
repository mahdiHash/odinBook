const router = require('express').Router();
const changeNameController = require('../controllers/rooms/changeName');
const setProfilePicController = require('../controllers/rooms/setProfilePic');

router.put('/setName', changeNameController);
router.put('/setProfilePic', setProfilePicController);

module.exports = router;
