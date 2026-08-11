import { apiRequest } from './api';

export const emergencyService = {
  triggerSOS: (data) => apiRequest('/emergency/sos', { method: 'POST', body: JSON.stringify(data) }),
  getActiveEmergencies: () => apiRequest('/emergency/active'),
  resolveEmergency: (id) => apiRequest(`/emergency/${id}/resolve`, { method: 'PUT' }),
};
