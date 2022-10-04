const sendFriendReq = async (io, socket, targetUser) => {
  if (io.onlineUsersById[targetUser]) {
    io.to(io.onlineUsersById[targetUser]).emit('friendReqreceived', {
      _id: socket.user._id,
      username: socket.user.username,
      profile_pic_url: socket.user.profile_pic_url,
    });
  }
}

module.exports = sendFriendReq;
