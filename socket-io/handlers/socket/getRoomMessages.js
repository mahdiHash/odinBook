const Room = require('../../../models/rooms');

const getRoomMessages = async (socket, page = 1, roomId) => {
  let room = await Room.findById(roomId, {
    messages: { $slice: [-page * 100, 100] }
  }).select('members');

  if (!room) {
    return socket.emit('NotFound', roomId);
  }

  if (!room.members.includes(socket.user._id.toString())) {
    return socket.emit('Forbidden', roomId);
  }

  socket.emit('retrieveRoomMessages', room.messages, roomId);
}

module.exports = getRoomMessages;
