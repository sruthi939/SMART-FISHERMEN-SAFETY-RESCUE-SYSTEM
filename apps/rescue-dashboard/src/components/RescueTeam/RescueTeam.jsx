import React from 'react';

export default function RescueTeam({ units = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
      <h3 className="font-bold text-emerald-400 uppercase">Coast Guard Rescue Units</h3>
      {units.map(u => (
        <div key={u.id} className="p-2 bg-slate-950 rounded flex justify-between text-slate-200">
          <span>{u.unitName}</span>
          <span className="text-emerald-400 font-bold">{u.status}</span>
        </div>
      ))}
    </div>
  );
}
