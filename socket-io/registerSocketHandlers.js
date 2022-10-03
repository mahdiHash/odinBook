const disconnecting = require('./handlers/socket/disconnecting');
const createRoom = require('./handlers/socket/createRoom');
const messageRoom = require('./handlers/socket/messageRoom');
const getRoomMessages = require('./handlers/socket/getRoomMessages');
const joinRoom = require('./handlers/socket/joinRoom');
const deleteRoom = require('./handlers/socket/deleteRoom');
const leaveRoom = require('./handlers/socket/leaveRoom');
const sendFriendReq = require('./handlers/socket/sendFriendReq');
const acceptFriendReq = require('./handlers/socket/acceptFriendReq');
const startPrivate = require('./handlers/socket/startPrivate');
const messagePrivate = require('./handlers/socket/messagePrivate');
const getPrivateMessages = require('./handlers/socket/getPrivateMessages');
const usernameChanged = require('./handlers/socket/usernameChanged');
const userProfilePicChanged = require('./handlers/socket/userProfilePicChanged');
const userProfileInfoChanged = require('./handlers/socket/userProfileInfoChanged');
const roomProfilePicChanged = require('./handlers/socket/roomProfilePicChanged');
const roomNameChanged = require('./handlers/socket/roomNameChanged');

const registerHandlers = (io, socket) => {
  socket.on('disconnecting', disconnecting.bind(null, io, socket));
  socket.on('createRoom', createRoom.bind(null, socket));
  socket.on('messageRoom', messageRoom.bind(null, socket));
  socket.on('getRoomMessages', getRoomMessages.bind(null, socket));
  socket.on('joinRoom', joinRoom.bind(null, io, socket));
  socket.on('deleteRoom', deleteRoom.bind(null, socket));
  socket.on('leaveRoom', leaveRoom.bind(null, socket));
  socket.on('sendFriendReq', sendFriendReq.bind(null, io, socket));
  socket.on('acceptFriendReq', acceptFriendReq.bind(null, io, socket));
  socket.on('startPrivate', startPrivate.bind(null, io, socket));
  socket.on('messagePrivate', messagePrivate.bind(null, socket));
  socket.on('getPrivateMessages', getPrivateMessages.bind(null, socket)); 
  socket.on('usernameChanged', usernameChanged.bind(null, socket));
  socket.on('profilePicChanged', userProfilePicChanged.bind(null, socket));
  socket.on('profileInfoChanaged', userProfileInfoChanged.bind(null, socket));
  socket.on('roomProfilePicChanged', roomProfilePicChanged.bind(null, socket));
  socket.on('roomNameChanged', roomNameChanged.bind(null, socket));
}

module.exports = registerHandlers;
