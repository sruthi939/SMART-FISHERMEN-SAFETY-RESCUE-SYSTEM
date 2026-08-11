import { apiRequest } from './api';

export const rescueService = {
  getTeams: () => apiRequest('/rescue/teams'),
  assignRescue: (emergencyId, teamId) => apiRequest('/rescue/assign', { method: 'POST', body: JSON.stringify({ emergencyId, teamId }) }),
  getHistory: () => apiRequest('/rescue/history'),
};
