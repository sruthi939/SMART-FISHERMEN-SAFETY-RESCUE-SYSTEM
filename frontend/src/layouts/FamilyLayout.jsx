import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Anchor, 
  LayoutDashboard, 
  MapPin, 
  User, 
  Ship, 
  Bell, 
  MessageSquare, 
  History, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function FamilyLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/family', icon: LayoutDashboard, exact: true },
    { label: 'Live Tracking', path: '/family/location', icon: MapPin },
    { label: 'Fisherman', path: '/family/fisherman', icon: User },
    { label: 'Trips', path: '/family/history', icon: Ship },
    { label: 'Alerts', path: '/family/alerts', icon: Bell, badge: '2' },
    { label: 'Messages', path: '/family/messages', icon: MessageSquare },
    { label: 'Location History', path: '/family/location-history', icon: History },
    { label: 'Documents', path: '/family/documents', icon: FileText },
    { label: 'Family Members', path: '/family/members', icon: Users },
    { label: 'Settings', path: '/family/settings', icon: Settings },
    { label: 'Help & Support', path: '/family/help', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans">
      {/* LEFT SIDEBAR (Dark Navy Theme - Matching Mockup) */}
      <aside className="w-64 bg-[#0b1528] text-white flex flex-col justify-between shrink-0 shadow-xl z-20">
        <div>
          {/* Header Brand Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
              <Users size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-sm tracking-tight leading-tight">Family Portal</h1>
              <p className="text-[10px] text-slate-400 font-medium">Stay Connected. Stay Safe.</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-900 font-extrabold">Family Care Portal</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-blue-600 capitalize">
              {location.pathname.replace('/family/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <select className="bg-slate-100 border border-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-lg focus:outline-none">
              <option value="all">All Fishermen</option>
              <option value="manu">Manu (Sea Queen)</option>
              <option value="ramesh">Ramesh (Blue Wave)</option>
            </select>

            <Link to="/family/alerts" className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            <Link to="/family/profile" className="flex items-center gap-2 border-l border-slate-200 pl-4 hover:opacity-80 transition">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 font-bold flex items-center justify-center text-xs">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-bold text-slate-900 block leading-tight">{user?.name || 'Anitha'}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Family Member</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
