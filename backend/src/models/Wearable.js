const { readData, writeData } = require('../config/database');

class Wearable {
  static getAll() {
    return readData().wearables;
  }

  static findById(id) {
    return readData().wearables.find(w => w.id === id || w.macAddress === id);
  }
}

module.exports = Wearable;
