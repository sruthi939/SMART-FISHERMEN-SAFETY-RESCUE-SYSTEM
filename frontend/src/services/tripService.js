import { apiRequest } from './api';

export const tripService = {
  getTrips: () => apiRequest('/trips'),
  startTrip: (data) => apiRequest('/trips/start', { method: 'POST', body: JSON.stringify(data) }),
  endTrip: (id) => apiRequest(`/trips/${id}/end`, { method: 'POST' }),
  getActiveTrip: () => apiRequest('/trips/active'),
};
