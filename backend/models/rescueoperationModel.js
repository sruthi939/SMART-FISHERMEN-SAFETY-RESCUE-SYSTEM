const mongoose = require('mongoose');

const rescueOperationSchema = new mongoose.Schema({
  operationId: { type: String, required: true },
  emergencyId: { type: String, required: true },
  squadron: { type: String, required: true },
  status: { type: String, default: 'DISPATCHED' },
  etaMinutes: { type: Number, default: 15 }
});

module.exports = mongoose.models.RescueOperation || mongoose.model('RescueOperation', rescueOperationSchema);
