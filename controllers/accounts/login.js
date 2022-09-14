const passport = require('../../config/passport-local');
const jwt = require('jsonwebtoken');
const { BadRequestErr } = require('../../utils/errors/errors');

require('dotenv').config();

const controller = [
  passport.authenticate('local', { session: false }),

  (req, res, next) => {
    let token = jwt.sign(
      { _id: req.user._id, username: req.user.username, exp: 1000 * 60 * 60 * 24 * 180 },
      process.env.TOKEN_SECRET,
    );

    res.json(token);
  }
];

module.exports = controller;
