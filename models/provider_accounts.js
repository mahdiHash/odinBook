const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Provider_accounts = new Schema({
  out_id: { type: String, required: true },
  provider: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model(Provider_accounts);
