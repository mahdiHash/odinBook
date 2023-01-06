const Post = require('../../models/posts');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let post = await Post.findById(req.query.id)
    .populate('author', 'username profile_pic')
    .catch(next);

  if (!post) {
    return next(new NotFoundErr('No such post'));
  }

  res.json(post);
}

module.exports = controller;
