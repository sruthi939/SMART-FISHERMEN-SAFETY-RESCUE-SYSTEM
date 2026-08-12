const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  regNumber: {
    type: String,
    required: true,
    unique: true
  },
  captainName: {
    type: String
  },
  speed: {
    type: Number,
    default: 0
  },
  battery: {
    type: Number,
    default: 100
  },
  status: {
    type: String,
    default: 'Active'
  },
  lat: {
    type: Number,
    default: 9.9312
  },
  lng: {
    type: Number,
    default: 76.2673
  }
});

module.exports = mongoose.models.Boat || mongoose.model('Boat', boatSchema);
