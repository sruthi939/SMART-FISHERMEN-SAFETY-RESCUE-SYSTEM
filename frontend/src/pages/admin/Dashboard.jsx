import React from 'react';
import { Users, Anchor, ShieldAlert, Radio } from 'lucide-react';
import Map from '../../components/Map';
import AlertCard from '../../components/AlertCard';

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Fishermen', val: '1,420', icon: Users, color: 'text-cyan-400' },
    { label: 'Registered Boats', val: '385', icon: Anchor, color: 'text-teal-400' },
    { label: 'Active Emergencies', val: '2', icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Monitored Sectors', val: '12', icon: Radio, color: 'text-emerald-400' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-white">Government Admin Command Dashboard</h1>
        <span className="text-xs font-mono bg-cyan-950/60 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">
          SYSTEM HEALTH: 99.8%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">{s.label}</p>
                <p className="text-2xl font-extrabold text-white mt-1">{s.val}</p>
              </div>
              <Icon size={24} className={s.color} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Map title="Fleet Radar Overview" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live System Advisories</h3>
          <AlertCard title="Storm Warning - Sector 4" message="Cyclone alert issued for coastal Cochin waters. Recall non-essential vessels." time="10m ago" severity="warning" />
          <AlertCard title="Active Rescue Patrol" message="Coast Guard Team Alpha dispatched for Vessel #882." time="25m ago" severity="danger" />
        </div>
      </div>
    </div>
  );
}
