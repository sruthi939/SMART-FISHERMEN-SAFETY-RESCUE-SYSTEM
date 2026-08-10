const { readData } = require('../config/database');

class Fisherman {
  static getAll() {
    const db = readData();
    return db.users.filter(u => u.role === 'fisherman');
  }

  static getById(id) {
    const db = readData();
    return db.users.find(u => u.id === id && u.role === 'fisherman');
  }
}

module.exports = Fisherman;
