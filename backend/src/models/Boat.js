const { readData, writeData } = require('../config/database');

class Boat {
  static getAll() {
    return readData().boats;
  }

  static findById(id) {
    return readData().boats.find(b => b.id === id || b.registrationNumber === id);
  }

  static updateStatus(id, updateData) {
    const db = readData();
    const boat = db.boats.find(b => b.id === id);
    if (boat) {
      Object.assign(boat, updateData, { lastUpdated: new Date().toISOString() });
      writeData(db);
    }
    return boat;
  }
}

module.exports = Boat;
