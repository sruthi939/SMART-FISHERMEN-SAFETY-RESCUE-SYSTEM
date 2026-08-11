import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ links }) {
  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 p-4 flex flex-col gap-1 min-h-[calc(100vh-57px)]">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            {Icon && <Icon size={16} />}
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}
