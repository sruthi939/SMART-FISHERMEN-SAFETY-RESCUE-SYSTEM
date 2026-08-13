const emergenciesStore = [
  {
    id: 'SOS-901',
    vessel: 'Sea Queen (TN 07 MF 4587)',
    captain: 'Manu',
    fishermanId: 'FSH001',
    coords: '9.2876° N, 79.3129° E',
    lat: 9.2876,
    lng: 79.3129,
    status: 'ACTIVE',
    rescueStatus: 'Pending Rescue Squad Response',
    assignedTeam: null,
    etaMinutes: 18,
    time: new Date().toLocaleTimeString(),
    battery: 92,
    createdAt: new Date()
  }
];

exports.emergenciesStore = emergenciesStore;

exports.triggerSOS = (req, res) => {
  const { vessel, captain, coords, lat, lng, fishermanId } = req.body;
  
  const newSOS = {
    id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
    vessel: vessel || 'Sea Queen (TN 07 MF 4587)',
    captain: captain || 'Manu',
    fishermanId: fishermanId || 'FSH001',
    coords: coords || '9.2876° N, 79.3129° E',
    lat: lat || 9.2876,
    lng: lng || 79.3129,
    status: 'ACTIVE',
    rescueStatus: 'Pending Rescue Squad Response',
    assignedTeam: null,
    etaMinutes: 18,
    time: new Date().toLocaleTimeString(),
    battery: 95,
    createdAt: new Date()
  };

  emergenciesStore.unshift(newSOS);

  // Broadcast Socket.IO event to Family, Rescue, and Admin apps
  const io = req.app.get('io');
  if (io) {
    io.emit('emergency:created', newSOS);
    io.emit('notification:new', {
      title: '🚨 DISTRESS SOS ALERT',
      message: `${newSOS.captain} on ${newSOS.vessel} activated emergency beacon!`,
      emergency: newSOS
    });
  }

  res.status(201).json({ 
    message: 'Distress SOS beacon activated! Rescue teams and family notified.', 
    emergency: newSOS 
  });
};

exports.getActiveEmergencies = (req, res) => {
  res.json({ emergencies: emergenciesStore });
};

exports.getEmergencyById = (req, res) => {
  const item = emergenciesStore.find(e => e.id === req.params.id);
  res.json({ emergency: item || emergenciesStore[0] });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status, rescueStatus, teamName } = req.body;

  const item = emergenciesStore.find(e => e.id === id);
  if (item) {
    if (status) item.status = status;
    if (rescueStatus) item.rescueStatus = rescueStatus;
    if (teamName) item.assignedTeam = teamName;
  }

  const updatedItem = item || emergenciesStore[0];

  // Broadcast Socket.IO status update event to Family & Fisherman
  const io = req.app.get('io');
  if (io) {
    io.emit('rescue:status', updatedItem);
  }

  res.json({ message: 'Emergency status updated', emergency: updatedItem });
};

exports.resolveEmergency = (req, res) => {
  const { id } = req.params;
  const item = emergenciesStore.find(e => e.id === id);
  if (item) {
    item.status = 'RESOLVED';
    item.rescueStatus = 'Rescue Operation Completed Successfully';
  }

  const io = req.app.get('io');
  if (io) {
    io.emit('rescue:status', item || emergenciesStore[0]);
  }

  res.json({ message: 'Emergency resolved successfully', emergency: item || emergenciesStore[0] });
};
