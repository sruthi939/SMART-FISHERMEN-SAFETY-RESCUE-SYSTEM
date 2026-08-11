const fs = require('fs');
const path = require('path');
const { seedDatabase } = require('../../../database/seed');

const dbPath = path.join(__dirname, '../../../database/sfsrs_data.json');

// High-performance spatial index cache
let spatialIndexCache = new Map();

function initDatabase() {
  if (!fs.existsSync(dbPath)) {
    seedDatabase();
  }
  rebuildSpatialIndex();
}

function readData() {
  initDatabase();
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file, re-seeding:', err);
    seedDatabase();
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  }
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  rebuildSpatialIndex();
}

function rebuildSpatialIndex() {
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    spatialIndexCache.clear();

    if (db.boats) {
      db.boats.forEach(b => {
        if (b.latitude && b.longitude) {
          spatialIndexCache.set(b.id, {
            lat: b.latitude,
            lon: b.longitude,
            name: b.name,
            registrationNumber: b.registrationNumber
          });
        }
      });
    }
  } catch (e) {}
}

function spatialSearch(lat, lon, maxDistanceNM = 25.0) {
  const results = [];
  spatialIndexCache.forEach((val, key) => {
    const dLat = (val.lat - lat) * 60; // 1 degree lat = 60 NM
    const dLon = (val.lon - lon) * 60 * Math.cos(lat * Math.PI / 180);
    const distNM = Math.sqrt(dLat * dLat + dLon * dLon);
    if (distNM <= maxDistanceNM) {
      results.push({ boatId: key, ...val, distanceNM: parseFloat(distNM.toFixed(2)) });
    }
  });
  return results;
}

module.exports = {
  initDatabase,
  readData,
  writeData,
  spatialSearch
};
