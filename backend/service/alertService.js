const alerts = [
  { id: '1', title: 'Storm Warning - Sector 4', message: 'Cyclone alert issued for coastal Cochin waters.', severity: 'warning', createdAt: new Date() }
];

module.exports = {
  getAlerts: () => alerts,
  createAlert: (alertData) => {
    const newAlert = { id: `${Date.now()}`, ...alertData, createdAt: new Date() };
    alerts.unshift(newAlert);
    return newAlert;
  }
};
