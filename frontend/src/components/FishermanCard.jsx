import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';

export default function FishermanCard({ fisherman }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3 hover:border-slate-700 transition">
      <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
        <User size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xs text-slate-100 truncate">{fisherman?.name || 'Fisherman Name'}</h4>
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
          <span className="flex items-center gap-1"><Phone size={12} /> {fisherman?.phone || '+91 9876543210'}</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {fisherman?.harbor || 'Cochin Harbor'}</span>
        </div>
      </div>
    </div>
  );
}
