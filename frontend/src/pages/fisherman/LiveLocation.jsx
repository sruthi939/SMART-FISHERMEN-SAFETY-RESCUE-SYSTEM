import React from 'react';
import Map from '../../components/Map';
import { Navigation, RefreshCw, Share2 } from 'lucide-react';

export default function LiveLocation() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Live Satellite Tracking Radar</h2>
        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
          <RefreshCw size={16} />
        </button>
      </div>

      <Map title="Palk Bay Sea Trajectory" />

      {/* Bottom Overlay Info Card matching Mockup Screen 2 */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">Sea Queen</h3>
            <p className="text-xs font-mono text-slate-400">TN 07 MF 4587</p>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full border border-emerald-500/30 uppercase">
            + On Trip
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div><span className="text-slate-400 block text-[10px]">Speed</span><strong className="text-slate-900">12.4 km/h</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Distance from Shore</span><strong className="text-slate-900">18.6 km</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Course</span><strong className="text-slate-900">128° SE</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Last Update</span><span className="font-extrabold text-emerald-600">1 min ago</span></div>
        </div>

        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center justify-center gap-2">
          <Share2 size={16} />
          <span>Share Location</span>
        </button>
      </div>
    </div>
  );
}
