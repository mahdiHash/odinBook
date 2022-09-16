const router = require('express').Router();
const setUsernameController = require('../controllers/users/setUsername');

router.put('/setusername', setUsernameController);

module.exports = router;
