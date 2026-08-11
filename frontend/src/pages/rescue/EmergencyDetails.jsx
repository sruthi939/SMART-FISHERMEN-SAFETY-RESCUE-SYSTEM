import React from 'react';

export default function EmergencyDetails() {
  return (
    <div className="bg-red-950/20 border border-red-800 rounded-xl p-6 text-xs text-slate-200">
      <h2 className="text-lg font-bold text-white mb-2">Emergency Details #SOS-901</h2>
      <p>Vessel: Sea Harrier IV | MOB Beacon Active: YES | Water Temp: 28°C | Wind: 22 knots NW</p>
    </div>
  );
}
