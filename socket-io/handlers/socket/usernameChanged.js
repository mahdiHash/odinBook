const User = require('../../../models/users');

const usernameChanged = async (socket, newUsername) => {
  // there's no change
  if (socket.user.username === newUsername) {
    return socket.emit('BadRequest', newUsername);
  }

  let user = await User.findById(socket.user._id).select('username');

  // the username is not correct
  if (user.username !== newUsername) {
    return socket.emit('BadRequest', newUsername);
  }

  socket.user.username = newUsername;
  socket.to([...socket.rooms]).emit('usernameChanged', socket.user._id, newUsername);
}

module.exports = usernameChanged;
