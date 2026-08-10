import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function SOSButton({ onTriggerSOS, isActive }) {
  return (
    <button 
      onClick={onTriggerSOS}
      className={`w-full py-4 rounded-xl font-black uppercase text-sm flex items-center justify-center space-x-2 transition ${
        isActive ? 'bg-red-600 text-white animate-pulse' : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg'
      }`}
    >
      <ShieldAlert className="w-5 h-5" />
      <span>{isActive ? 'MAYDAY BROADCASTING' : 'HOLD FOR SOS EMERGENCY'}</span>
    </button>
  );
}
