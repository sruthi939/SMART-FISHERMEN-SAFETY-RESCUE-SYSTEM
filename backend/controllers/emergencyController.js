const emergencies = [
  {
    id: 'SOS-901',
    vessel: 'Sea Harrier IV',
    captain: 'Capt. Ramesh Kumar',
    coords: '9.9124° N, 76.2411° E',
    lat: 9.9124,
    lng: 76.2411,
    status: 'ACTIVE',
    time: new Date().toLocaleTimeString(),
    battery: 92
  }
];

exports.triggerSOS = (req, res) => {
  const { vessel, captain, coords, lat, lng } = req.body;
  const newSOS = {
    id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
    vessel: vessel || 'Sea Harrier IV',
    captain: captain || 'Captain',
    coords: coords || '9.9312° N, 76.2673° E',
    lat: lat || 9.9312,
    lng: lng || 76.2673,
    status: 'ACTIVE',
    time: new Date().toLocaleTimeString(),
    battery: 95
  };
  emergencies.unshift(newSOS);
  res.status(201).json({ message: 'Distress SOS beacon activated!', emergency: newSOS });
};

exports.getActiveEmergencies = (req, res) => {
  res.json({ emergencies });
};

exports.resolveEmergency = (req, res) => {
  const { id } = req.params;
  const item = emergencies.find(e => e.id === id);
  if (item) {
    item.status = 'RESOLVED';
  }
  res.json({ message: 'Emergency resolved successfully', emergency: item });
};
