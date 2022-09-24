const Post = require('../../models/posts');
const Hashtag = require('../../models/hashtags');
const hashtagExtractor = require('../../utils/posts/hashtagExtractor');
const escape = require('../../utils/posts/escape');
const { body, validationResult } = require('express-validator');
const { BadRequestErr, ForbiddenErr, NotFoundErr } = require('../../utils/errors/errors');

const controller = [
  // check if the author of the post is the same as user
  async (req, res, next) => {
    let post = await Post.findById(req.query.id).catch(next);

    if (!post) {
      return next(new NotFoundErr('No such post'));
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return next(new ForbiddenErr());
    }
    else {
      res.locals.post = post;
      next();
    }
  },

  // validation
  body('content', 'Content can\'t be empty').trim().isLength({ min: 1 }),

  async (req, res, next) => {
    let error = validationResult(req).array();

    if (error.length) {
      return next(new BadRequestErr(error[0].msg));
    }

    let post = res.locals.post,
      upPostHashtags = hashtagExtractor(req.body.content);

    // remove the post._id from the old hashtags posts field
    // if the new set of hashtags doesn't include any of the old ones,
    // the old hashtag is deleted
    for (let i = 0; i < post.hashtags.length; i++) {
      if (!upPostHashtags.includes(post.hashtags[i])) {
        let tag = await Hashtag.findOne({ tag: post.hashtags[i] }).catch(next);
        tag.posts.splice(tag.posts.indexOf(post._id), 1);
        await tag.save();
      }
    }
    
    // insert the post._id to new hashtags posts field
    // if the new set of hashtags includes a hashtag which is not in the old set,
    // the hashtag is new and should be inserted
    for (let i = 0; i < upPostHashtags.length; i++) {
      if (!post.hashtags.includes(upPostHashtags[i])) {
        let tag = await Hashtag.findOne({ tag: upPostHashtags[i] }).catch(next);
        
        // the hashtag is totally new, so create a new document
        if (!tag) {
          let newTag = new Hashtag({
            tag: upPostHashtags[i],
            posts: [post._id],
          });
          
          await newTag.save();
        }
        else {
          tag.posts.push(post._id);
          await tag.save();
        }
      }
    }
    
    post.content = escape(req.body.content);
    post.hashtags = upPostHashtags;
    post.is_edited = true;
    post.images = req.body.images ?? post.images;
    post.save();
    res.json(post);
  }
];

module.exports = controller;
