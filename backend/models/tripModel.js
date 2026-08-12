const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  boatName: {
    type: String,
    required: true
  },
  captainName: {
    type: String,
    required: true
  },
  durationHours: {
    type: Number
  },
  crewCount: {
    type: Number
  },
  sector: {
    type: String
  },
  status: {
    type: String,
    default: 'ACTIVE'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  }
});

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
