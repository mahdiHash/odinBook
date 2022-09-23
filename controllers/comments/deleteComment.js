const Comment = require('../../models/comments');
const Post = require('../../models/posts');
const removeReplies = require('../../utils/comments/removeReplies');
const { NotFoundErr, ForbiddenErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let comment = await Comment.findById(req.query.commentid).catch(next);

  if (!comment) {
    return next(new NotFoundErr('No such comment'));
  }

  if (comment.author.toString() !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  // remove the comment from the replies field of parent comment
  if (comment.in_reply_to) {
    let parent = await Comment.findById(comment.in_reply_to)
    .select('replies')
    .catch(next);
    
    parent.replies.splice(parent.replies.indexOf(comment._id), 1);
    parent.save();
  }

  let post = await Post.findById(comment.post)
    .select('comments')
    .catch(next);
  // remove the comment from its post's comments field
  post.comments.splice(post.comments.indexOf(comment._id), 1);
  await post.save();

  // remove replies of the comment
  await removeReplies(comment.replies, post._id);

  comment.remove();
  res.end();
}

module.exports = controller;
