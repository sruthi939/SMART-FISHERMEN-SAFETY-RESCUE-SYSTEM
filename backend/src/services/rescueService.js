const { readData, writeData } = require('../config/database');
const { calculateDistanceKm } = require('./gpsService');

function dispatchNearestRescueAsset(emergencyId) {
  const db = readData();
  const emergency = db.emergencies.find(e => e.id === emergencyId);
  if (!emergency) return null;

  // Find standby or nearest rescue unit
  let bestUnit = null;
  let minDistance = Infinity;

  db.rescueUnits.forEach(unit => {
    if (unit.status === 'STANDBY' || unit.currentEmergencyId === emergencyId) {
      const dist = calculateDistanceKm(emergency.latitude, emergency.longitude, unit.latitude, unit.longitude);
      if (dist < minDistance) {
        minDistance = dist;
        bestUnit = unit;
      }
    }
  });

  if (bestUnit) {
    bestUnit.status = 'DISPATCHED';
    bestUnit.currentEmergencyId = emergencyId;
    emergency.status = 'DISPATCHED';
    emergency.assignedRescueUnit = bestUnit.unitName;
    writeData(db);
    return { emergency, rescueUnit: bestUnit, distanceKm: parseFloat(minDistance.toFixed(2)) };
  }

  return { emergency, rescueUnit: null, distanceKm: null };
}

module.exports = { dispatchNearestRescueAsset };
