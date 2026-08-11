const crypto = require('crypto');
const { readData, writeData } = require('../config/database');

exports.getAdminDashboard = (req, res) => {
  const db = readData();
  const totalBoats = db.boats.length;
  const activeAtSea = db.boats.filter(b => b.status === 'AT_SEA').length;
  const activeEmergencies = db.emergencies.filter(e => e.status !== 'CLOSED' && e.status !== 'RESCUED').length;
  const totalFishermen = db.crew.length + db.users.filter(u => u.role === 'fisherman').length;
  const totalSubsidiesDisbursed = db.governmentRecords.reduce((acc, r) => acc + (r.subsidyAmountINR || 0), 0);

  res.json({
    summary: {
      totalBoats,
      activeAtSea,
      activeEmergencies,
      totalFishermen,
      totalSubsidiesDisbursedINR: totalSubsidiesDisbursed
    },
    boats: db.boats,
    crew: db.crew,
    emergencies: db.emergencies,
    governmentRecords: db.governmentRecords
  });
};

exports.registerBoat = (req, res) => {
  const { registrationNumber, name, boatType, lengthMeters, homePort, ownerName, licenseNumber } = req.body;
  const db = readData();

  const newBoat = {
    id: `b-${Date.now().toString().slice(-4)}`,
    registrationNumber: registrationNumber || `KL-07-FISH-${Math.floor(Math.random() * 900 + 100)}`,
    name: name || 'Fishery Star',
    ownerId: 'u-fish-01',
    boatType: boatType || 'Mechanized Boat',
    lengthMeters: parseFloat(lengthMeters) || 14.0,
    homePort: homePort || 'Kochi Harbor',
    licenseNumber: licenseNumber || `LIC-KER-2026-${Math.floor(Math.random() * 900 + 100)}`,
    licenseStatus: 'ACTIVE',
    insurancePolicy: `UIIC-MAR-${Math.floor(Math.random() * 90000 + 10000)}`,
    insuranceExpiry: '2027-12-31',
    status: 'IN_PORT',
    latitude: 9.9312,
    longitude: 76.2673,
    speedKnots: 0.0,
    headingDeg: 0,
    fuelPct: 100,
    batteryV: 13.5,
    waterLeak: false,
    tiltAngle: 0.0,
    lastUpdated: new Date().toISOString()
  };

  const hashData = `${newBoat.id}-${newBoat.registrationNumber}-${Date.now()}`;
  const txHash = '0x' + crypto.createHash('sha256').update(hashData).digest('hex');

  newBoat.blockchainTxHash = txHash;
  db.boats.push(newBoat);

  db.governmentRecords.push({
    id: `gov-${newBoat.id}`,
    boatId: newBoat.id,
    subsidyStatus: 'APPROVED',
    subsidyAmountINR: 50000,
    safetyInspectionDate: new Date().toISOString().split('T')[0],
    complianceScore: 100,
    blockchainTxHash: txHash
  });

  writeData(db);
  res.status(201).json({ message: 'Boat registered successfully in Government Registry', boat: newBoat });
};
