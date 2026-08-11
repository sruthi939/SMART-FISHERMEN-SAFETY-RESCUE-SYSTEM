import React from 'react';
import { LifeBuoy, ShieldAlert, Navigation } from 'lucide-react';
import Map from '../../components/Map';
import EmergencyCard from '../../components/EmergencyCard';

export default function RescueDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Coast Guard Rescue Dispatch Command</h1>
          <p className="text-xs text-slate-400">Sector 4 Command Center - Cochin Base</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-red-300">Active SOS Distress Calls</p>
            <p className="text-2xl font-extrabold text-red-400 font-mono">1 ACTIVE</p>
          </div>
          <ShieldAlert className="text-red-400" size={26} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Rescue Squadrons On-Duty</p>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">4 FPV UNITS</p>
          </div>
          <LifeBuoy className="text-emerald-400" size={26} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Avg Response ETA</p>
            <p className="text-2xl font-extrabold text-cyan-400 font-mono">14 MINS</p>
          </div>
          <Navigation className="text-cyan-400" size={26} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Map title="Active SOS Target Positioning & Dispatch Vector" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Priority Distress Feed</h3>
          <EmergencyCard emergency={{ id: 'SOS-901', vessel: 'Sea Harrier IV', captain: 'Capt. Ramesh', coords: '9.9124° N, 76.2411° E', time: '5m ago' }} onAssign={() => {}} />
        </div>
      </div>
    </div>
  );
}
