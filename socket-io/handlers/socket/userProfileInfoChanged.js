const userProfileInfoChanged = async (socket, newInfo) => {
  let isChanged = newInfo.first_name !== socket.user.first_name ||
    newInfo.last_name !== socket.user.last_name ||
    newInfo.date_of_birth !== socket.user.date_of_birth.toString() ||
    newInfo.location !== socket.user.location;

  if (isChanged) {
    socket.to([...socket.rooms]).emit('userProfileInfoChanged', socket.user._id, newInfo);
  }
  else {
    socket.emit('BadRequest', newInfo);
  }
}

module.exports = userProfileInfoChanged;
