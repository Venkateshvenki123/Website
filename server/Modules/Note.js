const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', noteSchema);
