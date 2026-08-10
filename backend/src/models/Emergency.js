const { readData, writeData } = require('../config/database');

class Emergency {
  static getAll() {
    return readData().emergencies;
  }

  static create(emergencyData) {
    const db = readData();
    db.emergencies.unshift(emergencyData);
    writeData(db);
    return emergencyData;
  }
}

module.exports = Emergency;
