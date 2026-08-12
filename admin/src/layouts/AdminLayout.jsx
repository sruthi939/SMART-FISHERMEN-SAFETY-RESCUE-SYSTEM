import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function AdminLayout() {
  const location = useLocation();

  const getTitleFromPath = (pathname) => {
    if (pathname.includes('/fishermen/')) return 'Fisherman Details';
    if (pathname.includes('/fishermen')) return 'Fishermen';
    if (pathname.includes('/boats/')) return 'Boat Details';
    if (pathname.includes('/boats')) return 'Boats';
    if (pathname.includes('/licenses')) return 'Licenses';
    if (pathname.includes('/insurance')) return 'Insurance';
    if (pathname.includes('/rescue-reports')) return 'Rescue Reports';
    if (pathname.includes('/accident-reports')) return 'Accident Reports';
    if (pathname.includes('/analytics')) return 'Analytics';
    if (pathname.includes('/users')) return 'Users';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/logs')) return 'Logs';
    if (pathname.includes('/system-config')) return 'System Config';
    if (pathname.includes('/profile')) return 'Profile';
    return 'Dashboard';
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} />
        <main className="flex-1 p-6 overflow-y-auto bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
