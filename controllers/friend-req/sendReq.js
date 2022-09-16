const Friend_req = require('../../models/friend_req');
const User = require('../../models/users');
const escape = require('../../utils/posts/escape');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let targetUser = await User.findById(req.body.to).catch(next);

  if (!targetUser) {
    return next(new BadRequestErr('No such user'));
  }

  // the target user can't be the current user!
  if (targetUser._id.toString() == req.user._id.toString()) {
    return next(new BadRequestErr());
  }

  // users are already in each other's friends list
  if (targetUser.friends.includes(req.user._id)) {
    return next(new BadRequestErr());
  }

  let duplicateReq = await Friend_req.findOne({ 
    to: req.body.to, 
    from: req.user._id,
  }).catch(next);

  if (duplicateReq) {
    return next(new BadRequestErr('Request already sent'));
  }

  let request = new Friend_req({
    to: req.body.to,
    from: req.user._id,
    message: escape(req.body.message ?? ''),
  });
  request.save();

  res.json(request);
}

module.exports = controller;
