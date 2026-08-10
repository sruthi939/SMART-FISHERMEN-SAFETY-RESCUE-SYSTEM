/**
 * AI Safety Risk Prediction Engine
 * Evaluates marine risk based on wind, waves, sea currents, tilt, fuel, battery, and weather forecast.
 */

function calculateRiskIndex({ windSpeedKnots = 10, waveHeightM = 1.0, seaCurrentKnots = 0.5, tiltAngle = 0, fuelPct = 100, batteryV = 13.0 }) {
  let score = 0;

  // Wind speed risk weights
  if (windSpeedKnots > 35) score += 40;
  else if (windSpeedKnots > 25) score += 25;
  else if (windSpeedKnots > 15) score += 10;

  // Wave height risk weights
  if (waveHeightM > 4.0) score += 40;
  else if (waveHeightM > 2.5) score += 25;
  else if (waveHeightM > 1.5) score += 10;

  // Sea current weight
  if (seaCurrentKnots > 2.5) score += 15;
  else if (seaCurrentKnots > 1.5) score += 8;

  // Boat Stability & Health (tilt, fuel, battery)
  if (Math.abs(tiltAngle) > 25) score += 30; // Capsize danger!
  else if (Math.abs(tiltAngle) > 15) score += 15;

  if (fuelPct < 15) score += 20; // Fuel exhaustion risk
  if (batteryV < 11.5) score += 15; // Battery failure risk

  let riskLevel = 'SAFE';
  let advisory = 'Normal weather conditions. Safe for deep sea navigation.';

  if (score >= 60) {
    riskLevel = 'RETURN_IMMEDIATELY';
    advisory = 'EXTREME DANGER: Cyclone/Rough sea condition or vessel anomaly detected! Return to shore or nearest harbor immediately.';
  } else if (score >= 40) {
    riskLevel = 'HIGH_RISK';
    advisory = 'HIGH RISK: High waves and strong winds. Avoid deep sea zones. Wear lifejackets and maintain continuous radio telemetry.';
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

module.exports = { calculateRiskIndex };
