const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  boatId: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Location || mongoose.model('Location', locationSchema);
