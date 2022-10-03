const Room = require('../../models/rooms'); 
const { body, validationResult } = require('express-validator');
const { BadRequestErr, NotFoundErr, ForbiddenErr } = require('../../utils/errors/errors');

const controller = [
  body('name', 'Name must have at least 1 and only alphabetical characters')
    .trim().isAlpha(),

  async (req, res, next) => {
    if (room.creator.toString() !== req.user._id.toString()) {
      return next(new ForbiddenErr());
    }

    let errors = validationResult(req).array();
    let room = await Room.findById(req.query.roomId).select('name creator');

    if (!room) {
      errors.push(new NotFoundErr('No such room'));
    }

    if (errors.length) {
      let message = errors.map((err) => err.msg);
      return next(new BadRequestErr(message));
    }

    room.name = req.body.name;
    room.save();

    res.end();
  }
];

module.exports = controller;
