const { readData } = require('../config/database');

class Weather {
  static getLatest() {
    return readData().weatherForecasts[0];
  }
}

module.exports = Weather;
