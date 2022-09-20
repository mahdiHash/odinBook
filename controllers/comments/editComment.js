const Comment = require('../../models/comments');
const escape = require('../../utils/posts/escape');
const { body, validationResult } = require('express-validator');
const { NotFoundErr, ForbiddenErr } = require('../../utils/errors/errors');

const controller = [
  // check for the author being the same as current user
  async (req, res, next) => {
    let comment = await Comment.findById(req.query.commentid)
      .select('content is_edited author')
      .catch(next);

    if (!comment) {
      return next(new NotFoundErr('No such comment'));
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return next(new ForbiddenErr());
    }
    else {
      res.locals.comment = comment;
      next();
    }
  },

  // validation
  body('content', 'Content can\'t be empty').trim().notEmpty(),

  async (req, res, next) => {
    let error = validationResult(req).array();

    if (error.length) {
      return next(new BadRequestErr(error[0].msg));
    }

    res.locals.comment.content = escape(req.body.content);
    res.locals.comment.is_edited = true;
    res.locals.comment.save();

    res.end();
  }
];

module.exports = controller;
