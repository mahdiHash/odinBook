const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

require('dotenv').config();

const controller = [
  body('username', 'Username must have only and at least 3 alphabetical characters').trim()
    .isAlpha().isLength({ min: 3 }),

  async (req, res, next) => {
    let error = validationResult(req).array();

    if (error.length) {
      return next(new BadRequestErr(error[0].msg));
    }

    let duplicateUsername =
      await User.findOne({ username: req.body.username }).catch(next);

    if (duplicateUsername) {
      return next(new BadRequestErr('Username already taken'));
    }

    let user = await User.findById(req.user._id).catch(next);
    user.username = req.body.username;
    await user.save();

    let token = jwt.sign({
      _id: user._id,
      username: user.username,
      exp: 1000 * 60 * 60 * 24 * 180 // 180 days
    },
      process.env.TOKEN_SECRET
    );

    res.json(token);
  }
];

module.exports = controller;
