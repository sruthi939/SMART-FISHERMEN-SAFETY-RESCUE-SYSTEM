import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Anchor, ShieldAlert, Radio, UserCheck, ArrowRight } from 'lucide-react';
import Map from '../components/Map';
import AlertCard from '../components/AlertCard';
import { authService } from '../services/authService';
import { emergencyService } from '../services/emergencyService';

export default function Dashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [activeSOSCount, setActiveSOSCount] = useState(0);

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    try {
      const [pendRes, sosRes] = await Promise.all([
        authService.getPendingUsers().catch(() => ({ pendingUsers: [] })),
        emergencyService.getActiveEmergencies().catch(() => ({ emergencies: [] }))
      ]);
      setPendingCount((pendRes.pendingUsers || []).length);
      setActiveSOSCount((sosRes.emergencies || []).length);
    } catch (err) {
      console.error('Error loading dashboard metrics:', err);
    }
  };

  const stats = [
    { label: 'Pending Approvals', val: pendingCount.toString(), icon: UserCheck, color: 'text-amber-400' },
    { label: 'Registered Boats', val: '385', icon: Anchor, color: 'text-teal-400' },
    { label: 'Active SOS Signals', val: activeSOSCount.toString(), icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Monitored Sectors', val: '12', icon: Radio, color: 'text-emerald-400' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-white">Government Admin Command Dashboard</h1>
        <span className="text-xs font-mono bg-purple-950/60 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">
          SYSTEM HEALTH: 99.8%
        </span>
      </div>

      {pendingCount > 0 && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <UserCheck className="text-amber-400" size={20} />
            <div>
              <span className="font-bold text-white text-sm">Action Required: {pendingCount} Pending User Registrations</span>
              <p className="text-slate-400 text-xs">Fishermen, Family, or Rescue accounts awaiting Government Admin verification.</p>
            </div>
          </div>
          <Link to="/admin/fishermen" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shrink-0 transition">
            <span>Review Applications</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

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
