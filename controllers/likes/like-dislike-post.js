const Post = require('../../models/posts');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let post = await Post.findById(req.query.postid).select('likes').catch(next);

  if (!post) {
    return next(new NotFoundErr('No such post'));
  }

  let indexOfUserId = post.likes.indexOf(req.user._id);

  // user has already liked the post, so remove the like
  if (~indexOfUserId) {
    post.likes.splice(indexOfUserId, 1);
  }
  else {
    post.likes.push(req.user._id);
  }

  post.save();
  res.end();
}

module.exports = controller;
