const Private = require('../../../models/privates');

const getPrivateMessages = async (socket, page = 1, privateId) => {
  let private = await Private.findById(privateId, {
    messages: { $slice: [-page * 100, 100] },
    members: 1,
  });

  if (!private) {
    return socket.emit('NotFound', privateId);
  }

  if (!private.members.includes(socket.user._id)) {
    return socket.emit('Forbidden', privateId);
  }

  socket.emit('retrievePrivateMessages', private.messages, privateId);
}

module.exports = getPrivateMessages;
