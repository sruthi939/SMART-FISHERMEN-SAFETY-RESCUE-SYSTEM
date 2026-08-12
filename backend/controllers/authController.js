// Shared User Storage Array
const users = [
  {
    id: 'usr_admin_default',
    name: 'Govt Admin Officer',
    email: 'admin@sfsrs.gov',
    phone: '+91 9000000000',
    role: 'admin',
    password: 'password123',
    department: 'Kerala Fisheries Department',
    designation: 'System Administrator',
    employeeId: 'EMP-ADM-001',
    isApproved: true,
    status: 'Approved',
    createdAt: new Date()
  }
];

exports.usersStore = users;

exports.register = (req, res) => {
  const { 
    name, email, phone, role, password, aadhaar, experience, 
    state, district, relationship, fishermanPhone, address, 
    department, designation, employeeId, station 
  } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User with this email address already exists.' });
  }

  const userRole = (role || 'fisherman').toLowerCase();
  // Admin registrations are pre-approved; other roles require Admin verification
  const isApproved = userRole === 'admin';

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone,
    role: userRole,
    password,
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
    isApproved,
    status: isApproved ? 'Approved' : 'Pending Admin Approval',
    createdAt: new Date()
  };

  users.push(newUser);

  if (!isApproved) {
    return res.status(201).json({
      message: 'Registration submitted successfully! Your account is pending Government Admin verification & approval.',
      user: newUser,
      isApproved: false
    });
  }

  res.status(201).json({
    message: 'Registration successful!',
    user: newUser,
    isApproved: true,
    token: `token_${newUser.id}_${Date.now()}`
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. User not found. Please register first.' });
  }

  // Check Admin Approval Status
  if (!user.isApproved && user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access Denied: Your account is pending Government Admin verification & approval. Please contact the Admin authority to grant portal access.',
      isApproved: false,
      status: user.status || 'Pending Admin Approval'
    });
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

exports.getPendingUsers = (req, res) => {
  const pending = users.filter(u => !u.isApproved);
  res.json({ pendingUsers: pending });
};

exports.getAllUsers = (req, res) => {
  res.json({ users });
};

exports.approveUser = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User request not found.' });
  }

  user.isApproved = true;
  user.status = 'Approved';
  user.approvedAt = new Date();

  res.json({
    message: `User ${user.name} (${user.role.toUpperCase()}) has been approved successfully!`,
    user
  });
};

exports.rejectUser = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User request not found.' });
  }

  user.isApproved = false;
  user.status = 'Rejected';

  res.json({
    message: `User ${user.name} registration request was rejected.`,
    user
  });
};
