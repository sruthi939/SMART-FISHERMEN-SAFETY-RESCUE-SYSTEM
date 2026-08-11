import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { LayoutDashboard, Users, Anchor, Radio, AlertTriangle, ShieldAlert, FileText, Settings } from 'lucide-react';

export default function AdminLayout() {
  const links = [
    { label: 'Dashboard', path: '/admin', exact: true, icon: LayoutDashboard },
    { label: 'Fishermen', path: '/admin/fishermen', icon: Users },
    { label: 'Families', path: '/admin/families', icon: Users },
    { label: 'Boats', path: '/admin/boats', icon: Anchor },
    { label: 'Live Tracking', path: '/admin/tracking', icon: Radio },
    { label: 'Emergencies', path: '/admin/emergencies', icon: ShieldAlert },
    { label: 'Rescue Teams', path: '/admin/rescue-teams', icon: ShieldAlert },
    { label: 'Alerts', path: '/admin/alerts', icon: AlertTriangle },
    { label: 'Reports', path: '/admin/reports', icon: FileText },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar portalName="Admin Command" />
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
