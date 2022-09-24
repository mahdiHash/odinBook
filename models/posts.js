const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  is_edited: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hashtags: [{ type: String }],
  images: [{ type: String }],
});

module.exports = mongoose.model('Post', Post);
