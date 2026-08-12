const mongoose = require('mongoose');

const fishermanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  licenseNumber: {
    type: String
  },
  harbor: {
    type: String,
    default: 'Cochin Port'
  },
  experienceYears: {
    type: String
  },
  status: {
    type: String,
    default: 'Safe'
  }
});

module.exports = mongoose.models.Fisherman || mongoose.model('Fisherman', fishermanSchema);
