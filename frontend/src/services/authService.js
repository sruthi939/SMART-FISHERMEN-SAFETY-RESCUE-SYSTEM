import { apiRequest } from './api';

export const authService = {
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyOTP: async (data) => {
    return apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  getPendingUsers: async () => {
    return apiRequest('/admin/pending-users');
  },

  getAllUsers: async () => {
    return apiRequest('/admin/users');
  },

  approveUser: async (userId) => {
    return apiRequest(`/admin/approve-user/${userId}`, {
      method: 'PUT'
    });
  },

  rejectUser: async (userId) => {
    return apiRequest(`/admin/reject-user/${userId}`, {
      method: 'PUT'
    });
  }
};
