import React from 'react';
import { 
  ShieldAlert, Anchor, Heart, Building2, Radio, Cpu, 
  ExternalLink, ArrowRight, Activity, LifeBuoy, Server
} from 'lucide-react';

export default function PortalHub() {
  const portals = [
    {
      id: 'fisherman',
      title: 'Fisherman Mobile App',
      role: 'Boat Captain & Crew',
      port: 3001,
      url: 'http://localhost:3001',
      icon: Anchor,
      color: 'from-cyan-600 to-blue-600',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description: 'Touch-optimized mobile interface with 3-second hold Mayday SOS, ESP32 boat telemetry sensors, crew wearable beacon status, and safe fishing zone radar.'
    },
    {
      id: 'family',
      title: 'Family Safety Portal',
      role: 'Fishermen Families',
      port: 3002,
      url: 'http://localhost:3002',
      icon: Heart,
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Peace-of-mind real-time boat tracking radar, estimated return time (ETA) predictions, crew safety status, and direct Coast Guard helpline calling.'
    },
    {
      id: 'rescue',
      title: 'Coast Guard Rescue Command',
      role: 'Rescue Operations & Police',
      port: 3003,
      url: 'http://localhost:3003',
      icon: ShieldAlert,
      color: 'from-red-600 to-rose-700',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      description: 'Tactical maritime operations map displaying all active fishing vessels, Man-Overboard (MOB) wearable beacon signals, and one-click dispatch console for fast patrol boats & helicopters.'
    },
    {
      id: 'admin',
      title: 'Government Fisheries Admin',
      role: 'State Fisheries Dept',
      port: 3004,
      url: 'http://localhost:3004',
      icon: Building2,
      color: 'from-purple-600 to-indigo-600',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description: 'Central vessel registry, license verification, insurance compliance auditing, Direct Benefit Transfer fuel subsidy disbursement, and state-wide safety analytics.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-6 py-5 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <LifeBuoy className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white uppercase">SMART FISHERMEN SAFETY & RESCUE SYSTEM</h1>
              <p className="text-xs text-slate-400">Integrated IoT, Satellite/LTE, AI Risk Engine & Cloud Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Backend Server: <strong className="text-emerald-400">http://localhost:5000</strong></span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto p-6 w-full space-y-8 flex-1">
        <div className="bg-gradient-to-r from-slate-900 via-ocean-900 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Maritime Safety Ecosystem
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              Real-Time Boat Tracking, Wearable MOB Alerts & Coordinated Rescue Dispatch
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Launch any of the role-specific web applications below to experience end-to-end maritime distress detection, live socket telemetry streaming, and automated Coast Guard asset management.
            </p>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map(p => {
            const Icon = p.icon;
            return (
              <div 
                key={p.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${p.color} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase border ${p.badgeColor}`}>
                      Port {p.port}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.role}</span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{p.url}</span>
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-slate-800 group-hover:bg-cyan-600 text-white px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-md"
                  >
                    <span>Launch Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* IoT Simulator Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Live IoT Telemetry & MOB Simulator Included</h4>
              <p className="text-xs text-slate-400 mt-0.5">Run <code className="bg-slate-950 px-2 py-0.5 rounded text-amber-300 font-mono">npm run start:simulator</code> to publish live boat movement and sensor triggers to all dashboards.</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
            Node.js + Socket.IO Engine
          </span>
        </div>

      </div>
    </div>
  );
}
