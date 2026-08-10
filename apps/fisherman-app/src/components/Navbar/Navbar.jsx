import React from 'react';
import { Anchor, Radio } from 'lucide-react';

export default function Navbar({ boatName = 'Sea Falcon', isOnline = true }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Anchor className="w-5 h-5 text-cyan-400" />
        <span className="font-bold text-sm text-white">{boatName}</span>
      </div>
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Radio className={`w-3.5 h-3.5 ${isOnline ? 'text-emerald-400' : 'text-red-400'}`} />
        <span>{isOnline ? 'LTE / SATELLITE' : 'OFFLINE'}</span>
      </div>
    </nav>
  );
}
