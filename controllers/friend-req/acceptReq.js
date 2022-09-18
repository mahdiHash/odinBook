const Friend_req = require('../../models/friend_req');
const User = require('../../models/users');
const { BadRequestErr, ForbiddenErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let request = await Friend_req.findById(req.query.id).catch(next);

  if (!request) {
    return next(new BadRequestErr('No such request'));
  }

  if (request.to.toString() !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  let targetUser = await User.findById(request.to).catch(next);
  targetUser.friends.push(request.from);
  targetUser.save();

  let senderUser = await User.findById(request.from).catch(next);
  senderUser.friends.push(request.to);
  senderUser.save();

  request.remove();

  // delete the request from target user to current user, if there's any
  Friend_req.findOne({ to: request.from, from: request.to}).then((friendReq) => {
    if (friendReq) {
      friendReq.remove();
    }
    return;
  }).catch(next);

  res.end();
}

module.exports = controller;
