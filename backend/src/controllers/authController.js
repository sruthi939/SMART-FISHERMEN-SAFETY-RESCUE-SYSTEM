const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../config/database');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.login = (req, res) => {
  const { email, role, password } = req.body;
  const db = readData();
  
  let user = null;
  if (email) {
    user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  if (!user && role) {
    const roleMapping = { fisherman: 'fisherman', family: 'family', rescue: 'rescue_team', admin: 'gov_admin' };
    const mappedRole = roleMapping[role] || role;
    user = db.users.find(u => u.role === mappedRole);
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid authentication credentials. User not found in database.' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Authentication successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'rescue_team' ? 'rescue' : (user.role === 'gov_admin' ? 'admin' : user.role),
      avatar: user.avatar
    }
  });
};

exports.getUsers = (req, res) => {
  const db = readData();
  const safeUsers = db.users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role === 'rescue_team' ? 'rescue' : (u.role === 'gov_admin' ? 'admin' : u.role),
    avatar: u.avatar
  }));
  res.json({ users: safeUsers });
};

exports.getProfile = (req, res) => {
  const db = readData();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User profile not found' });
  res.json({ user });
};
