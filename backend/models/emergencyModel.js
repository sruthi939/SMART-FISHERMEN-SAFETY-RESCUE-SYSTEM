const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  sosId: { type: String, required: true },
  vessel: { type: String, required: true },
  captain: { type: String, required: true },
  coords: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  status: { type: String, default: 'ACTIVE' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Emergency || mongoose.model('Emergency', emergencySchema);
