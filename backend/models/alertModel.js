const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['info', 'warning', 'danger'], default: 'warning' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Alert || mongoose.model('Alert', alertSchema);
