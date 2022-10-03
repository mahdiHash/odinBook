const Room = require('../../../models/rooms');

const roomNameChanged = async (socket, newName, roomId) => {
  let room = await Room.findById(roomId).select('members name creator');

  if (!room.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', roomId);
  }

  if (room.creator !== socket.user._id) {
    return socket.emit('Forbidden', roomId);
  }

  if (room.name === newName) {
    return socket.emit('BadRequest', newName);
  }

  socket.to(roomId).emit('roomNameChanged', newName, roomId);
}

module.exports = roomNameChanged;
