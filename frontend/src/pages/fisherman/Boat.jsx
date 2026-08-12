import React from 'react';
import { Ship, Radio, Compass, Wifi, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Boat() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Sea Queen <span className="text-sm font-mono text-slate-400">(TN 07 MF 4587)</span></h1>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
          <span>+ All Systems Normal</span>
        </span>
      </div>

      {/* 3 Circular Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Engine Gauge */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Engine</h3>
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center my-3 bg-white shadow-xs">
            <span className="text-xs font-black text-slate-900">Normal</span>
          </div>
          <div className="w-full flex justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-2">
            <span>Temperature: <strong className="text-slate-900">78°C</strong></span>
            <span>Hours Run: <strong className="text-slate-900">120 h</strong></span>
          </div>
        </div>

        {/* Fuel Gauge */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Fuel</h3>
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center my-3 bg-white shadow-xs">
            <span className="text-xl font-black text-slate-900">68%</span>
          </div>
          <div className="w-full text-center text-[11px] text-slate-500 border-t border-slate-200 pt-2">
            <span>Fuel Level: <strong className="text-slate-900">340 L / 500 L</strong></span>
          </div>
        </div>

        {/* Battery Gauge */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Battery</h3>
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center my-3 bg-white shadow-xs">
            <span className="text-xl font-black text-slate-900">92%</span>
          </div>
          <div className="w-full text-center text-[11px] text-slate-500 border-t border-slate-200 pt-2">
            <span>Voltage: <strong className="text-slate-900">12.6 V</strong></span>
          </div>
        </div>
      </div>

      {/* Other Systems Status Badges */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Other Systems</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { name: 'GPS Connected' },
            { name: 'AIS Active' },
            { name: 'VHF Radio Online' },
            { name: 'Bilge Pump Normal' },
            { name: 'Navigation Lights ON' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center font-bold text-slate-800 flex flex-col items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span className="text-[11px]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="text-xs text-blue-600 font-bold hover:underline block text-center w-full pt-2">
        View Maintenance History
      </button>
    </div>
  );
}
