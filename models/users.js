const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true, length: { min: 3 } },
  password: { type: String },
  date_of_birth: { type: Date },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String },
  profile_pic_url: { type: String },
  rooms: [{ type: Schema.Types.ObjectId }],
  privates: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('User', User);
