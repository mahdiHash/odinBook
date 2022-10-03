const User = require('../../models/users');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  // validation
  body('first_name', 'First name can\'t be empty and has to have at least 1 and only alphabetical character.')
    .trim().notEmpty().isAlpha(),
  body('last_name', 'First name can\'t be empty and has to have at least 1 and only alphabetical character.')
    .trim().notEmpty().isAlpha(),
  body('date_of_birth', 'Date of birth is not valid').isDate(),
  body('location', 'Location should be alphabetical with 2 characters').trim().isAlpha().isLength({ min: 2, max: 2 }),

  async (req, res, next) => {
    let inputErrors = validationResult(req).array();

    if (inputErrors.length) {
      let message = inputErrors.map((err) => err.msg);

      return next(new BadRequestErr(message));
    }

    let user = await User.findById(req.user._id)
      .select('location date_of_birth first_name last_name')
      .catch(next);

    user.location = req.body.location;
    user.date_of_birth = new Date(req.body.date_of_birth);
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;

    user.save();
    res.json(user);
  }
];

module.exports = controller;
