import { apiRequest } from './api';

export const emergencyService = {
  getActiveEmergencies: () => apiRequest('/emergency/active'),
  resolveEmergency: (id) => apiRequest(`/emergency/${id}/resolve`, { method: 'PUT' }),
};
