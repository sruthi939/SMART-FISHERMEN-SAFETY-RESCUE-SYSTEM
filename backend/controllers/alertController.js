const alertService = require('../service/alertService');

exports.getAlerts = (req, res) => {
  res.json({ alerts: alertService.getAlerts() });
};

exports.createAlert = (req, res) => {
  const alert = alertService.createAlert(req.body);
  res.status(201).json({ message: 'Safety alert published', alert });
};
