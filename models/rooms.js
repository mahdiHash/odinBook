const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Object }],
  profile_pic: { type: String },
  name: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Room', Room);
