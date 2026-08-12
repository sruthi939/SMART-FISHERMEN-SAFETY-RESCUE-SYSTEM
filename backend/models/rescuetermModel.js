const mongoose = require('mongoose');

const rescueTeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  baseStation: { type: String, required: true },
  vesselName: { type: String },
  status: { type: String, default: 'On Duty' }
});

module.exports = mongoose.models.RescueTeam || mongoose.model('RescueTeam', rescueTeamSchema);
