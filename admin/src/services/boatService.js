import { apiRequest } from './api';

export const boatService = {
  getAll: () => apiRequest('/boats'),
  getById: (id) => apiRequest(`/boats/${id}`),
};
