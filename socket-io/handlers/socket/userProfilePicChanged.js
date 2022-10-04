const User = require('../../../models/users');

const userProfilePicChanged = async (socket, newImgName) => {
  // there's no change
  if (socket.user.profile_pic === newImgName) {
    return socket.emit('BadRequest', newImgName);
  }

  let user = await User.findById(socket.user._id).select('profile_pic');

  // the image name is not correct
  if (user.profile_pic !== newImgName) {
    return socket.emit('BadRequest', newImgName);
  }

  socket.to([...socket.rooms]).emit('userProfilePicChanged', socket.user._id, newImgName);
}

module.exports = userProfilePicChanged
