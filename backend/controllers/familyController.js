const families = [
  { id: '1', name: 'Priya Ramesh', relationship: 'Spouse', phone: '+91 9447123456', fishermanName: 'Capt. Ramesh Kumar', fishermanPhone: '+91 9876543210' }
];

exports.getAll = (req, res) => {
  res.json({ families });
};

exports.getById = (req, res) => {
  res.json({ family: families[0] });
};

exports.getMyFisherman = (req, res) => {
  res.json({
    fisherman: {
      name: 'Capt. Ramesh Kumar',
      vessel: 'Sea Harrier IV',
      status: 'Safe',
      battery: 94,
      lat: 9.9312,
      lng: 76.2673
    }
  });
};
