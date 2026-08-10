const { readData, writeData } = require('../config/database');
const { calculateRiskIndex } = require('../services/aiService');

let ioInstance = null;
exports.setSocketIO = (io) => {
  ioInstance = io;
};

exports.postTelemetry = (req, res) => {
  const {
    boatId,
    latitude,
    longitude,
    speedKnots,
    headingDeg,
    fuelPct,
    batteryV,
    waterLeak,
    tiltAngle,
    signalType = 'LTE'
  } = req.body;

  const db = readData();
  const boat = db.boats.find(b => b.id === boatId || b.registrationNumber === boatId);
  if (!boat) return res.status(404).json({ error: 'Boat not found' });

  if (latitude !== undefined) boat.latitude = parseFloat(latitude);
  if (longitude !== undefined) boat.longitude = parseFloat(longitude);
  if (speedKnots !== undefined) boat.speedKnots = parseFloat(speedKnots);
  if (headingDeg !== undefined) boat.headingDeg = parseFloat(headingDeg);
  if (fuelPct !== undefined) boat.fuelPct = parseInt(fuelPct);
  if (batteryV !== undefined) boat.batteryV = parseFloat(batteryV);
  if (waterLeak !== undefined) boat.waterLeak = Boolean(waterLeak);
  if (tiltAngle !== undefined) boat.tiltAngle = parseFloat(tiltAngle);
  boat.lastUpdated = new Date().toISOString();

  // Create telemetry record
  const telemetryRecord = {
    id: `tel-${Date.now()}`,
    boatId: boat.id,
    latitude: boat.latitude,
    longitude: boat.longitude,
    speedKnots: boat.speedKnots,
    headingDeg: boat.headingDeg,
    fuelPct: boat.fuelPct,
    batteryV: boat.batteryV,
    waterLeak: boat.waterLeak,
    tiltAngle: boat.tiltAngle,
    signalType,
    recordedAt: boat.lastUpdated
  };

  // Evaluate dynamic AI safety risk
  const riskAnalysis = calculateRiskIndex({
    tiltAngle: boat.tiltAngle,
    fuelPct: boat.fuelPct,
    batteryV: boat.batteryV,
    windSpeedKnots: db.weatherForecasts[0]?.windSpeedKnots || 15,
    waveHeightM: db.weatherForecasts[0]?.waveHeightM || 1.5
  });

  writeData(db);

  if (ioInstance) {
    ioInstance.emit('boat:telemetry', {
      boat,
      telemetry: telemetryRecord,
      riskAnalysis
    });
  }

  res.json({
    message: 'Telemetry received',
    boat,
    telemetry: telemetryRecord,
    riskAnalysis
  });
};

exports.getBoatLocations = (req, res) => {
  const db = readData();
  res.json({ boats: db.boats });
};
