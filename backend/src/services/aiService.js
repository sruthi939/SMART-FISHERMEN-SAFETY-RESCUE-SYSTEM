/**
 * AI Safety Risk Prediction Engine
 * Features: Weather risk classification, Capsize probability, AI MOB Drift Trajectory Prediction, IMBL Border Geofencing.
 */

function calculateRiskIndex({ windSpeedKnots = 10, waveHeightM = 1.0, seaCurrentKnots = 0.5, tiltAngle = 0, fuelPct = 100, batteryV = 13.0 }) {
  let score = 0;

  if (windSpeedKnots > 35) score += 40;
  else if (windSpeedKnots > 25) score += 25;
  else if (windSpeedKnots > 15) score += 10;

  if (waveHeightM > 4.0) score += 40;
  else if (waveHeightM > 2.5) score += 25;
  else if (waveHeightM > 1.5) score += 10;

  if (seaCurrentKnots > 2.5) score += 15;
  else if (seaCurrentKnots > 1.5) score += 8;

  if (Math.abs(tiltAngle) > 25) score += 30; // Capsize warning
  else if (Math.abs(tiltAngle) > 15) score += 15;

  if (fuelPct < 15) score += 20;
  if (batteryV < 11.5) score += 15;

  let riskLevel = 'SAFE';
  let advisory = 'Normal weather conditions. Safe for deep sea navigation.';

  if (score >= 60) {
    riskLevel = 'RETURN_IMMEDIATELY';
    advisory = 'EXTREME DANGER: Cyclone/Rough sea condition or vessel anomaly detected! Return to shore immediately.';
  } else if (score >= 40) {
    riskLevel = 'HIGH_RISK';
    advisory = 'HIGH RISK: High waves and strong winds. Avoid deep sea zones. Wear lifejackets.';
  } else if (score >= 20) {
    riskLevel = 'MODERATE_RISK';
    advisory = 'MODERATE RISK: Moderate sea swell and gusty winds. Exercise caution.';
  }

  return {
    score,
    riskLevel,
    advisory,
    timestamp: new Date().toISOString()
  };
}

/**
 * AI MOB Drift Trajectory Prediction Engine
 * Calculates projected victim position at +1h, +2h, +3h based on sea current & leeway wind vector.
 */
function calculateMOBDriftTrajectory(lat, lon, currentKnots = 1.8, currentHeadingDeg = 225, windKnots = 20.0) {
  const R = 6371.0;
  const deg2rad = Math.PI / 180.0;
  const rad2deg = 180.0 / Math.PI;

  const driftSpeedKnots = currentKnots + (windKnots * 0.03);
  const driftSpeedKmh = driftSpeedKnots * 1.852;
  const driftDirRad = currentHeadingDeg * deg2rad;

  const trajectory = [];
  for (let hour = 1; hour <= 3; hour++) {
    const distKm = driftSpeedKmh * hour;
    const dLat = (distKm * Math.cos(driftDirRad)) / R * rad2deg;
    const dLon = (distKm * Math.sin(driftDirRad)) / (R * Math.cos(lat * deg2rad)) * rad2deg;

    trajectory.append ? null : trajectory.push({
      hour,
      latitude: parseFloat((lat + dLat).toFixed(5)),
      longitude: parseFloat((lon + dLon).toFixed(5)),
      driftDistanceNM: parseFloat((driftSpeedKnots * hour).toFixed(2)),
      searchRadiusMeters: 500 + (hour * 400)
    });
  }

  return {
    initialPosition: { latitude: lat, longitude: lon },
    driftSpeedKnots: parseFloat(driftSpeedKnots.toFixed(2)),
    trajectory
  };
}

/**
 * International Maritime Boundary Line (IMBL) Geofence Check
 */
const IMBL_LINE = { latitude: 9.7500, label: 'International Maritime Boundary Line (IMBL)' };

function checkIMBLProximity(lat, lon) {
  const distKm = Math.abs(lat - IMBL_LINE.latitude) * 111.0;
  const distNM = distKm * 0.539957;
  const isNearBorder = distNM < 5.0;

  return {
    isNearBorder,
    distanceNM: parseFloat(distNM.toFixed(2)),
    warningMessage: isNearBorder ? `BORDER WARNING: Vessel is ${distNM.toFixed(1)} NM from IMBL. Avoid crossing!` : 'Clear of International Waters'
  };
}

module.exports = {
  calculateRiskIndex,
  calculateMOBDriftTrajectory,
  checkIMBLProximity
};
