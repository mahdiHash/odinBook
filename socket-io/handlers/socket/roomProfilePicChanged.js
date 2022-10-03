const Room = require('../../../models/rooms');

const roomProfilePicChanged = async (socket, newImgName, roomId) => {
  let room = await Room.findById(roomId).select('members profile_pic_url creator');

  if (!room.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', roomId);
  }

  if (room.creator !== socket.user._id) {
    return socket.emit('Forbidden', roomId);
  }

  if (room.profile_pic_url === newImgName) {
    return socket.emit('BadRequest', newImgName);
  }

  socket.to(roomId).emit('roomProfilePicChanged', newImgName, roomId);
}

module.exports = roomProfilePicChanged;
