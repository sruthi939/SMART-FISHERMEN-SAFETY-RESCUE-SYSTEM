import { apiRequest } from './api';

export const rescueService = {
  getTeams: () => apiRequest('/rescue/teams'),
  assignRescue: (emergencyId, teamId) => apiRequest('/rescue/assign', { method: 'POST', body: JSON.stringify({ emergencyId, teamId }) }),
  acceptEmergency: (emergencyId, teamName) => apiRequest('/rescue/accept', { method: 'POST', body: JSON.stringify({ emergencyId, teamName }) }),
  updateStatus: (id, status, rescueStatus) => apiRequest(`/rescue/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, rescueStatus }) }),
  getHistory: () => apiRequest('/rescue/history'),
};
