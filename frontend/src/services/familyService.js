import { apiRequest } from './api';

export const familyService = {
  getAll: () => apiRequest('/family/fishermen'),
  getLinkedFishermen: () => apiRequest('/family/fishermen'),
  getFishermanDetails: (id) => apiRequest(`/family/fisherman/${id || 'FSH001'}`),
  linkFisherman: (data) => apiRequest('/family/link-fisherman', { method: 'POST', body: JSON.stringify(data) }),
};
