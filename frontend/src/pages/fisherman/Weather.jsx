import React from 'react';
import { CloudSun, Wind, Waves, Droplets, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Weather() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
      <Link to="/fisherman" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600">Palk Bay</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">29°C</h1>
          <p className="text-xs text-slate-500 font-semibold">Partly Cloudy</p>
        </div>
        <CloudSun size={54} className="text-amber-500" />
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
          <Wind size={20} className="text-blue-600" />
          <div>
            <span className="text-slate-400 text-[10px] block">Wind</span>
            <span className="font-extrabold text-slate-900">18 km/h SE</span>
          </div>
        </div>
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
          <Waves size={20} className="text-blue-600" />
          <div>
            <span className="text-slate-400 text-[10px] block">Waves</span>
            <span className="font-extrabold text-slate-900">1.2 m Moderate</span>
          </div>
        </div>
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
          <Droplets size={20} className="text-blue-600" />
          <div>
            <span className="text-slate-400 text-[10px] block">Rain</span>
            <span className="font-extrabold text-slate-900">0% None</span>
          </div>
        </div>
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
          <CloudSun size={20} className="text-amber-500" />
          <div>
            <span className="text-slate-400 text-[10px] block">Humidity</span>
            <span className="font-extrabold text-slate-900">72%</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">5-Day Forecast</h3>
        <div className="space-y-2 text-xs">
          {[
            { day: 'Tomorrow', temp: '31°C / 26°C' },
            { day: 'May 16', temp: '32°C / 27°C' },
            { day: 'May 17', temp: '31°C / 26°C' },
            { day: 'May 18', temp: '30°C / 25°C' },
            { day: 'May 19', temp: '30°C / 25°C' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
              <span className="font-bold text-slate-900">{item.day}</span>
              <span className="text-slate-500 font-mono">{item.temp}</span>
              <span className="text-emerald-600 font-extrabold text-[11px]">● Good Conditions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
