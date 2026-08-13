import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Login
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/auth/Login';

// 12 Mockup Admin Pages
import Dashboard from '../pages/Dashboard';
import Fishermen from '../pages/Fishermen';
import FishermanDetails from '../pages/FishermanDetails';
import Boats from '../pages/Boats';
import BoatDetails from '../pages/BoatDetails';
import Licenses from '../pages/Licenses';
import RescueReports from '../pages/RescueReports';
import AccidentReports from '../pages/AccidentReports';
import Analytics from '../pages/Analytics';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="fishermen" element={<Fishermen />} />
        <Route path="fishermen/:id" element={<FishermanDetails />} />
        <Route path="boats" element={<Boats />} />
        <Route path="boats/:id" element={<BoatDetails />} />
        <Route path="licenses" element={<Licenses />} />
        <Route path="insurance" element={<Licenses />} />
        <Route path="rescue-reports" element={<RescueReports />} />
        <Route path="accident-reports" element={<AccidentReports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logs" element={<RescueReports />} />
        <Route path="system-config" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
