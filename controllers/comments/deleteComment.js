const Comment = require('../../models/comments');
const { NotFoundErr, ForbiddenErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let comment = await Comment.findById(req.query.commentid).catch(next);

  if (!comment) {
    return next(new NotFoundErr('No such comment'));
  }

  if (comment.author.toString() !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  comment.remove();
  res.end();
}

module.exports = controller;
