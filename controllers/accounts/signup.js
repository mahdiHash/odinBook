const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

require('dotenv').config();

const controller = [
  // input validation
  body('username', 'Username must have only and at least 3 alphabetical characters').trim()
    .isAlpha().isLength({ min: 3 }),
  body('password', 'Password must be at least 6 characters').trim().isLength({ min: 6 }),
  body('confirmPass', 'The passwords you entered are not the same').trim().custom((pass, { req }) => {
    return pass === req.body.password;
  }),

  async (req, res, next) => {
    let inputErrs = validationResult(req).array();

    // check for username duplicate in the db
    let doesUsernameExist = await User.findOne({ username: req.body.username }).catch(next);

    if (doesUsernameExist) {
      inputErrs.push(new Error('Username already taken'));
    }

    if (inputErrs.length) {
      // insert input errors messages in one string with this format:
      // 'msg1,msg2,msg3,...'
      let message = inputErrs.map((err) => err.message ?? err.msg);
      
      return next(new BadRequestErr(message));
    }

    let hashedPass = await bcrypt.hash(req.body.password, 16);
    let user = new User({
      first_name: null,
      last_name: null,
      username: req.body.username,
      password: hashedPass,
      friends: null,
      privates: null,
      rooms: null,
      date_of_birth: null,
      location: null,
      profile_pic_url: null,
    });
    let token = jwt.sign(
      { _id: user._id, username: user.username, exp: 1000 * 60 * 60 * 24 * 180 },
      process.env.TOKEN_SECRET,
    );

    user.save();
    res.json(token);
  }
];

module.exports = controller;
