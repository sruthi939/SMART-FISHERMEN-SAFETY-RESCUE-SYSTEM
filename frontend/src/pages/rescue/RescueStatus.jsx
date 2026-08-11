import React from 'react';

export default function RescueStatus() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Rescue Mission Progress & Status</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
        <p>Interception ETA: 12 minutes | Distance: 3.4 NM | Weather: Clear Sea</p>
      </div>
    </div>
  );
}
