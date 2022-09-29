const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  body('password', 'Password must be at least 6 characters').trim().isLength({ min: 6 }),
  body('confirmPass', 'The passwords you entered are not the same').trim().custom((pass, { req }) => {
    return pass === req.body.password;
  }),

  async (req, res, next) => {
    let errors = validationResult(req).array();
    let user = await User.findById(req.user._id)
      .select('password')
      .catch(next);

    if (user.password) {
      // check if the oldPass is the same as user's password
      let doesMatch = await bcrypt.compare(req.body.oldPass, user.password);

      if (!doesMatch) {
        errors.push(new Error('Old password is not correct'));
        
        // insert input errors messages in one string with this format:
        // 'msg1,msg2,msg3,...'
        let message = errors.map((err) => err.message ?? err.msg);

        return next(new BadRequestErr(message));
      }
    }

    let newPass = await bcrypt.hash(req.body.password, 16);

    user.password = newPass;
    user.save();
    res.end();
  }
];

module.exports = controller;
