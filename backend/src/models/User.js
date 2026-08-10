const { readData, writeData } = require('../config/database');

class User {
  static findById(id) {
    const db = readData();
    return db.users.find(u => u.id === id);
  }

  static findByEmail(email) {
    const db = readData();
    return db.users.find(u => u.email === email);
  }

  static create(userData) {
    const db = readData();
    const newUser = { id: `u-${Date.now()}`, ...userData, createdAt: new Date().toISOString() };
    db.users.push(newUser);
    writeData(db);
    return newUser;
  }
}

module.exports = User;
