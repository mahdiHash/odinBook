const Router = require('express').Router;
const router = new Router();
const googleLogin = require('../controllers/accounts/googleLogin');
const passport = require('../config/passport-google');
const signupController = require('../controllers/accounts/signup');
const loginController = require('../controllers/accounts/login');

router.get('/oauth2/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', googleLogin);

router.post('/signup', signupController);

router.post('/login', loginController);

module.exports = router;
