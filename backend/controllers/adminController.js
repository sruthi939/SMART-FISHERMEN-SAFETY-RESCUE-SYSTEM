exports.getDashboardStats = (req, res) => {
  res.json({
    activeFishermen: 1420,
    registeredBoats: 385,
    activeEmergencies: 1,
    monitoredSectors: 12,
    systemHealth: '99.8%'
  });
};
