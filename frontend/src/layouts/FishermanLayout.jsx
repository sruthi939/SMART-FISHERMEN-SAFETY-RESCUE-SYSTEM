import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Anchor, 
  LayoutDashboard, 
  MapPin, 
  CloudSun, 
  Users, 
  Ship, 
  ShieldAlert, 
  Bell, 
  History, 
  FileText, 
  User, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function FishermanLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { label: 'Dashboard', path: '/fisherman', exact: true, icon: LayoutDashboard },
    { label: 'Live Tracking', path: '/fisherman/location', icon: MapPin },
    { label: 'Weather', path: '/fisherman/weather', icon: CloudSun },
    { label: 'Crew Members', path: '/fisherman/crew', icon: Users },
    { label: 'Boat Status', path: '/fisherman/boat', icon: Ship },
    { label: 'Emergency (SOS)', path: '/fisherman/emergency', icon: ShieldAlert },
    { label: 'Alerts', path: '/fisherman/alerts', icon: Bell },
    { label: 'Trip History', path: '/fisherman/history', icon: History },
    { label: 'Documents', path: '/fisherman/documents', icon: FileText },
    { label: 'Profile', path: '/fisherman/profile', icon: User },
    { label: 'Settings', path: '/fisherman/settings', icon: Settings },
  ];

  const getPageTitle = (path) => {
    if (path.includes('/location')) return '2. Live Tracking';
    if (path.includes('/weather')) return '3. Weather';
    if (path.includes('/crew')) return '4. CREW Members';
    if (path.includes('/boat')) return '5. Boat Status';
    if (path.includes('/emergency')) return '6. Emergency (SOS)';
    if (path.includes('/alerts')) return '7. Alerts';
    if (path.includes('/history')) return '8. Trip History';
    if (path.includes('/documents')) return '9. Documents';
    if (path.includes('/profile')) return '.Profile';
    if (path.includes('/settings')) return 'Settings';
    return '1. Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fc] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Left Dark Navy Sidebar */}
      <aside className="w-64 bg-[#0a1628] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 z-30 shadow-md">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/30 shrink-0">
              <Anchor size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-black text-white text-xs tracking-tight uppercase leading-tight">FISHERMAN PORTAL</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider">Smart Fishermen Safety & Rescue System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-2.5 space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3.5 space-y-3 border-t border-slate-800 bg-[#07101e]">
          {/* Red SOS Button */}
          <Link
            to="/fisherman/emergency"
            className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition"
          >
            <ShieldAlert size={18} />
            <span>Emergency Press & Hold</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Arun Kumar'}</p>
                <p className="text-[10px] text-slate-400 truncate">Sea Queen (TN 07 MF 4587)</p>
              </div>
            </div>
            <button onClick={logout} title="Logout" className="text-slate-400 hover:text-red-400 p-1">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">{getPageTitle(location.pathname)}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              May 14, 2025, 08:30 AM
            </span>

            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <span>+ All Systems Normal</span>
            </span>

            <button className="relative text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-[#f4f7fc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
