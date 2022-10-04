const Room = require('../../../models/rooms');
const User = require('../../../models/users');

const joinRoom = async (io, socket, roomId) => {
  let room = await Room.findById(roomId, {
    messages: { $slice: [-100, 100] },
  }).select('members creator profile_pic name');

  if (!room) {
    return socket.emit('NotFound', roomId);
  }

  if (room.members.includes(socket.user._id)) {
    return socket.emit('AlreadyJoined', roomId);
  }

  room.members.push(socket.user._id);
  await room.save();

  // send only the last 100 messages
  room.messages = room.messages.slice(-100);

  let user = await User.findById(socket.user._id).select('rooms');
  user.rooms.push(roomId);
  user.save();

  let onlineMembers = await io.in(roomId).fetchSockets();

  socket.join(roomId);
  socket.to(roomId).emit('userJoinedRoom', socket.user._id);
  socket.emit('joinedRoom', {
    room,
    onlineMembers: onlineMembers.map((socket) => socket.user._id),
  });
}

module.exports = joinRoom;
