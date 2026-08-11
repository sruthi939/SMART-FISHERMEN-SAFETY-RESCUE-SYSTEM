import { apiRequest } from './api';

export const alertService = {
  getAlerts: () => apiRequest('/alerts'),
  createAlert: (data) => apiRequest('/alerts', { method: 'POST', body: JSON.stringify(data) }),
};
