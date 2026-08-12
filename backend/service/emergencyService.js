const activeEmergencies = [];

module.exports = {
  createEmergency: (sosData) => {
    const newEmergency = {
      id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
      vessel: sosData.vessel || 'Sea Harrier IV',
      captain: sosData.captain || 'Captain',
      coords: sosData.coords || '9.9312° N, 76.2673° E',
      lat: sosData.lat || 9.9312,
      lng: sosData.lng || 76.2673,
      status: 'ACTIVE',
      time: new Date().toLocaleTimeString()
    };
    activeEmergencies.unshift(newEmergency);
    return newEmergency;
  },

  getActiveEmergencies: () => activeEmergencies,

  resolveEmergency: (id) => {
    const item = activeEmergencies.find(e => e.id === id);
    if (item) item.status = 'RESOLVED';
    return item;
  }
};
