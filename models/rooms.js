const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Object }],
  online_members: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Room', Room);
