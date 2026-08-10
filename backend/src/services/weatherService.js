const { readData } = require('../config/database');

function fetchLatestMarineWeather() {
  const db = readData();
  return db.weatherForecasts[0] || {
    windSpeedKnots: 15,
    waveHeightM: 1.5,
    seaCurrentKnots: 0.8,
    advisory: 'Clear skies'
  };
}

module.exports = { fetchLatestMarineWeather };
