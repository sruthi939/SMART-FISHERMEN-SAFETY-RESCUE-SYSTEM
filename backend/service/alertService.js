const alerts = [
  {
    id: 'ALT-101',
    title: 'Low Fuel Warning',
    message: 'Sea Queen (Manu) fuel level is below 20%.',
    desc: 'Sea Queen (Manu) fuel level is below 20%.',
    type: 'warning',
    severity: 'high',
    time: '10:45 AM',
    unread: true,
    createdAt: new Date()
  },
  {
    id: 'ALT-102',
    title: 'Weather Update',
    message: 'Moderate winds in Palk Bay region.',
    desc: 'Moderate winds in Palk Bay region.',
    type: 'info',
    severity: 'medium',
    time: '09:30 AM',
    unread: true,
    createdAt: new Date()
  },
  {
    id: 'ALT-103',
    title: 'Engine Issue Detected',
    message: 'Blue Wave (Ramesh) engine performance low.',
    desc: 'Blue Wave (Ramesh) engine performance low.',
    type: 'warning',
    severity: 'medium',
    time: 'Yesterday',
    unread: false,
    createdAt: new Date()
  },
  {
    id: 'ALT-104',
    title: 'Safe Return',
    message: 'Blue Wave (Ramesh) has returned safely.',
    desc: 'Blue Wave (Ramesh) has returned safely.',
    type: 'success',
    severity: 'low',
    time: 'Yesterday',
    unread: false,
    createdAt: new Date()
  },
  {
    id: 'ALT-105',
    title: 'Location Updated',
    message: 'Sea Queen (Manu) location updated.',
    desc: 'Sea Queen (Manu) location updated.',
    type: 'info',
    severity: 'low',
    time: 'May 14',
    unread: false,
    createdAt: new Date()
  }
];

module.exports = {
  getAlerts: () => alerts,
  createAlert: (alertData) => {
    const newAlert = { id: `ALT-${Date.now()}`, ...alertData, createdAt: new Date() };
    alerts.unshift(newAlert);
    return newAlert;
  }
};
