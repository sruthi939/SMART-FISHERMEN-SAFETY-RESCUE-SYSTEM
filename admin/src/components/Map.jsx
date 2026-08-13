import React from 'react';
import { Navigation } from 'lucide-react';

export default function Map({ coordinates = { lat: 9.9312, lng: 76.2673 }, title = 'Live Maritime Fleet Map' }) {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between p-4">
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168,85,247,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between bg-slate-900/80 backdrop-blur px-3.5 py-2 rounded-lg border border-slate-800">
        <span className="text-xs font-bold text-slate-200">{title}</span>
        <span className="text-[11px] font-mono text-purple-400">
          {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
        </span>
      </div>

      <div className="relative z-10 self-center flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center animate-ping absolute" />
        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-400 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Navigation size={18} className="transform rotate-45" />
        </div>
        <span className="bg-slate-900/90 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/30 shadow">
          VESSEL-MONITOR ACTIVE
        </span>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
        <span>Safe Zone Radius: 15 NM</span>
        <span className="text-emerald-400 font-bold">STATUS: MONITORED</span>
      </div>
    </div>
  );
}
