const { readData } = require('../config/database');

class GPSLocation {
  static getLatest(boatId) {
    const boat = readData().boats.find(b => b.id === boatId);
    return boat ? { latitude: boat.latitude, longitude: boat.longitude, speedKnots: boat.speedKnots, headingDeg: boat.headingDeg } : null;
  }
}

module.exports = GPSLocation;
