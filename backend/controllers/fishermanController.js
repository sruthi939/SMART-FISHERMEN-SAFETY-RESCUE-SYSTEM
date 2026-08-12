const fishermen = [
  { id: '1', name: 'Capt. Ramesh Kumar', phone: '+91 9876543210', harbor: 'Cochin Harbor', licenseNumber: 'KL-FISH-9012', status: 'Safe' },
  { id: '2', name: 'Capt. Suresh Nair', phone: '+91 9876543211', harbor: 'Munambam Port', licenseNumber: 'KL-FISH-8841', status: 'Active' },
  { id: '3', name: 'Capt. Antony Joseph', phone: '+91 9876543212', harbor: 'Kollam Coast', licenseNumber: 'KL-FISH-7730', status: 'Safe' }
];

exports.getAll = (req, res) => {
  res.json({ fishermen });
};

exports.getById = (req, res) => {
  const f = fishermen.find(item => item.id === req.params.id);
  res.json({ fisherman: f || fishermen[0] });
};

exports.updateProfile = (req, res) => {
  const f = fishermen.find(item => item.id === req.params.id);
  if (f) {
    Object.assign(f, req.body);
  }
  res.json({ message: 'Profile updated', fisherman: f || fishermen[0] });
};
