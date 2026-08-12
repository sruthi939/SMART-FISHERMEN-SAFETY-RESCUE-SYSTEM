import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
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

  return (
    <div className="flex min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Left Dark Navy Sidebar */}
      <aside className="w-64 bg-[#0b1528] border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/25 shrink-0">
              <Anchor size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-xs tracking-tight uppercase leading-tight">FISHERMAN PORTAL</h1>
              <p className="text-[10px] text-slate-400 font-medium">Smart Fishermen Safety & Rescue</p>
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
        <div className="p-3 space-y-3 border-t border-slate-800/80 bg-[#070e1b]">
          {/* Emergency SOS Quick Button */}
          <Link
            to="/fisherman/emergency"
            className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 animate-pulse transition"
          >
            <ShieldAlert size={18} />
            <span>Emergency SOS Press & Hold</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
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
        {/* Top Bar Header */}
        <header className="bg-[#0b1528]/90 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              May 14, 2025, 08:30 AM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All Systems Normal
            </span>

            <button className="relative text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
            </button>

            <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
