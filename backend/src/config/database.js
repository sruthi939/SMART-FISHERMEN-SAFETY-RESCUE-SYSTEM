const fs = require('fs');
const path = require('path');
const { seedDatabase } = require('../../../database/seed');

const dbPath = path.join(__dirname, '../../../database/sfsrs_data.json');

function initDatabase() {
  if (!fs.existsSync(dbPath)) {
    seedDatabase();
  }
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
}

module.exports = {
  initDatabase,
  readData,
  writeData
};
