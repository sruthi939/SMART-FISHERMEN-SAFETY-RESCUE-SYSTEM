import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Verifying Portal Authorization..." />;
  }

  // Not logged in -> Redirect to Login
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Pending Admin Approval check
  if (user.isApproved === false && user.role !== 'admin') {
    return <Navigate to="/auth/login" replace />;
  }

  // Role check if specified
  if (allowedRole && user.role && user.role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}
