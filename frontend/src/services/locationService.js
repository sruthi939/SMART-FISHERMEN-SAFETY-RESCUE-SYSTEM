import { apiRequest } from './api';

export const locationService = {
  getLiveLocations: () => apiRequest('/locations/live'),
  updateLocation: (coords) => apiRequest('/locations/update', { method: 'POST', body: JSON.stringify(coords) }),
};
