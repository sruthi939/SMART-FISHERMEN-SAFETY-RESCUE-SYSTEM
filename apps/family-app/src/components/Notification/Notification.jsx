import React from 'react';
import { Bell } from 'lucide-react';

export default function Notification({ message = 'Boat departed harbor safely' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs flex items-center space-x-2 text-slate-300">
      <Bell className="w-4 h-4 text-cyan-400" />
      <span>{message}</span>
    </div>
  );
}
