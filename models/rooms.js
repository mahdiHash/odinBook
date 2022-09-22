const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Object }],
  profile_pic_url: { type: String },
  online_members: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Room', Room);
