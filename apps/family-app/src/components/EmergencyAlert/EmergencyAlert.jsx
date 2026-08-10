import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function EmergencyAlert({ emergency }) {
  if (!emergency) return null;
  return (
    <div className="bg-red-600 text-white p-3 rounded-xl font-bold text-xs flex items-center space-x-2 animate-pulse">
      <ShieldAlert className="w-5 h-5 flex-shrink-0" />
      <span>EMERGENCY: {emergency.description}</span>
    </div>
  );
}
