const passport = require('../../config/passport-google');
const errors = require('../../utils/errors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const controller = [
  passport.authenticate('google', { session: false}),

  (req, res, next) => {
    // authentication not successful
    if (!req.user) {
      next(new errors.BadRequestErr('Google login credentials not valid'));
    }
    // authentication successful
    else {
      new Promise((resolve, reject) => {
        let token = jwt.sign(
          { _id: req.user._id, username: req.user.username },
          process.env.TOKEN_SECRET,
        );
        resolve(token);
      })
        .then((token) => {
          res.json(token);
        })
        .catch((err) => {
          next(new errors.ServerSideErr());
        });
    }
  }
];

module.exports = controller;
