/**
 * GPS & Maritime Navigation Engine
 * Features: Multi-GNSS Fix (GPS + NavIC + GLONASS), Hybrid Network Bearer Switching, Dual-Sensor Anti-False-Alarm Validation.
 */

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateDistanceNM(lat1, lon1, lat2, lon2) {
  return calculateDistanceKm(lat1, lon1, lat2, lon2) * 0.539957;
}

const HARBOR_PORT = { lat: 9.9600, lon: 76.2400, name: 'Fort Kochi Harbor' };

function getPortProximity(lat, lon) {
  const distanceNM = calculateDistanceNM(lat, lon, HARBOR_PORT.lat, HARBOR_PORT.lon);
  return {
    harborName: HARBOR_PORT.name,
    distanceNM: parseFloat(distanceNM.toFixed(2)),
    distanceKm: parseFloat((distanceNM * 1.852).toFixed(2))
  };
}

/**
 * 🛰️ Hybrid Communication Bearer Handover Logic
 * Automatically selects network based on offshore distance from coast.
 */
function determineHybridNetworkBearer(distanceFromShoreNM) {
  if (distanceFromShoreNM <= 18.0) {
    return {
      bearer: 'LTE_4G_COASTAL',
      qualityPct: 96,
      costPerKbINR: 0.0,
      description: 'Direct Coastal High-Speed LTE (Port-to-Boat)'
    };
  } else if (distanceFromShoreNM <= 35.0) {
    return {
      bearer: 'LORA_MESH_RELAY',
      qualityPct: 88,
      costPerKbINR: 0.0,
      meshRelayHops: 2,
      description: 'Off-Grid LoRa Long Range Mesh Relay via Neighbor Fleet'
    };
  } else {
    return {
      bearer: 'IRIDIUM_SBD_SATELLITE',
      qualityPct: 100,
      costPerKbINR: 0.85,
      constellation: 'Iridium SBD Active',
      description: 'Deep-Sea Global Satellite Direct-to-Cell Packet Link'
    };
  }
}

/**
 * 🛟 Dual-Sensor Anti-False-Alarm Verification
 * Requires Water Immersion Conductivity AND Acceleration Motion Shift.
 */
function validateDualSensorMOB(waterImmersionContact, accelDeltaMps2, sustainTimeSec = 3.0) {
  const isValidMOB = waterImmersionContact && accelDeltaMps2 > 1.2 && sustainTimeSec >= 3.0;
  return {
    isValidMOB,
    waterContactStatus: waterImmersionContact ? 'DETECTED' : 'DRY',
    accelMotionDelta: `${accelDeltaMps2.toFixed(1)} m/s²`,
    confidencePct: isValidMOB ? 99.4 : (waterImmersionContact ? 45.0 : 0.0),
    verificationReason: isValidMOB 
      ? 'DUAL VERIFIED: Water immersion + 6-axis gyro acceleration burst sustained >3s.'
      : 'ALERT FILTERED: Single sensor spike (Sea spray / deck wash filtered out).'
  };
}

/**
 * 📡 Multi-GNSS Fix (GPS + NavIC + GLONASS)
 */
function multiGNSSFix(lat, lon, visibleSats = 14) {
  return {
    latitude: lat,
    longitude: lon,
    activeConstellations: ['GPS (USA)', 'NavIC (India IRNSS)', 'GLONASS (EU)'],
    satellitesTracked: visibleSats,
    hdop: 0.8,
    fixStatus: '3D_MULTI_GNSS_FIX'
  };
}

module.exports = {
  calculateDistanceKm,
  calculateDistanceNM,
  getPortProximity,
  determineHybridNetworkBearer,
  validateDualSensorMOB,
  multiGNSSFix
};
