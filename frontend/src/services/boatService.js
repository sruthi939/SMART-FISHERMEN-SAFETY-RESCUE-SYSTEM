import { apiRequest } from './api';

export const boatService = {
  getAll: () => apiRequest('/boats'),
  getById: (id) => apiRequest(`/boats/${id}`),
  registerBoat: (data) => apiRequest('/boats', { method: 'POST', body: JSON.stringify(data) }),
  updateBoat: (id, data) => apiRequest(`/boats/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
