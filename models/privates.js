const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Private = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Object }],
  online_members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Private', Private);
