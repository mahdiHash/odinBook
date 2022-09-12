const Router = require('express').Router;
const router = new Router();
const controller = require('../controllers/accounts/googleLogin');
const passport = require('../config/passport-google');

router.get('/oauth2/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', controller);

module.exports = router;
