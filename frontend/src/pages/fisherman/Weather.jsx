import React from 'react';
import { CloudSun, Wind, Waves, Droplets, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Weather() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
      <Link to="/fisherman" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-cyan-400">Palk Bay</span>
          <h1 className="text-3xl font-black text-white mt-1">29°C</h1>
          <p className="text-xs text-slate-400">Partly Cloudy</p>
        </div>
        <CloudSun size={54} className="text-amber-400" />
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <Wind size={20} className="text-cyan-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Wind</span>
            <span className="font-extrabold text-white">18 km/h SE</span>
          </div>
        </div>
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <Waves size={20} className="text-blue-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Waves</span>
            <span className="font-extrabold text-white">1.2 m Moderate</span>
          </div>
        </div>
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <Droplets size={20} className="text-emerald-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Rain</span>
            <span className="font-extrabold text-white">0% None</span>
          </div>
        </div>
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <CloudSun size={20} className="text-amber-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Humidity</span>
            <span className="font-extrabold text-white">72%</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">5-Day Coastal Forecast</h3>
        <div className="space-y-2 text-xs">
          {['Tomorrow', 'May 16', 'May 17', 'May 18', 'May 19'].map((day, idx) => (
            <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center justify-between">
              <span className="font-bold text-slate-200">{day}</span>
              <span className="text-slate-400 font-mono">31°C / 26°C</span>
              <span className="text-emerald-400 font-extrabold text-[11px]">Good Conditions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
