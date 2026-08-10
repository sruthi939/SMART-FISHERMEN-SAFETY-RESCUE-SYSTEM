import React from 'react';
import { Users, LifeBuoy } from 'lucide-react';

export default function CrewList({ crew = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
      <h3 className="font-bold text-white uppercase text-[11px] text-slate-400 flex items-center space-x-1">
        <Users className="w-3.5 h-3.5 text-cyan-400" />
        <span>Onboard Crew</span>
      </h3>
      <div className="space-y-2">
        {crew.map(c => (
          <div key={c.id} className="p-2.5 bg-slate-950 rounded-lg flex justify-between items-center text-slate-200">
            <span>{c.name}</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
