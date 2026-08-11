const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../config/database');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.register = (req, res) => {
  const { 
    name, email, phone, password, role, 
    aadhaarNumber, experienceYears, state, district, 
    relationship, fishermanPhone, address, 
    department, designation, employeeId, stationUnit 
  } = req.body;
  
  const db = readData();

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and valid email address are required.' });
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email address already exists.' });
  }

  const roleMapping = { fisherman: 'fisherman', family: 'family', rescue: 'rescue_team', admin: 'gov_admin' };
  const mappedRole = roleMapping[role] || 'fisherman';

  const newUser = {
    id: `u-${Date.now().toString().slice(-4)}`,
    name,
    email,
    phone: phone || '+91 9000000000',
    password: password || 'password123',
    role: mappedRole,
    status: 'PENDING_ADMIN_APPROVAL',
    requestedAt: new Date().toISOString(),
    // Extended Metadata
    aadhaarNumber: aadhaarNumber || null,
    experienceYears: experienceYears || null,
    state: state || null,
    district: district || null,
    relationship: relationship || null,
    fishermanPhone: fishermanPhone || null,
    address: address || null,
    department: department || null,
    designation: designation || null,
    employeeId: employeeId || null,
    stationUnit: stationUnit || null
  };

  db.users.push(newUser);
  writeData(db);

  res.status(201).json({
    message: 'Portal registration application submitted successfully! PENDING GOVERNMENT ADMIN APPROVAL.',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    }
  });
};

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
    user = db.users.find(u => u.role === mappedRole && (u.status === 'APPROVED' || !u.status));
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid authentication credentials. User not found in database.' });
  }

  // Check Admin Approval Status Gatekeeper
  if (user.status === 'PENDING_ADMIN_APPROVAL') {
    return res.status(403).json({
      error: 'ACCESS DENIED: Your registration is PENDING GOVERNMENT ADMIN APPROVAL. Please wait for Fisheries Officer verification.'
    });
  }

  if (user.status === 'REJECTED') {
    return res.status(403).json({
      error: 'ACCESS DENIED: Your portal registration application was REJECTED by Government Admin.'
    });
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
      avatar: user.avatar,
      status: user.status || 'APPROVED'
    }
  });
};

exports.getUsers = (req, res) => {
  const db = readData();
  const safeUsers = db.users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role === 'rescue_team' ? 'rescue' : (user.role === 'gov_admin' ? 'admin' : u.role),
    status: u.status || 'APPROVED',
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
