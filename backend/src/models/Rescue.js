const { readData } = require('../config/database');

class Rescue {
  static getUnits() {
    return readData().rescueUnits;
  }
}

module.exports = Rescue;
