import { apiRequest } from './api';

export const locationService = {
  getLiveLocations: () => apiRequest('/locations/live'),
  updateLocation: (coords) => apiRequest('/locations/update', { method: 'POST', body: JSON.stringify(coords) }),
};

export const tripService = {
  getTrips: () => apiRequest('/trips'),
  startTrip: (data) => apiRequest('/trips/start', { method: 'POST', body: JSON.stringify(data) }),
  endTrip: (id) => apiRequest(`/trips/${id}/end`, { method: 'POST' }),
  getActiveTrip: () => apiRequest('/trips/active'),
};

export const emergencyService = {
  triggerSOS: (data) => apiRequest('/emergency/sos', { method: 'POST', body: JSON.stringify(data) }),
  getActiveEmergencies: () => apiRequest('/emergency/active'),
  resolveEmergency: (id) => apiRequest(`/emergency/${id}/resolve`, { method: 'PUT' }),
};

export const rescueService = {
  getTeams: () => apiRequest('/rescue/teams'),
  assignRescue: (emergencyId, teamId) => apiRequest('/rescue/assign', { method: 'POST', body: JSON.stringify({ emergencyId, teamId }) }),
  getHistory: () => apiRequest('/rescue/history'),
};

export const alertService = {
  getAlerts: () => apiRequest('/alerts'),
  createAlert: (data) => apiRequest('/alerts', { method: 'POST', body: JSON.stringify(data) }),
};

export const reportService = {
  getReports: () => apiRequest('/reports'),
  generateReport: (type) => apiRequest('/reports/generate', { method: 'POST', body: JSON.stringify({ type }) }),
};
