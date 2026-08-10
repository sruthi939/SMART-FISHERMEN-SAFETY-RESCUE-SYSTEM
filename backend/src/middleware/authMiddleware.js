const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sfsrs_maritime_super_secret_jwt_key_2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For demo/prototype ease, if no token provided, set default user role or continue with demo context
    req.user = { id: 'u-fish-01', role: 'fisherman', name: 'Ramesh Kumar' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { id: 'u-fish-01', role: 'fisherman', name: 'Ramesh Kumar' };
      return next();
    }
    req.user = user;
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: `Access denied. Requires ${role} role.` });
    }
  };
}

module.exports = { authenticateToken, requireRole, JWT_SECRET };
