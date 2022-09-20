const Comment = require('../../models/comments');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let comment = await Comment.findById(req.query.commentid)
    .select('replies')
    .catch(next);
  let replies = [];

  if (!comment) {
    return next(new NotFoundErr('No such comment'));
  }

  // populate each reply
  for (let replyId of comment.replies) {
    let reply = await Comment.findById(replyId)
      .populate('author', 'username profile_pic_url')
      .catch(next);

    replies.push(reply);
  }

  res.json(replies);
}

module.exports = controller;
