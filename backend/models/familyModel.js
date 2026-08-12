const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
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
  relationship: {
    type: String
  },
  fishermanPhone: {
    type: String
  }
});

module.exports = mongoose.models.Family || mongoose.model('Family', familySchema);
