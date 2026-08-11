import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { LayoutDashboard, User, Anchor, Play, Navigation, History, MapPin, AlertTriangle, ShieldAlert, Settings } from 'lucide-react';

export default function FishermanLayout() {
  const links = [
    { label: 'Dashboard', path: '/fisherman', exact: true, icon: LayoutDashboard },
    { label: 'Profile', path: '/fisherman/profile', icon: User },
    { label: 'My Boat', path: '/fisherman/boat', icon: Anchor },
    { label: 'Start Trip', path: '/fisherman/start-trip', icon: Play },
    { label: 'Active Trip', path: '/fisherman/active-trip', icon: Navigation },
    { label: 'Trip History', path: '/fisherman/history', icon: History },
    { label: 'Live Location', path: '/fisherman/location', icon: MapPin },
    { label: 'Alerts', path: '/fisherman/alerts', icon: AlertTriangle },
    { label: 'Emergency SOS', path: '/fisherman/emergency', icon: ShieldAlert },
    { label: 'Settings', path: '/fisherman/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar portalName="Fisherman Captain" />
      <div className="flex flex-1">
        <Sidebar links={links} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
