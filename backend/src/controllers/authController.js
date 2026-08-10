const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../config/database');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.login = (req, res) => {
  const { email, role } = req.body;
  const db = readData();
  
  let user = db.users.find(u => u.email === email);
  if (!user && role) {
    user = db.users.find(u => u.role === role);
  }
  if (!user) {
    user = db.users[0]; // Fallback to Ramesh Kumar
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  });
};

exports.getProfile = (req, res) => {
  const db = readData();
  const user = db.users.find(u => u.id === req.user.id) || db.users[0];
  res.json({ user });
};
