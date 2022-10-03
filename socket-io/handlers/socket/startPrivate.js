const User = require('../../../models/users');
const Private = require('../../../models/privates');

const startPrivate = async (io, socket, targetUser) => {
  let target = await User.findById(targetUser).select('privates');
  let source = await User.findById(socket.user._id).select('privates');

  if (!target) {
    return socket.emit('NotFound', targetUser);
  }

  let duplicate = await Private.findOne({
    $and: [
      { members: target._id.toString() },
      { members: source._id.toString() },
    ]
  }
  ).select('_id');

  if (duplicate) {
    return socket.emit('DuplicatePrivate', targetUser);
  }

  let private = new Private({
    members: [target._id, source._id],
    messages: [],
  });

  target.privates.push(private._id);
  source.privates.push(private._id);
  target.save();
  source.save();
  private.save();

  socket.emit('privateCreated', private, targetUser);

  if (io.onlineUsersById[targetUser]) {
    io.to(io.onlineUsersById[targetUser])
      .emit('privateCreated', private, socket.user._id);
  }
}

module.exports = startPrivate;
