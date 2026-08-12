const rescueTeams = [
  { id: 'team_alpha', name: 'Squadron Alpha', vessel: 'FPV-102', base: 'Fort Kochi', status: 'On Duty' },
  { id: 'team_beta', name: 'Squadron Beta', vessel: 'FPV-105', base: 'Vizhinjam', status: 'Standby' }
];

module.exports = {
  getTeams: () => rescueTeams,
  assignRescue: (emergencyId, teamId) => {
    return { emergencyId, teamId, status: 'DISPATCHED', etaMinutes: 14 };
  }
};
