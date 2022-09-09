const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hashtag = new Schema({
  tag: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('Hashtag', Hashtag);
