import React from 'react';

export default function TripStatus() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Current Voyage Status</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
        <p>Active Voyage #409 | Started: Today 04:30 AM | Expected Return: Tomorrow 08:00 AM | Status: Safe</p>
      </div>
    </div>
  );
}
