function formatCoordinates(lat, lon) {
  return `${lat > 0 ? lat.toFixed(4) + '° N' : Math.abs(lat).toFixed(4) + '° S'}, ${lon > 0 ? lon.toFixed(4) + '° E' : Math.abs(lon).toFixed(4) + '° W'}`;
}

module.exports = { formatCoordinates };
