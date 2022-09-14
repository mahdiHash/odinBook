const Post = require('../../models/posts');
const hashtagExtracter = require('../../utils/hashtagExtracter');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  // input validation
  body('content', 'Content can\'t be empty').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    let error = validationResult(req).array();

    if (error.length) {
      return next(new BadRequestErr(error[0].msg));
    }

    let post = new Post({
      author: req.user.username,
      date: new Date(),
      content: req.body.content,
      is_edited: false,
      comments: [],
      likes: [],
      hashtags: hashtagExtracter(req.body.content),
    });

    post.save();
    res.json(post);
  }
];

module.exports = controller;
