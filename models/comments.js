const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
  author: { type: Schema.Types.ObjectId, ref:'User', required: true },
  post: { type: Schema.Types.ObjectId, required: true},
  date: { type: Date, required: true },
  content: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  in_reply_to: { type: Schema.Types.ObjectId, ref: 'Comment' },
  is_edited: { type: Boolean, default: false },
});

module.exports = mongoose.model('Comment', Comment);
