import { apiRequest } from './api';

export const familyService = {
  getAll: () => apiRequest('/families'),
  getById: (id) => apiRequest(`/families/${id}`),
};
