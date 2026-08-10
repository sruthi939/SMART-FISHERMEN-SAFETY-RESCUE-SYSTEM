const { readData, writeData } = require('../config/database');
const { dispatchNearestRescueAsset } = require('../services/rescueService');

exports.getRescueUnits = (req, res) => {
  const db = readData();
  res.json({ rescueUnits: db.rescueUnits });
};

exports.dispatchUnit = (req, res) => {
  const { emergencyId } = req.body;
  const result = dispatchNearestRescueAsset(emergencyId);
  if (!result) return res.status(404).json({ error: 'Emergency not found or rescue asset unavailable' });
  res.json({ message: 'Rescue asset dispatched', result });
};

exports.updateUnitPosition = (req, res) => {
  const { id } = req.params;
  const { latitude, longitude, status } = req.body;
  const db = readData();

  const unit = db.rescueUnits.find(u => u.id === id);
  if (!unit) return res.status(404).json({ error: 'Rescue unit not found' });

  if (latitude !== undefined) unit.latitude = parseFloat(latitude);
  if (longitude !== undefined) unit.longitude = parseFloat(longitude);
  if (status) unit.status = status;

  writeData(db);
  res.json({ message: 'Rescue unit location updated', unit });
};
