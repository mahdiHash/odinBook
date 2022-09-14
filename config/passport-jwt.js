const User = require('../models/users');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const { BadRequestErr } = require('../utils/errors/errors');

require('dotenv').config();

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
}, async (payload, done) => {
  let user = await User.findById(payload._id).catch(done);

  if (!user) {
    return done(new BadRequestErr('Token not valid'));
  }
  
  done(null, user);
}));

module.exports = passport;
