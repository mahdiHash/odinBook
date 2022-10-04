const Friend_req = require('../../../models/friend_req');

const acceptFriendReq = async (io, socket, reqId) => {
  let friendReq = await Friend_req.findById(reqId).select('from to')
    .populate({
      path: 'to',
      select: 'username profile_pic',
    });

  if (friendReq.to._id.toString() !== socket.user._id.toString()) {
    return socket.emit('Forbidden', reqId);
  }

  if (io.onlineUsersById[friendReq.from]) {
    io.to(io.onlineUsersById[friendReq.from]).emit('friendReqAccepted', friendReq.to);
  }
}

module.exports = acceptFriendReq;
