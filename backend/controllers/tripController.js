const trips = [
  { id: 'trip_409', boatName: 'Sea Harrier IV', captainName: 'Capt. Ramesh Kumar', durationHours: 24, crewCount: 4, sector: 'Sector 4B', status: 'ACTIVE', startTime: new Date() }
];

exports.getTrips = (req, res) => {
  res.json({ trips });
};

exports.startTrip = (req, res) => {
  const newTrip = { id: `trip_${Date.now()}`, ...req.body, status: 'ACTIVE', startTime: new Date() };
  trips.unshift(newTrip);
  res.status(201).json({ message: 'Voyage initiated successfully', trip: newTrip });
};

exports.endTrip = (req, res) => {
  const trip = trips.find(t => t.id === req.params.id);
  if (trip) trip.status = 'COMPLETED';
  res.json({ message: 'Voyage ended safely', trip: trip || trips[0] });
};

exports.getActiveTrip = (req, res) => {
  res.json({ trip: trips[0] });
};
