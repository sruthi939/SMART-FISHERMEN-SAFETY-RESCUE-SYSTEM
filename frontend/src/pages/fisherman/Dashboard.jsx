import React from 'react';
import { Navigation, Battery, ShieldCheck, AlertTriangle } from 'lucide-react';
import Map from '../../components/Map';
import Button from '../../components/Button';

export default function FishermanDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Fisherman Captain Console</h1>
          <p className="text-xs text-slate-400">Vessel: Sea Harrier IV (Reg: IND-KL-07-8821)</p>
        </div>
        <Button variant="danger">DISTRESS SOS BEACON</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Speed</p>
            <p className="text-xl font-extrabold text-white font-mono">12.4 knots</p>
          </div>
          <Navigation className="text-cyan-400" size={24} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Beacon Battery</p>
            <p className="text-xl font-extrabold text-white font-mono">94%</p>
          </div>
          <Battery className="text-emerald-400" size={24} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Maritime Boundary Line</p>
            <p className="text-xl font-extrabold text-emerald-400 font-mono">4.2 NM Safe</p>
          </div>
          <ShieldCheck className="text-emerald-400" size={24} />
        </div>
      </div>

      <Map title="Current Live Navigation & Boundary Distance" />
    </div>
  );
}
