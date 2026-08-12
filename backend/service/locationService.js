const liveLocations = [
  { boatId: 'boat_104', vesselName: 'Sea Harrier IV', lat: 9.9312, lng: 76.2673, speed: 12.4, status: 'Safe' }
];

module.exports = {
  getLiveLocations: () => liveLocations,
  updateLocation: (coords) => {
    const loc = { boatId: coords.boatId || 'boat_104', lat: coords.lat, lng: coords.lng, speed: coords.speed || 10, timestamp: new Date() };
    liveLocations[0] = { ...liveLocations[0], ...loc };
    return loc;
  }
};
