/**
 * GPS & Navigation Helper Service
 * Haversine formula for distance calculation between coordinates in Nautical Miles & Kilometers.
 */

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
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

// Distance to Kochi home port default (9.9312, 76.2673)
const HARBOR_PORT = { lat: 9.9312, lon: 76.2673, name: 'Kochi Harbor' };

function getPortProximity(lat, lon) {
  const distanceNM = calculateDistanceNM(lat, lon, HARBOR_PORT.lat, HARBOR_PORT.lon);
  return {
    harborName: HARBOR_PORT.name,
    distanceNM: parseFloat(distanceNM.toFixed(2)),
    distanceKm: parseFloat((distanceNM * 1.852).toFixed(2))
  };
}

module.exports = {
  calculateDistanceKm,
  calculateDistanceNM,
  getPortProximity
};
