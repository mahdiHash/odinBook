const Comment = require('../../models/comments');
const Post = require('../../models/posts');
const escape = require('../../utils/posts/escape');
const { body, validationResult } = require('express-validator');
const { BadRequestErr, NotFoundErr } = require('../../utils/errors/errors');

const controller = [
  // validation 
  body('content', 'Content can\'t be empty').trim().notEmpty(),

  async (req, res, next) => {
    let errors = validationResult(req).array();
    let post = await Post.findById(req.query.postid)
      .select('comments')
      .catch(next);

    if (!post) {
      errors.push(new NotFoundErr('No such post'));
    }

    if (req.body.replyTo) {
      let parentComment = await Comment.findById(req.body.replyTo)
        .select('replies')
        .catch(next)
      
      if (!parentComment) {
        errors.push(new NotFoundErr('No such comment'));
      }
      else {
        res.locals.parentComment = parentComment;
      }
    }

    if (errors.length) {
      // insert input errors messages in one string with this format:
      // 'msg1,msg2,msg3,...'
      let msg = errors.map((err) => err.message ?? err.msg)

      return next(new BadRequestErr(msg));
    }

    let comment = new Comment({
      author: req.user._id,
      content: escape(req.body.content),
      date: new Date(),
      replies: [],
      in_reply_to: req.body.replyTo ?? null,
      is_edited: false,
      post: req.query.postid,
    });

    post.comments.push(comment._id);
    post.save();

    res.locals.parentComment?.replies.push(comment._id);
    res.locals.parentComment?.save();
    
    comment.save();

    res.json(comment);
  }
];

module.exports = controller;
