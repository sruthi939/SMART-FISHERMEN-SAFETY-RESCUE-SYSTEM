import React from 'react';

export default function RescueStatus({ unitName = 'CG-Kochi-1' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-300">
      Assigned Rescue Asset: <strong className="text-cyan-400">{unitName}</strong>
    </div>
  );
}
