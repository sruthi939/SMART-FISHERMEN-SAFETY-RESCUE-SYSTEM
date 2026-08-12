const locationService = require('../service/locationService');

exports.getLiveLocations = (req, res) => {
  res.json({ locations: locationService.getLiveLocations() });
};

exports.updateLocation = (req, res) => {
  const loc = locationService.updateLocation(req.body);
  res.json({ message: 'GPS Location updated', location: loc });
};
