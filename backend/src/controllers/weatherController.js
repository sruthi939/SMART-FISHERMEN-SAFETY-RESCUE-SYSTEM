const { readData, writeData } = require('../config/database');
const { calculateRiskIndex } = require('../services/aiService');

exports.getWeatherForecast = (req, res) => {
  const db = readData();
  const weather = db.weatherForecasts[0] || {
    region: 'Arabian Sea South West',
    windSpeedKnots: 18.0,
    waveHeightM: 2.1,
    seaCurrentKnots: 1.2,
    pressureHpa: 1008,
    advisory: 'Fair weather with localized wind gusts.'
  };

  const riskAnalysis = calculateRiskIndex({
    windSpeedKnots: weather.windSpeedKnots,
    waveHeightM: weather.waveHeightM,
    seaCurrentKnots: weather.seaCurrentKnots
  });

  res.json({
    weather,
    riskAnalysis
  });
};

exports.updateWeatherAdvisory = (req, res) => {
  const { region, windSpeedKnots, waveHeightM, seaCurrentKnots, pressureHpa, advisory } = req.body;
  const db = readData();

  const risk = calculateRiskIndex({ windSpeedKnots, waveHeightM, seaCurrentKnots });

  const updatedWeather = {
    id: `wf-${Date.now()}`,
    region: region || 'Arabian Sea South West',
    windSpeedKnots: parseFloat(windSpeedKnots) || 20,
    waveHeightM: parseFloat(waveHeightM) || 2.5,
    seaCurrentKnots: parseFloat(seaCurrentKnots) || 1.5,
    pressureHpa: parseFloat(pressureHpa) || 1005,
    riskLevel: risk.riskLevel,
    advisory: advisory || risk.advisory,
    forecastTime: new Date().toISOString()
  };

  db.weatherForecasts[0] = updatedWeather;
  writeData(db);

  res.json({ message: 'Weather forecast and AI risk assessment updated', weather: updatedWeather, riskAnalysis: risk });
};
