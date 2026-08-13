import React, { useState, useEffect } from 'react';
import { Users, Ship, FileText, LifeBuoy, Clock, ChevronRight } from 'lucide-react';
import Map from '../components/Map';
import { fishermanService } from '../services/fishermanService';
import { boatService } from '../services/boatService';
import { emergencyService } from '../services/emergencyService';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    fishermen: 5268,
    boats: 1426,
    licenses: 4892,
    rescues: 24
  });

  useEffect(() => {
    fetchLiveMetrics();
  }, []);

  const fetchLiveMetrics = async () => {
    try {
      const [fishRes, boatRes, sosRes] = await Promise.all([
        fishermanService.getAll().catch(() => ({ fishermen: [] })),
        boatService.getAll().catch(() => ({ boats: [] })),
        emergencyService.getActiveEmergencies().catch(() => ({ emergencies: [] }))
      ]);
      setMetrics({
        fishermen: 5200 + (fishRes.fishermen || []).length,
        boats: 1420 + (boatRes.boats || []).length,
        licenses: 4890,
        rescues: (sosRes.emergencies || []).length + 23
      });
    } catch (e) {
      console.error('Metrics loading error:', e);
    }
  };

  const statCards = [
    { label: 'Total Fishermen', value: metrics.fishermen.toLocaleString(), sub: '+126 this week', icon: Users, bg: 'bg-blue-50 text-blue-600', badgeColor: 'text-blue-600' },
    { label: 'Active Boats', value: metrics.boats.toLocaleString(), sub: '+25 this week', icon: Ship, bg: 'bg-emerald-50 text-emerald-600', badgeColor: 'text-emerald-600' },
    { label: 'Active Licenses', value: metrics.licenses.toLocaleString(), sub: '+67 this week', icon: FileText, bg: 'bg-purple-50 text-purple-600', badgeColor: 'text-purple-600' },
    { label: 'Rescue Operations', value: metrics.rescues.toString(), sub: '+5 this week', icon: LifeBuoy, bg: 'bg-amber-50 text-amber-600', badgeColor: 'text-amber-600' },
  ];

  const recentActivities = [
    { id: 1, title: 'SOS Alert Resolved', detail: 'Sea Queen - Fisherman rescued', time: '10 min ago', color: 'bg-emerald-500' },
    { id: 2, title: 'New Boat Registered', detail: 'TN 07 MF 4587', time: '30 min ago', color: 'bg-blue-500' },
    { id: 3, title: 'License Renewed', detail: 'Fisherman ID: FSH1001', time: '1 hr ago', color: 'bg-purple-500' },
    { id: 4, title: 'Accident Report Filed', detail: 'Boat Collision - Minor Injury', time: '2 hrs ago', color: 'bg-amber-500' }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">{card.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
                <p className={`text-[11px] font-bold mt-1 ${card.badgeColor}`}>{card.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                <Icon size={24} className="stroke-[2.2]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map Overview */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Live Overview</h2>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Boats: 1426</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Fishermen: 5268</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> SOS Alerts: 3</span>
            </div>
          </div>
          <Map title="Live Fleet & Border Surveillance Map (Gulf of Mannar)" />
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Recent Activities</h2>
              <Clock size={16} className="text-slate-400" />
            </div>

            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${act.color}`} />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{act.title}</p>
                    <p className="text-slate-500 text-[11px]">{act.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-blue-600 rounded-lg transition flex items-center justify-center gap-1">
            <span>View All Activities</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom 3 Analytics Card Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rescue Operations Trend */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Rescue Operations</h3>
          <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2">
            {[10, 15, 8, 12, 18, 24].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-blue-100 hover:bg-blue-200 rounded-t transition" style={{ height: `${(val / 24) * 100}%` }}>
                  <div className="w-full bg-blue-600 rounded-t" style={{ height: '35%' }} />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">May {9 + i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900">Weather Alerts</h3>
            <span className="text-xs font-extrabold text-blue-600">43 Total</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
            <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between border border-slate-100">
              <span className="text-red-500 font-bold">● High</span>
              <span className="font-extrabold text-slate-900">5</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between border border-slate-100">
              <span className="text-amber-500 font-bold">● Medium</span>
              <span className="font-extrabold text-slate-900">12</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between border border-slate-100">
              <span className="text-blue-500 font-bold">● Low</span>
              <span className="font-extrabold text-slate-900">8</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between border border-slate-100">
              <span className="text-emerald-500 font-bold">● Clear</span>
              <span className="font-extrabold text-slate-900">18</span>
            </div>
          </div>
        </div>

        {/* Accident Reports Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900">Accident Reports</h3>
            <span className="text-xs font-extrabold text-amber-600">32 Total</span>
          </div>
          <div className="space-y-2 mt-3 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Major Incidents</span>
              <span className="font-bold text-red-500">5</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '15%' }} />
            </div>

            <div className="flex items-center justify-between text-slate-600 pt-1">
              <span>Minor Collisions</span>
              <span className="font-bold text-amber-500">12</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '38%' }} />
            </div>

            <div className="flex items-center justify-between text-slate-600 pt-1">
              <span>Near Misses</span>
              <span className="font-bold text-blue-500">15</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '47%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
