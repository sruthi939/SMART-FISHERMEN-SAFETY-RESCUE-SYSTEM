import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Login
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/auth/Login';

// Admin Pages
import Dashboard from '../pages/Dashboard';
import Fishermen from '../pages/Fishermen';
import FishermanDetails from '../pages/FishermanDetails';
import Families from '../pages/Families';
import Boats from '../pages/Boats';
import BoatDetails from '../pages/BoatDetails';
import LiveTracking from '../pages/LiveTracking';
import Emergencies from '../pages/Emergencies';
import RescueTeams from '../pages/RescueTeams';
import Alerts from '../pages/Alerts';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="fishermen" element={<Fishermen />} />
        <Route path="fishermen/:id" element={<FishermanDetails />} />
        <Route path="families" element={<Families />} />
        <Route path="boats" element={<Boats />} />
        <Route path="boats/:id" element={<BoatDetails />} />
        <Route path="tracking" element={<LiveTracking />} />
        <Route path="emergencies" element={<Emergencies />} />
        <Route path="rescue-teams" element={<RescueTeams />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
