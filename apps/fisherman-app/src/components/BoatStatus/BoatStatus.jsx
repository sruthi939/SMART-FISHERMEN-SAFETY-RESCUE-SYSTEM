import React from 'react';
import { Fuel, Battery, AlertTriangle, Compass } from 'lucide-react';

export default function BoatStatus({ boat }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
      <h3 className="font-bold text-white uppercase text-[11px] text-slate-400">Boat Telemetry Sensors</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950 p-2.5 rounded-lg flex items-center space-x-2">
          <Fuel className="w-4 h-4 text-amber-400" />
          <div><p className="text-slate-400 text-[10px]">Fuel</p><p className="font-bold text-white">{boat?.fuelPct || 80}%</p></div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg flex items-center space-x-2">
          <Battery className="w-4 h-4 text-emerald-400" />
          <div><p className="text-slate-400 text-[10px]">Battery</p><p className="font-bold text-white">{boat?.batteryV || 13.2}V</p></div>
        </div>
      </div>
    </div>
  );
}
