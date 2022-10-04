const Comment = require('../../models/comments');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let comment = await Comment.findById(req.query.commentid)
    .select('replies')
    .populate({
      path: 'replies',
      populate: { path: 'author', select: 'username profile_pic' }
    })
    .catch(next);

  if (!comment) {
    return next(new NotFoundErr('No such comment'));
  }

  res.json(comment.replies);
}

module.exports = controller;
