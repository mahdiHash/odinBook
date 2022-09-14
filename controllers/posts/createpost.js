const Post = require('../../models/posts');
const HashTag = require('../../models/hashtags');
const hashtagExtracter = require('../../utils/hashtagExtracter');
const { body, validationResult } = require('express-validator');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  // input validation
  body('content', 'Content can\'t be empty').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    let error = validationResult(req).array();

    if (error.length) {
      return next(new BadRequestErr(error[0].msg));
    }

    let hashtags = hashtagExtracter(req.body.content);
    let post = new Post({
      author: req.user.username,
      date: new Date(),
      content: req.body.content,
      is_edited: false,
      comments: [],
      likes: [],
      hashtags: hashtags,
    });

    // store the post._id in the hashtag document in db
    for (let tag of hashtags) {
      let existingTag = await HashTag.findOne({ tag }).catch(next);
      
      if (existingTag) {
        existingTag.posts.push(post._id);
        existingTag.save();
        continue;
      }

      let newTag = new HashTag({
        tag,
        posts: [post._id],
      });

      newTag.save();
    }

    post.save();
    res.json(post);
  }
];

module.exports = controller;
