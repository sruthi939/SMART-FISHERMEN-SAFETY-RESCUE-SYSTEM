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
    <aside className="w-64 bg-white text-slate-700 flex flex-col justify-between shrink-0 border-r border-slate-200 min-h-screen sticky top-0 shadow-xs">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 text-white shrink-0">
            <Anchor size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-xs tracking-tight uppercase leading-tight">SMART FISHERMEN</h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider">SAFETY & RESCUE SYSTEM</p>
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
                    ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
      <div className="p-3.5 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] text-slate-500 truncate">Super Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
