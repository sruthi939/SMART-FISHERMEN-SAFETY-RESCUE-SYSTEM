import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { LayoutDashboard, User, Heart, MapPin, Activity, History, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function FamilyLayout() {
  const links = [
    { label: 'Dashboard', path: '/family', exact: true, icon: LayoutDashboard },
    { label: 'Profile', path: '/family/profile', icon: User },
    { label: 'My Fisherman', path: '/family/fisherman', icon: Heart },
    { label: 'Live Location', path: '/family/location', icon: MapPin },
    { label: 'Trip Status', path: '/family/status', icon: Activity },
    { label: 'Trip History', path: '/family/history', icon: History },
    { label: 'Alerts', path: '/family/alerts', icon: AlertTriangle },
    { label: 'Emergency', path: '/family/emergency', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar portalName="Family Care" />
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
