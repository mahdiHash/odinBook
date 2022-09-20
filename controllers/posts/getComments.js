const Post = require('../../models/posts');
const Comment = require('../../models/comments');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let post = await Post.findById(req.query.postid)
    .select('comments')
    .catch(next);
  let comments = [];
  
  if (!post) {
    return next(new NotFoundErr('No such post'));
  }

  // populate every comment of the post
  for (let commentId of post.comments) {
    let comment = await Comment.findById(commentId).catch(next);
    comments.push(comment);
  }

  res.json(comments);
}

module.exports = controller;
