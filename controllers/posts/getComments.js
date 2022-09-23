const Post = require('../../models/posts');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let post = await Post.findById(req.query.postid)
    .select('comments')
    .populate({
      path: 'comments',
      match: { in_reply_to: null }, // don't get replies
      populate: { path: 'author', select: 'username profile_pic_url' }
    })
    .catch(next);

  if (!post) {
    return next(new NotFoundErr('No such post'));
  }

  let { page = 1 } = req.query;
  let skip = (page - 1) * 20;

  res.json(post.comments.slice(skip, skip + 20));
}

module.exports = controller;
