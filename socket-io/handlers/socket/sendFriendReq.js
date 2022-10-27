const sendFriendReq = async (io, socket, targetUser) => {
  if (io.onlineUsersById[targetUser]) {
    io.to(io.onlineUsersById[targetUser]).emit('friendReqReceived', {
      _id: socket.user._id,
      username: socket.user.username,
      profile_pic: socket.user.profile_pic,
    });
  }
}

module.exports = sendFriendReq;
