const User = require('../../models/users');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  if (req.user.username === req.params.username) {
    res.locals.targetUser = await User.findOne({ username: req.params.username })
      .select('-password -friends -posts')
      .populate({
        path: 'privates',
        select: 'members',
        populate: {
          path: 'members',
          select: 'username profile_pic',
        },
      })
      .populate({
        path: 'rooms',
        select: 'members profile_pic',
        populate: {
          path: 'members',
          select: 'username profile_pic',
        },
      })
      .catch(next);
  }
  else {
    res.locals.targetUser = await User.findOne({ username: req.params.username })
      .select('-password -privates -rooms -friends -posts')
      .catch(next);
  }

  if (!res.locals.targetUser) {
    return next(new NotFoundErr('User not found'));
  }

  res.json(res.locals.targetUser);
}

module.exports = controller;
