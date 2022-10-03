const disconnecting = (io, socket) => {
  if (socket.rooms) {
    for (let roomId of socket.rooms) {
      socket.to(roomId).emit('userGoOffline', socket.user._id);
    }
  }

  delete io.onlineUsersById[socket.user._id];
}

module.exports = disconnecting;
