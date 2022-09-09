const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, length: { min: 3 } },
  password: { type: String, required: true, length: { min: 8 }},
  date_of_birth: { type: Date },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String, required: true },
  profile_pic_url: { type: String },
  rooms: [{ type: Schema.Types.ObjectId }],
  privates: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('User', User);
