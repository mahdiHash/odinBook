const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Friend_req = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, default: '' },
});

module.exports = mongoose.model('Friend_req', Friend_req);
