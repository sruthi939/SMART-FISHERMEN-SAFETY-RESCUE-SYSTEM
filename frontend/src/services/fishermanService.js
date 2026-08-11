import { apiRequest } from './api';

export const fishermanService = {
  getAll: () => apiRequest('/fishermen'),
  getById: (id) => apiRequest(`/fishermen/${id}`),
  updateProfile: (id, data) => apiRequest(`/fishermen/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
