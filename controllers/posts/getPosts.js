const Post = require('../../models/posts');

const controller = async (req, res, next) => {
  let { page = 1 } = req.query; 
  let userFriends = req.user.friends;
  let posts = await Post.find({ author: { $in: userFriends }})
  .sort('-date')
  .skip((page - 1) * 10)
  .limit(10)
  .populate('author', 'username profile_pic_url')
  .catch(next);

  res.json(posts);
}

module.exports = controller;
