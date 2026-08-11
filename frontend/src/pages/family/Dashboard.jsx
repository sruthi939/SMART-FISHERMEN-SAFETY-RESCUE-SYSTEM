import React from 'react';
import { Heart, Battery, ShieldCheck } from 'lucide-react';
import Map from '../../components/Map';
import Button from '../../components/Button';

export default function FamilyDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Family Safety Monitoring Portal</h1>
          <p className="text-xs text-slate-400">Tracking: Capt. Ramesh Kumar (Sea Harrier IV)</p>
        </div>
        <Button variant="outline">Call Fisherman</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Fisherman Status</p>
            <p className="text-xl font-extrabold text-emerald-400 font-mono">SAFE ON VOYAGE</p>
          </div>
          <ShieldCheck className="text-emerald-400" size={24} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Transponder Battery</p>
            <p className="text-xl font-extrabold text-white font-mono">94%</p>
          </div>
          <Battery className="text-emerald-400" size={24} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Distance to Shore</p>
            <p className="text-xl font-extrabold text-cyan-400 font-mono">11.8 NM</p>
          </div>
          <Heart className="text-rose-400" size={24} />
        </div>
      </div>

      <Map title="Live Real-Time Vessel Tracker for Family" />
    </div>
  );
}
