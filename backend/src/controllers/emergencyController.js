const { readData, writeData } = require('../config/database');
const { dispatchNearestRescueAsset } = require('../services/rescueService');

let ioInstance = null;
exports.setSocketIO = (io) => {
  ioInstance = io;
};

exports.getEmergencies = (req, res) => {
  const db = readData();
  res.json({ emergencies: db.emergencies });
};

exports.triggerBoatSOS = (req, res) => {
  const { boatId, latitude, longitude, emergencyType = 'BOAT_SOS', description } = req.body;
  const db = readData();

  const boat = db.boats.find(b => b.id === boatId || b.registrationNumber === boatId) || db.boats[0];
  boat.status = 'EMERGENCY';
  if (latitude) boat.latitude = latitude;
  if (longitude) boat.longitude = longitude;
  boat.lastUpdated = new Date().toISOString();

  const incidentNumber = `INC-${Date.now().toString().slice(-6)}`;
  const emergency = {
    id: `em-${Date.now()}`,
    incidentNumber,
    boatId: boat.id,
    boatName: boat.name,
    registrationNumber: boat.registrationNumber,
    fishermanId: boat.ownerId,
    emergencyType,
    latitude: latitude || boat.latitude,
    longitude: longitude || boat.longitude,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: description || `One-touch SOS button pressed aboard ${boat.name} (${boat.registrationNumber}). Immediate rescue required!`,
    createdAt: new Date().toISOString(),
    assignedRescueUnit: null
  };

  db.emergencies.unshift(emergency);
  writeData(db);

  // Auto-dispatch rescue asset
  const dispatchResult = dispatchNearestRescueAsset(emergency.id);

  if (ioInstance) {
    ioInstance.emit('emergency:sos', {
      emergency,
      boat,
      dispatchResult
    });
  }

  res.status(201).json({
    message: 'CRITICAL SOS ALERT BROADCASTED TO RESCUE COMMAND & FAMILY APP',
    emergency,
    dispatchResult
  });
};

exports.triggerMOBWearable = (req, res) => {
  const { wearableId, fishermanId, boatId, latitude, longitude } = req.body;
  const db = readData();

  const wearable = db.wearables.find(w => w.id === wearableId || w.macAddress === wearableId) || db.wearables[0];
  wearable.waterImmersion = true;
  wearable.fallDetected = true;
  wearable.status = 'ALARM';
  if (latitude) wearable.latitude = latitude;
  if (longitude) wearable.longitude = longitude;
  wearable.lastSeen = new Date().toISOString();

  const crewMember = db.crew.find(c => c.wearableId === wearable.id || c.fishermanId === fishermanId) || db.crew[0];
  crewMember.status = 'OVERBOARD';

  const boat = db.boats.find(b => b.id === (boatId || crewMember.boatId)) || db.boats[0];

  const incidentNumber = `MOB-${Date.now().toString().slice(-6)}`;
  const emergency = {
    id: `em-mob-${Date.now()}`,
    incidentNumber,
    boatId: boat.id,
    boatName: boat.name,
    registrationNumber: boat.registrationNumber,
    fishermanId: crewMember.fishermanId,
    crewName: crewMember.name,
    wearableId: wearable.id,
    emergencyType: 'MAN_OVERBOARD',
    latitude: latitude || wearable.latitude || boat.latitude,
    longitude: longitude || wearable.longitude || boat.longitude,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: `MAN OVERBOARD ALERT: Water immersion sensor triggered on ${crewMember.name}'s beacon (${wearable.macAddress}). Separated from boat ${boat.name}.`,
    createdAt: new Date().toISOString(),
    assignedRescueUnit: null
  };

  db.emergencies.unshift(emergency);
  writeData(db);

  const dispatchResult = dispatchNearestRescueAsset(emergency.id);

  if (ioInstance) {
    ioInstance.emit('wearable:mob', {
      emergency,
      wearable,
      crewMember,
      boat,
      dispatchResult
    });
  }

  res.status(201).json({
    message: 'MAN OVERBOARD DISTRESS SIGNAL ACTIVATED',
    emergency,
    wearable,
    crewMember,
    dispatchResult
  });
};

exports.resolveEmergency = (req, res) => {
  const { id } = req.params;
  const { resolutionNotes } = req.body;
  const db = readData();

  const emergency = db.emergencies.find(e => e.id === id);
  if (!emergency) return res.status(404).json({ error: 'Emergency record not found' });

  emergency.status = 'RESCUED';
  emergency.resolvedAt = new Date().toISOString();
  emergency.description += ` | RESOLUTION: ${resolutionNotes || 'Rescued successfully by Coast Guard team.'}`;

  // Reset boat status if no other active emergencies
  const boat = db.boats.find(b => b.id === emergency.boatId);
  if (boat) boat.status = 'AT_SEA';

  // Reset crew status
  const crew = db.crew.filter(c => c.boatId === emergency.boatId);
  crew.forEach(c => {
    if (c.status === 'OVERBOARD') c.status = 'RESCUED';
  });

  writeData(db);

  if (ioInstance) {
    ioInstance.emit('rescue:update', { emergency, boat });
  }

  res.json({ message: 'Emergency marked as RESCUED and closed', emergency });
};
