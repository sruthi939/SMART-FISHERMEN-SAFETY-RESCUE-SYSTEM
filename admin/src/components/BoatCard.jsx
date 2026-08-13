import React from 'react';
import { Navigation, Battery } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function BoatCard({ boat }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-slate-100">{boat.name || 'Sea Harrier IV'}</h4>
          <p className="text-[11px] text-slate-400 font-mono">Reg: {boat.regNumber || 'IND-KL-07-8821'}</p>
        </div>
        <StatusBadge status={boat.status || 'Active'} />
      </div>

      <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Navigation size={14} className="text-purple-400" />
          <span>{boat.speed || '12.4'} knots</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Battery size={14} className="text-emerald-400" />
          <span>{boat.battery || '94'}%</span>
        </div>
      </div>
    </div>
  );
}
