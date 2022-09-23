const User = require('../../models/users');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username })
    .select('posts')
    .populate({
      path: 'posts',
      populate: { path: 'author', select: 'username profile_pic_url' },
    })
    .catch(next);

  if (!user) {
    return next(new NotFoundErr('No such user'));
  }

  let { page = 1 } = req.query;
  let skip = (page - 1) * 10;

  res.json(user.posts.slice(skip, skip + 10));
}

module.exports = controller;
