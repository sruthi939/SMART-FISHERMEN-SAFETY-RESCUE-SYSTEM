const locationService = require('../service/locationService');

exports.getLiveLocations = (req, res) => {
  res.json({ locations: locationService.getLiveLocations() });
};

exports.updateLocation = (req, res) => {
  const { latitude, longitude, speed, boatId, fishermanId } = req.body;
  const loc = locationService.updateLocation(req.body);

  const payload = {
    boatId: boatId || 'BOAT001',
    fishermanId: fishermanId || 'FSH001',
    boatName: 'Sea Queen (TN 07 MF 4587)',
    fishermanName: 'Manu',
    lat: latitude || 9.2876,
    lng: longitude || 79.3129,
    speed: speed ? `${speed} km/h` : '12.4 km/h',
    course: '128° SE',
    distanceFromShore: '18.6 km',
    lastUpdate: 'Just now'
  };

  // Broadcast Socket.IO event to Family App & Rescue App
  const io = req.app.get('io');
  if (io) {
    io.emit('location:update', payload);
  }

  res.json({ message: 'GPS Location updated & broadcast to Family and Rescue systems', location: payload });
};
