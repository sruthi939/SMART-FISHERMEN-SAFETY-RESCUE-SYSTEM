const { readData, writeData } = require('../config/database');
const { calculateRiskIndex } = require('../services/aiService');

exports.getAllBoats = (req, res) => {
  const db = readData();
  res.json({ boats: db.boats });
};

exports.getBoatById = (req, res) => {
  const { id } = req.params;
  const db = readData();
  const boat = db.boats.find(b => b.id === id || b.registrationNumber === id);
  if (!boat) return res.status(404).json({ error: 'Boat not found' });

  const crew = db.crew.filter(c => c.boatId === boat.id);
  const wearables = db.wearables.filter(w => crew.some(c => c.wearableId === w.id));
  const activeEmergency = db.emergencies.find(e => e.boatId === boat.id && e.status !== 'CLOSED');

  const risk = calculateRiskIndex({
    tiltAngle: boat.tiltAngle,
    fuelPct: boat.fuelPct,
    batteryV: boat.batteryV
  });

  res.json({
    boat,
    crew,
    wearables,
    activeEmergency: activeEmergency || null,
    safetyRisk: risk
  });
};

exports.updateBoatStatus = (req, res) => {
  const { id } = req.params;
  const { status, latitude, longitude, speedKnots, fuelPct, batteryV } = req.body;
  const db = readData();

  const boat = db.boats.find(b => b.id === id);
  if (!boat) return res.status(404).json({ error: 'Boat not found' });

  if (status) boat.status = status;
  if (latitude !== undefined) boat.latitude = latitude;
  if (longitude !== undefined) boat.longitude = longitude;
  if (speedKnots !== undefined) boat.speedKnots = speedKnots;
  if (fuelPct !== undefined) boat.fuelPct = fuelPct;
  if (batteryV !== undefined) boat.batteryV = batteryV;
  boat.lastUpdated = new Date().toISOString();

  writeData(db);
  res.json({ message: 'Boat status updated', boat });
};
