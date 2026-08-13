import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AdminRoutes from './routes/AdminRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AdminRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
