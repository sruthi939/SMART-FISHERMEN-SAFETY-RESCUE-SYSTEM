import { apiRequest } from './api';

export const documentService = {
  getDocuments: () => apiRequest('/documents'),
  uploadDocument: (data) => apiRequest('/documents/upload', { method: 'POST', body: JSON.stringify(data) }),
};
