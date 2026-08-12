import React from 'react';
import { FileText, Navigation, ShieldAlert, LifeBuoy, Download, Plus } from 'lucide-react';

export default function Licenses() {
  const stats = [
    { label: 'Total Trips', val: '1,248', sub: '+12%', icon: FileText, color: 'text-blue-500' },
    { label: 'Total Distance', val: '65,432 km', sub: '-5%', icon: Navigation, color: 'text-emerald-500' },
    { label: 'SOS Alerts', val: '18', sub: '-10%', icon: ShieldAlert, color: 'text-amber-500' },
    { label: 'Rescues', val: '24', sub: '+25%', icon: LifeBuoy, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Licenses & Fleet Analytics</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg transition">
            <Download size={14} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-600/30 transition">
            <Plus size={15} />
            <span>Add License</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{s.label}</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{s.val}</h3>
                <span className="text-[10px] font-bold text-emerald-500">{s.sub}</span>
              </div>
              <Icon size={24} className={s.color} />
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trips Over Time Line Chart */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Trips Over Time</h3>
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
            {[180, 240, 210, 280, 260, 310].map((v, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-blue-500/20 rounded-t" style={{ height: `${(v / 310) * 100}%` }} />
                <span className="text-[9px] text-slate-400 font-mono">M{idx + 9}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Districts by Boats Donut */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Top Districts by Boats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span>Ramanathapuram</span><span className="font-bold text-blue-500">35%</span></div>
            <div className="flex justify-between"><span>Thoothukudi</span><span className="font-bold text-emerald-500">25%</span></div>
            <div className="flex justify-between"><span>Nagapattinam</span><span className="font-bold text-purple-500">18%</span></div>
            <div className="flex justify-between"><span>Kanyakumari</span><span className="font-bold text-amber-500">12%</span></div>
            <div className="flex justify-between"><span>Others</span><span className="font-bold text-slate-400">10%</span></div>
          </div>
        </div>

        {/* Weather Alerts Bar Chart */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Weather Alerts Breakdown</h3>
          <div className="h-40 flex items-end justify-around pt-4">
            <div className="w-8 bg-red-500 rounded-t" style={{ height: '70%' }} />
            <div className="w-8 bg-amber-500 rounded-t" style={{ height: '90%' }} />
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '40%' }} />
            <div className="w-8 bg-emerald-500 rounded-t" style={{ height: '100%' }} />
          </div>
          <div className="flex justify-around text-[10px] text-slate-400 font-bold">
            <span>High</span><span>Medium</span><span>Low</span><span>Clear</span>
          </div>
        </div>
      </div>
    </div>
  );
}
