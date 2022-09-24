const Post = require('../../models/posts');
const Hashtag = require('../../models/hashtags');
const User = require('../../models/users');
const Comment = require('../../models/comments');
const { ForbiddenErr, NotFoundErr } = require('../../utils/errors/errors');

const controller = [
  // check if the author of the post is the same as user
  async (req, res, next) => {
    let post = await Post.findById(req.query.id).catch(next);

    if (!post) {
      return next(new NotFoundErr('No such post'));
    }

    if (post.author.toString() !== req.user._id.toString()) {
      next(new ForbiddenErr());
    }
    else {
      res.locals.post = post;
      next();
    }
  },

  async (req, res, next) => {
    // delete the post from author's posts field
    let user = await User.findById(req.user._id).catch(next);
    user.posts.splice(user.posts.indexOf(req.query.id), 1);
    user.save();

    // delete the post from posts field of hashtags
    for (let tag of res.locals.post.hashtags) {
      let hashtag = await Hashtag.findOne({ tag }).catch(next);
      hashtag.posts.splice(hashtag.posts.indexOf(req.query.id), 1);
      hashtag.save();
    }

    // delete all the comments of the post
    Comment.deleteMany({ post: req.query.id }).catch(next);

    // delete post
    res.locals.post.remove();
    res.end();
  }
];

module.exports = controller;
