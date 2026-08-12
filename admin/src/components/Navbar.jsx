import React from 'react';
import { Calendar, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ title = 'Dashboard' }) {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Filter Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
          <Calendar size={14} className="text-blue-500" />
          <span>May 14, 2025 - May 20, 2025</span>
        </div>

        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
