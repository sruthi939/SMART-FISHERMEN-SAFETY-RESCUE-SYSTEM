import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { LayoutDashboard, ShieldAlert, Radio, MapPin, LifeBuoy, Send, Activity, History, User } from 'lucide-react';

export default function RescueLayout() {
  const links = [
    { label: 'Dashboard', path: '/rescue', exact: true, icon: LayoutDashboard },
    { label: 'Active Emergencies', path: '/rescue/emergencies', icon: ShieldAlert },
    { label: 'Live Map', path: '/rescue/map', icon: Radio },
    { label: 'Fisherman Target', path: '/rescue/location', icon: MapPin },
    { label: 'Rescue Operations', path: '/rescue/operations', icon: LifeBuoy },
    { label: 'Assign Rescue', path: '/rescue/assign', icon: Send },
    { label: 'Rescue Status', path: '/rescue/status', icon: Activity },
    { label: 'Rescue History', path: '/rescue/history', icon: History },
    { label: 'Profile', path: '/rescue/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar portalName="Coast Guard Rescue" />
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
