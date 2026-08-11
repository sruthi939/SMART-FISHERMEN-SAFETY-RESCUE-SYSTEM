import { apiRequest } from './api';

export const reportService = {
  getReports: () => apiRequest('/reports'),
  generateReport: (type) => apiRequest('/reports/generate', { method: 'POST', body: JSON.stringify({ type }) }),
};
