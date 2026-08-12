import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Portal Selection Gateway
import PortalSelection from '../pages/PortalSelection';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import OTPVerification from '../pages/auth/OTPVerification';

// Layouts
import FishermanLayout from '../layouts/FishermanLayout';
import FamilyLayout from '../layouts/FamilyLayout';
import RescueLayout from '../layouts/RescueLayout';

// Fisherman Pages
import FishermanDashboard from '../pages/fisherman/Dashboard';
import FishermanProfile from '../pages/fisherman/Profile';
import FishermanBoat from '../pages/fisherman/Boat';
import FishermanStartTrip from '../pages/fisherman/StartTrip';
import FishermanActiveTrip from '../pages/fisherman/ActiveTrip';
import FishermanTripHistory from '../pages/fisherman/TripHistory';
import FishermanLiveLocation from '../pages/fisherman/LiveLocation';
import FishermanAlerts from '../pages/fisherman/Alerts';
import FishermanEmergency from '../pages/fisherman/Emergency';
import FishermanSettings from '../pages/fisherman/Settings';
import FishermanCrew from '../pages/fisherman/Crew';
import FishermanDocuments from '../pages/fisherman/Documents';
import FishermanWeather from '../pages/fisherman/Weather';
import FishermanMessages from '../pages/fisherman/Messages';

// Family Pages
import FamilyDashboard from '../pages/family/Dashboard';
import FamilyProfile from '../pages/family/Profile';
import FamilyMyFisherman from '../pages/family/MyFisherman';
import FamilyFishermanDetails from '../pages/family/FishermanDetails';
import FamilyLiveLocation from '../pages/family/LiveLocation';
import FamilyTripStatus from '../pages/family/TripStatus';
import FamilyTripHistory from '../pages/family/TripHistory';
import FamilyAlerts from '../pages/family/Alerts';
import FamilyEmergency from '../pages/family/Emergency';

// Rescue Pages
import RescueDashboard from '../pages/rescue/Dashboard';
import RescueActiveEmergencies from '../pages/rescue/ActiveEmergencies';
import RescueEmergencyDetails from '../pages/rescue/EmergencyDetails';
import RescueLiveMap from '../pages/rescue/LiveMap';
import RescueFishermanLocation from '../pages/rescue/FishermanLocation';
import RescueOperations from '../pages/rescue/RescueOperations';
import RescueAssign from '../pages/rescue/AssignRescue';
import RescueStatus from '../pages/rescue/RescueStatus';
import RescueHistory from '../pages/rescue/RescueHistory';
import RescueProfile from '../pages/rescue/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Portal Gateway */}
      <Route path="/" element={<PortalSelection />} />
      <Route path="/portals" element={<PortalSelection />} />

      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/otp" element={<OTPVerification />} />

      {/* Fisherman Portal Routes */}
      <Route path="/fisherman" element={<FishermanLayout />}>
        <Route index element={<FishermanDashboard />} />
        <Route path="profile" element={<FishermanProfile />} />
        <Route path="boat" element={<FishermanBoat />} />
        <Route path="crew" element={<FishermanCrew />} />
        <Route path="documents" element={<FishermanDocuments />} />
        <Route path="weather" element={<FishermanWeather />} />
        <Route path="messages" element={<FishermanMessages />} />
        <Route path="start-trip" element={<FishermanStartTrip />} />
        <Route path="active-trip" element={<FishermanActiveTrip />} />
        <Route path="history" element={<FishermanTripHistory />} />
        <Route path="location" element={<FishermanLiveLocation />} />
        <Route path="alerts" element={<FishermanAlerts />} />
        <Route path="emergency" element={<FishermanEmergency />} />
        <Route path="settings" element={<FishermanSettings />} />
      </Route>

      {/* Family Portal Routes */}
      <Route path="/family" element={<FamilyLayout />}>
        <Route index element={<FamilyDashboard />} />
        <Route path="profile" element={<FamilyProfile />} />
        <Route path="fisherman" element={<FamilyMyFisherman />} />
        <Route path="fisherman/:id" element={<FamilyFishermanDetails />} />
        <Route path="location" element={<FamilyLiveLocation />} />
        <Route path="status" element={<FamilyTripStatus />} />
        <Route path="history" element={<FamilyTripHistory />} />
        <Route path="alerts" element={<FamilyAlerts />} />
        <Route path="emergency" element={<FamilyEmergency />} />
      </Route>

      {/* Rescue Portal Routes */}
      <Route path="/rescue" element={<RescueLayout />}>
        <Route index element={<RescueDashboard />} />
        <Route path="emergencies" element={<RescueActiveEmergencies />} />
        <Route path="emergencies/:id" element={<RescueEmergencyDetails />} />
        <Route path="map" element={<RescueLiveMap />} />
        <Route path="location" element={<RescueFishermanLocation />} />
        <Route path="operations" element={<RescueOperations />} />
        <Route path="assign" element={<RescueAssign />} />
        <Route path="status" element={<RescueStatus />} />
        <Route path="history" element={<RescueHistory />} />
        <Route path="profile" element={<RescueProfile />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
