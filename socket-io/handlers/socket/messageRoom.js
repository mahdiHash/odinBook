const Room = require('../../../models/rooms');
const escape = require('../../../utils/posts/escape');

const messageRoom = async (socket, message, roomId) => {
  let room = await Room.findById(roomId).select('members messages');

  if (!room) {
    return socket.emit('NotFound', roomId);
  }

  if (!room.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', roomId);
  }

  let msgObj = {
    id: socket.user._id + 'uid' + Date.now(),
    time: new Date(),
    content: escape(message),
    author: socket.user._id,
  }

  room.messages.push(msgObj);
  await room.save();

  socket.emit('roomMessage', msgObj, roomId);
  socket.to(roomId).emit('roomMessage', msgObj, roomId);
}

module.exports = messageRoom;
