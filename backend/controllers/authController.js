// In-Memory User Database
const users = [];

exports.register = (req, res) => {
  const { name, email, phone, role, password, aadhaar, experience, state, district, relationship, fishermanPhone, address, department, designation, employeeId, station } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    phone,
    role: role || 'fisherman',
    aadhaar,
    experience,
    state,
    district,
    relationship,
    fishermanPhone,
    address,
    department,
    designation,
    employeeId,
    station,
    createdAt: new Date()
  };

  users.push(newUser);

  res.status(201).json({
    message: 'Registration successful',
    user: newUser,
    token: `token_${newUser.id}_${Date.now()}`
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  // Auto-create user if not found for seamless testing
  if (!user) {
    let defaultRole = 'fisherman';
    if (email.includes('admin')) defaultRole = 'admin';
    if (email.includes('rescue')) defaultRole = 'rescue';
    if (email.includes('family')) defaultRole = 'family';

    user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: defaultRole,
      createdAt: new Date()
    };
    users.push(user);
  }

  res.json({
    message: 'Login successful',
    user,
    token: `token_${user.id}_${Date.now()}`
  });
};

exports.getCurrentUser = (req, res) => {
  res.json({ user: users[0] || null });
};
