const boats = [
  { id: '1', name: 'Sea Harrier IV', regNumber: 'IND-KL-07-8821', speed: '12.4', battery: '94', status: 'Active', harbor: 'Cochin' },
  { id: '2', name: 'Ocean Star 2', regNumber: 'IND-KL-07-3312', speed: '0.0', battery: '100', status: 'Safe', harbor: 'Munambam' }
];

exports.getAll = (req, res) => {
  res.json({ boats });
};

exports.getById = (req, res) => {
  const boat = boats.find(b => b.id === req.params.id);
  res.json({ boat: boat || boats[0] });
};

exports.registerBoat = (req, res) => {
  const newBoat = { id: `${Date.now()}`, ...req.body, status: 'Active' };
  boats.push(newBoat);
  res.status(201).json({ message: 'Boat registered successfully', boat: newBoat });
};
