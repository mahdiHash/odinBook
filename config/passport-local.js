const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { BadRequestErr } = require('../utils/errors/errors');

passport.use(new LocalStrategy(async (username, password, cb) => {
  let user = await User.findOne({ username }).select('username password').catch(cb);

  if (!user) {
    return cb(new BadRequestErr('Username or password is wrong'));
  }

  let isMatch = await bcrypt.compare(password, user.password);
   
  if (!isMatch) {
    return cb(new BadRequestErr('Username or password is wrong'));
  }

  cb(null, user);
}));

module.exports = passport;
