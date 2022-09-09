const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
  athor: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, required: true},
  date: { type: Date, required: true },
  content: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  in_reply_to: { type: Schema.Types.ObjectId, ref: 'Comment' },
  is_edited: { type: Boolean, default: false },
  hashtags: [{ type: String }],
});

module.exports = mongoose.model('Comment', Comment);
