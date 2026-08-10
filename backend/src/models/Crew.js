const { readData } = require('../config/database');

class Crew {
  static getByBoatId(boatId) {
    return readData().crew.filter(c => c.boatId === boatId);
  }
}

module.exports = Crew;
