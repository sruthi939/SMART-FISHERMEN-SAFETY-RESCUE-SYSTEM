import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor, LayoutDashboard, Users, Ship, FileText, Shield, LifeBuoy, AlertTriangle, BarChart3, UserCheck, Settings, ListOrdered, Sliders } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();

  const menuItems = [
    { label: 'Dashboard', path: '/admin', exact: true, icon: LayoutDashboard },
    { label: 'Fishermen', path: '/admin/fishermen', icon: Users },
    { label: 'Boats', path: '/admin/boats', icon: Ship },
    { label: 'Licenses', path: '/admin/licenses', icon: FileText },
    { label: 'Insurance', path: '/admin/insurance', icon: Shield },
    { label: 'Rescue Reports', path: '/admin/rescue-reports', icon: LifeBuoy },
    { label: 'Accident Reports', path: '/admin/accident-reports', icon: AlertTriangle },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Users', path: '/admin/users', icon: UserCheck },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
    { label: 'Logs', path: '/admin/logs', icon: ListOrdered },
    { label: 'System Config', path: '/admin/system-config', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-[#0c162c] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800/80 min-h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 text-white shrink-0">
            <Anchor size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-xs tracking-tight uppercase leading-tight">SMART FISHERMEN</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider">SAFETY & RESCUE SYSTEM</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-2.5 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25'
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

      {/* Admin User Footer Profile */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#091122]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] text-slate-400 truncate">Super Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
