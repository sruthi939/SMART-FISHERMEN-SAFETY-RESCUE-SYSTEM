import React from 'react';

export default function SOSPanel({ emergencies = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
      <h3 className="font-bold text-red-500 uppercase">Distress Calls Queue</h3>
      {emergencies.map(e => (
        <div key={e.id} className="p-2 bg-slate-950 rounded border border-red-500/30">
          <p className="font-bold text-white">{e.emergencyType}</p>
          <p className="text-slate-400">{e.description}</p>
        </div>
      ))}
    </div>
  );
}
