import React from 'react';

export default function TripHistory() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Previous Voyage History</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
        <p>Voyage #408 - Date: Aug 09, 2026 | Duration: 18h | Status: Completed Safe</p>
      </div>
    </div>
  );
}
