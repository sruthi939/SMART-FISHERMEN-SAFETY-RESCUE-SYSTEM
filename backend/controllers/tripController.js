const tripsStore = [
  {
    id: 'TRIP-2025-089',
    boatName: 'Sea Queen',
    captainName: 'Manu',
    fishermanId: 'FSH001',
    status: 'On Trip',
    startTime: 'May 14, 2025 - 05:30 AM',
    expectedReturn: 'May 15, 2025 - 05:30 PM',
    sector: 'Palk Bay',
    crewCount: 4,
    createdAt: new Date()
  },
  {
    id: 'TRIP-2025-088',
    boatName: 'Blue Wave',
    captainName: 'Ramesh',
    fishermanId: 'FSH002',
    status: 'Completed',
    startTime: 'May 13, 2025 - 06:00 AM',
    expectedReturn: 'May 13, 2025 - 04:30 PM',
    sector: 'Gulf of Mannar',
    crewCount: 3,
    createdAt: new Date()
  }
];

exports.getTrips = (req, res) => {
  res.json({ success: true, trips: tripsStore });
};

exports.startTrip = (req, res) => {
  const newTrip = {
    id: `TRIP-${Date.now()}`,
    boatName: req.body.boatName || 'Sea Queen',
    captainName: req.body.captainName || 'Manu',
    fishermanId: req.body.fishermanId || 'FSH001',
    status: 'On Trip',
    startTime: new Date().toLocaleString(),
    expectedReturn: 'Tomorrow - 05:30 PM',
    sector: req.body.sector || 'Palk Bay',
    crewCount: req.body.crewCount || 4,
    createdAt: new Date()
  };

  tripsStore.unshift(newTrip);
  res.status(201).json({ success: true, message: 'Voyage initiated successfully', trip: newTrip });
};

exports.endTrip = (req, res) => {
  const trip = tripsStore.find(t => t.id === req.params.id);
  if (trip) {
    trip.status = 'Completed';
  }
  res.json({ success: true, message: 'Voyage ended safely', trip: trip || tripsStore[0] });
};

exports.getActiveTrip = (req, res) => {
  res.json({ success: true, trip: tripsStore[0] });
};
