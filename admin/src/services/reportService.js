import { apiRequest } from './api';

export const reportService = {
  getReports: () => apiRequest('/reports'),
  getRescueReports: () => apiRequest('/reports/rescue'),
  getAccidentReports: () => apiRequest('/reports/accident'),
  generateReport: (data) => apiRequest('/reports/generate', { method: 'POST', body: JSON.stringify(data) }),
};
