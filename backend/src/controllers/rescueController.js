const { readData, writeData } = require('../config/database');
const { dispatchNearestRescueAsset } = require('../services/rescueService');
const { calculateMOBDriftTrajectory } = require('../services/aiService');

exports.getRescueUnits = (req, res) => {
  const db = readData();
  res.json({ rescueUnits: db.rescueUnits });
};

exports.getDriftTrajectory = (req, res) => {
  const lat = parseFloat(req.query.lat) || 9.8540;
  const lon = parseFloat(req.query.lon) || 76.1200;
  const currentKnots = parseFloat(req.query.currentKnots) || 1.8;
  const headingDeg = parseFloat(req.query.headingDeg) || 225;

  const result = calculateMOBDriftTrajectory(lat, lon, currentKnots, headingDeg);
  res.json(result);
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
