const Room = require('../../../models/rooms');
const User = require('../../../models/users');

const deleteRoom = async (socket, roomId) => {
  let room = await Room.findById(roomId);

  if (!room) {
    return socket.emit('NotFound', roomId);
  }

  if (room.creator.toString() !== socket.user._id.toString()) {
    return socket.emit('Forbidden', roomId);
  }

  for (let memberId of room.members) {
    let user = await User.findById(memberId).select('rooms');
    user.rooms = user.rooms.splice(user.rooms.indexOf(roomId), 1);
    await user.save();
  }

  room.remove();
  socket.emit('roomDeleted', roomId);
  socket.to(roomId).emit('roomDeleted', roomId);
  socket.leave(roomId);
}

module.exports = deleteRoom;
