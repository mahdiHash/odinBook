const Comment = require('../../models/comments');
const Post = require('../../models/posts');

async function removeReplies(repliesIds, postId) {
  for (let replyId of repliesIds) {
    let reply = await Comment.findById(replyId).select('replies');

    if (reply.replies.length) {
      await removeReplies(reply.replies, postId);
    }

    let post = await Post.findById(postId).select('comments');
    post.comments.splice(post.comments.indexOf(reply._id), 1);
    await post.save();
    reply.remove();
  }
}

module.exports = removeReplies;
