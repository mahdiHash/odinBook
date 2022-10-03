const Room = require('../../../models/rooms');
const User = require('../../../models/users');

const leaveRoom = async (socket, roomId) => {
  let room = await Room.findById(roomId).select('members');
  let user = await User.findById(socket.user._id).select('rooms');

  if (!room) {
    return socket.emit('NotFound', roomId);
  }

  if (!room.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', roomId);
  }

  room.members = room.members.splice(room.members.indexOf(socket.user._id), 1);
  user.rooms = user.rooms.splice(user.rooms.indexOf(roomId), 1);
  await room.save();
  await user.save();

  socket.to(roomId).emit('userLeft', socket.user._id);
  socket.leave(roomId);
  socket.emit('leftRoom', roomId);
}

module.exports = leaveRoom;
