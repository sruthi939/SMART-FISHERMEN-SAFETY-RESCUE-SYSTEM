const { emergenciesStore } = require('./emergencyController');

const rescueTeams = [
  { id: 'TEAM-ALPHA', name: 'Alpha Coast Guard Patrol', leader: 'Commander Rajan', location: 'Cochin Base', status: 'READY' },
  { id: 'TEAM-BETA', name: 'Beta Marine Response', leader: 'Captain Varma', location: 'Vizhinjam Base', status: 'ON_MISSION' }
];

exports.getTeams = (req, res) => {
  res.json({ teams: rescueTeams });
};

exports.acceptEmergency = (req, res) => {
  const { emergencyId, officerId, teamName } = req.body;

  const item = emergenciesStore.find(e => e.id === emergencyId) || emergenciesStore[0];
  if (item) {
    item.status = 'IN_PROGRESS';
    item.rescueStatus = 'Rescue Squad Dispatched & Approaching';
    item.assignedTeam = teamName || 'Alpha Rescue Team';
    item.acceptedAt = new Date();
  }

  // Broadcast Socket.IO events to Family App & Fisherman App
  const io = req.app.get('io');
  if (io) {
    io.emit('emergency:accepted', {
      emergencyId: item.id,
      assignedTeam: item.assignedTeam,
      status: 'Rescue Team Dispatched',
      etaMinutes: 18
    });
    io.emit('rescue:assigned', {
      emergencyId: item.id,
      assignedTeam: item.assignedTeam,
      etaMinutes: 18
    });
  }

  res.json({
    message: `Emergency ${item.id} accepted! ${item.assignedTeam} dispatched.`,
    emergency: item
  });
};

exports.updateRescueStatus = (req, res) => {
  const { id } = req.params;
  const { status, rescueStatus } = req.body;

  const item = emergenciesStore.find(e => e.id === id) || emergenciesStore[0];
  if (item) {
    if (status) item.status = status;
    if (rescueStatus) item.rescueStatus = rescueStatus;
  }

  const io = req.app.get('io');
  if (io) {
    io.emit('rescue:status', item);
  }

  res.json({
    message: `Rescue operation status updated to ${item.rescueStatus}`,
    emergency: item
  });
};

exports.assignRescue = (req, res) => {
  const { emergencyId, teamId } = req.body;
  res.json({ message: 'Rescue squad assigned successfully', emergencyId, teamId });
};

exports.getHistory = (req, res) => {
  res.json({
    history: [
      { id: '204', title: 'Operation Sea Guard #204', result: '3 Fishermen rescued in Palk Bay Sector 4B', date: 'Aug 12, 2026' },
      { id: '203', title: 'Operation Ocean Patrol #203', result: 'Engine failure vessel towed safely to Cochin', date: 'Aug 05, 2026' }
    ]
  });
};
