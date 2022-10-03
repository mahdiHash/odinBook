const router = require('express').Router();
const changeNameController = require('../controllers/rooms/changeName');

router.put('/setName', changeNameController);

module.exports = router;
