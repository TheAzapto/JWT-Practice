const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  label: String,
  key: { type: String, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
