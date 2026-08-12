import { apiRequest } from './api';

export const fishermanService = {
  getAll: () => apiRequest('/fishermen'),
  getById: (id) => apiRequest(`/fishermen/${id}`),
};
