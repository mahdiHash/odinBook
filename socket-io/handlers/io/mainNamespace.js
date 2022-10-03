const Room = require('../../../models/rooms');
const Private = require('../../../models/privates');
const Friend_req = require('../../../models/friend_req');
const registerSocketHandlers = require('../../registerSocketHandlers');
const handlers = {};

handlers.connection = async (io, socket) => {
  socket.user = socket.request.user;
  io.onlineUsersById[socket.user._id] = socket.id;

  // join rooms and send it to client
  for (let roomId of socket.user.rooms) {
    let room = await Room.findById(roomId)
      .select('members')
      .populate({
        path: 'members',
        select: 'username profile_pic_url',
      });

    socket.join(roomId.toString());
    socket.emit('retrieveRoom', room);
  }

  // join private chats and send it to client
  for (let privateId of socket.user.privates) {
    let private = await Private.findById(privateId)
      .select('members')
      .populate({
        path: 'members',
        select: 'username profile_pic_url',
      });

    socket.join(privateId.toString());
    socket.emit('retrievePrivate', private);
  }

  socket.to([...socket.rooms]).emit('userGoOnline', {
    user_id: socket.user._id,
    username: socket.user.username,
    profile_pic: socket.user.profile_pic_url,
  });

  // notify the user about friend requests
  let friendReqs = await Friend_req.find({ to: socket.user._id });

  if (friendReqs.length) {
    socket.emit('friendReqAvailable', friendReqs.length);
  }

  registerSocketHandlers(io, socket);
}

module.exports = handlers;
