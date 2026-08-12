import { apiRequest } from './api';

export const fishermanService = {
  getAll: () => apiRequest('/fishermen'),
  getById: (id) => apiRequest(`/fishermen/${id}`),
};

export const familyService = {
  getAll: () => apiRequest('/families'),
  getById: (id) => apiRequest(`/families/${id}`),
};

export const boatService = {
  getAll: () => apiRequest('/boats'),
  getById: (id) => apiRequest(`/boats/${id}`),
};

export const emergencyService = {
  getActiveEmergencies: () => apiRequest('/emergency/active'),
  resolveEmergency: (id) => apiRequest(`/emergency/${id}/resolve`, { method: 'PUT' }),
};

export const rescueService = {
  getTeams: () => apiRequest('/rescue/teams'),
  assignRescue: (emergencyId, teamId) => apiRequest('/rescue/assign', { method: 'POST', body: JSON.stringify({ emergencyId, teamId }) }),
};

export const alertService = {
  getAlerts: () => apiRequest('/alerts'),
  createAlert: (data) => apiRequest('/alerts', { method: 'POST', body: JSON.stringify(data) }),
};

export const reportService = {
  getReports: () => apiRequest('/reports'),
  generateReport: (type) => apiRequest('/reports/generate', { method: 'POST', body: JSON.stringify({ type }) }),
};
