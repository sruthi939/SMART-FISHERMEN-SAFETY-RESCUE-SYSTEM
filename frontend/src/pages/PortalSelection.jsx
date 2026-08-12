import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Anchor, 
  Heart, 
  ShieldAlert, 
  Building2, 
  LifeBuoy, 
  Lock, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function PortalSelection() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSelectPortal = (role, path) => {
    login({ name: `${role} User`, role: role.toLowerCase() }, 'jwt_sample_token');
    navigate(path);
  };

  const portals = [
    {
      id: 'fisherman',
      title: 'Fisherman Portal',
      description: '12-Screen Mobile Application workflow with live tracking, SOS, weather & crew management.',
      buttonText: 'ENTER FISHERMAN PORTAL →',
      icon: Anchor,
      iconBg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400',
      buttonBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25',
      path: '/fisherman'
    },
    {
      id: 'family',
      title: 'Family Care Portal',
      description: 'Dynamic return ETA tracking, fish market auction rates, 24x7 tele-medicine, and off-grid mesh chat.',
      buttonText: 'ENTER FAMILY PORTAL →',
      icon: Heart,
      iconBg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
      buttonBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25',
      path: '/family'
    },
    {
      id: 'rescue',
      title: 'Coast Guard Rescue Portal',
      description: 'Maritime MROC radar, active emergency dispatch queue, SAR Drone FLIR HUD, and AI MOB drift trajectory.',
      buttonText: 'ENTER RESCUE PORTAL →',
      icon: ShieldAlert,
      iconBg: 'bg-amber-950/60 border-amber-500/40 text-amber-400',
      buttonBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25',
      path: '/rescue'
    },
    {
      id: 'admin',
      title: 'Govt Admin Portal',
      description: 'Portal access request verification, Kerala 9 coastal district seashore registry, and vessel blockchain audit ledger.',
      buttonText: 'ENTER ADMIN PORTAL →',
      icon: Building2,
      iconBg: 'bg-purple-950/60 border-purple-500/40 text-purple-400',
      buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25',
      path: '/admin'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Radial Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[#0c1a2e] border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-6">
            <LifeBuoy size={34} className="stroke-[2]" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wider uppercase mb-2">
            SMART FISHERMEN SAFETY SYSTEM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg font-medium">
            Select your dedicated portal below to access isolated authentication and portal features
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className="bg-[#0b1320]/80 backdrop-blur border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${portal.iconBg}`}>
                    <Icon size={26} className="stroke-[2]" />
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-3 tracking-tight">
                    {portal.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal mb-8">
                    {portal.description}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectPortal(portal.title.split(' ')[0], portal.path)}
                  className={`w-full text-xs font-black py-3 px-4 rounded-xl transition duration-200 uppercase tracking-wide flex items-center justify-center gap-1.5 ${portal.buttonBg}`}
                >
                  <span>{portal.buttonText}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Security Footer Note */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock size={14} className="text-cyan-400" />
            100% Strict Role Isolation
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            Admin Verification Required
          </span>
        </div>

      </div>

      <footer className="text-center text-[11px] text-slate-600 mt-8 relative z-10">
        © 2026 Smart Fishermen Safety & Rescue System. All rights reserved.
      </footer>
    </div>
  );
}
