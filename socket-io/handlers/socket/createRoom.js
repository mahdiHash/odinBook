const Room = require('../../../models/rooms');
const User = require('../../../models/users');
 
const createRoom = async (socket, roomInfo) => {
  let room = new Room({
    members: [socket.user._id],
    creator: socket.user._id,
    messages: [],
    name: roomInfo.name,
    profile_pic: roomInfo.profile_pic ?? null,
  });
  await room.save();

  let user = await User.findById(socket.user._id).select('rooms');
  user.rooms.push(room._id);
  await user.save();

  socket.join(room._id.toString());
  socket.emit('roomCreated', room);
}

module.exports = createRoom;
