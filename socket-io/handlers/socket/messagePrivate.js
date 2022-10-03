const Private = require('../../../models/privates');

const messagePrivate = async (socket, message, privateId) => {
  let private = await Private.findById(privateId);

  if (!private) {
    return socket.emit('NotFound', privateId);
  }

  if (!private.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', privateId);
  }

  let msgObj = {
    id: socket.user._id + 'uid' + Date.now(),
    time: new Date,
    content: message,
    author: socket.user._id,
  }

  private.messages.push(msgObj);
  await private.save();

  socket.emit('privateMessage', msgObj, privateId);
  socket.to(privateId).emit('privateMessage', msgObj, privateId);
}

module.exports = messagePrivate;
