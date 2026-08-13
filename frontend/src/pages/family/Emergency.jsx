import React, { useState, useEffect } from 'react';
import { ShieldAlert, LifeBuoy, PhoneCall, CheckCircle2, Radio, Clock, MapPin } from 'lucide-react';
import { socketService } from '../../services/socketService';
import { useNotification } from '../../hooks/useNotification';

export default function Emergency() {
  const { addNotification } = useNotification();
  const [activeSOS, setActiveSOS] = useState({
    id: 'SOS-901',
    vessel: 'Sea Queen (TN 07 MF 4587)',
    captain: 'Manu',
    coords: '9.2876° N, 79.3129° E',
    status: 'ACTIVE',
    rescueStatus: 'Rescue Squad Dispatched (Alpha Coast Guard Patrol)',
    assignedTeam: 'Alpha Rescue Team',
    etaMinutes: 18
  });

  useEffect(() => {
    // Listen for real-time SOS alerts and Rescue Officer status updates via Socket.IO
    const handleSOS = (sosData) => {
      addNotification(`🚨 EMERGENCY ALERT: ${sosData.captain} on ${sosData.vessel} activated SOS!`, 'emergency');
      setActiveSOS(sosData);
    };

    const handleRescueAccepted = (data) => {
      addNotification(`🛡️ RESCUE TEAM ASSIGNED: ${data.assignedTeam} (ETA 18 mins).`, 'info');
      setActiveSOS(prev => ({
        ...prev,
        rescueStatus: `Rescue Team Assigned (${data.assignedTeam})`,
        assignedTeam: data.assignedTeam,
        etaMinutes: 18
      }));
    };

    const handleStatusUpdate = (statusData) => {
      addNotification(`🔄 RESCUE PROGRESS UPDATE: ${statusData.rescueStatus}`, 'info');
      setActiveSOS(prev => ({
        ...prev,
        rescueStatus: statusData.rescueStatus
      }));
    };

    socketService.on('emergency:created', handleSOS);
    socketService.on('emergency:accepted', handleRescueAccepted);
    socketService.on('rescue:status', handleStatusUpdate);

    return () => {
      socketService.off('emergency:created', handleSOS);
      socketService.off('emergency:accepted', handleRescueAccepted);
      socketService.off('rescue:status', handleStatusUpdate);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-3xl mx-auto font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Emergency & Rescue Status</h1>
      </div>

      {/* Active Distress Live Response Card */}
      {activeSOS ? (
        <div className="bg-red-950/90 border border-red-800 rounded-2xl p-6 shadow-2xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-red-800 pb-3">
            <span className="px-3 py-1 bg-red-600 text-white font-black text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert size={16} /> 🚨 EMERGENCY ALERT ACTIVE
            </span>
            <span className="text-xs font-mono text-red-200">ID: {activeSOS.id}</span>
          </div>

          <div className="space-y-1 text-xs">
            <strong className="text-lg font-black text-white block">{activeSOS.captain} — {activeSOS.vessel}</strong>
            <p className="text-red-200 font-mono flex items-center gap-1.5 text-xs">
              <MapPin size={14} className="text-red-400" /> Coordinates: {activeSOS.coords}
            </p>
          </div>

          {/* Rescue Status Step Box */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400">
              <LifeBuoy size={18} className="animate-spin" />
              <span>{activeSOS.rescueStatus}</span>
            </div>
            {activeSOS.assignedTeam && (
              <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800">
                <span>Team: <strong className="text-white">{activeSOS.assignedTeam}</strong></span>
                <span>ETA: <strong className="text-emerald-400 font-mono">{activeSOS.etaMinutes || 18} minutes</strong></span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white border border-slate-200/80 rounded-xl text-center space-y-2">
          <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
          <strong className="text-slate-900 text-sm block font-bold">No Active Emergencies</strong>
          <p className="text-xs text-slate-500">Your linked fisherman is currently safe.</p>
        </div>
      )}

      {/* Coast Guard Emergency Helplines */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Direct Coast Guard Dispatch</h3>

        <div className="space-y-2.5 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            <div>
              <strong className="text-slate-900 font-bold block">Indian Coast Guard Command</strong>
              <span className="text-[11px] text-slate-500">Maritime Search & Rescue Center</span>
            </div>
            <a href="tel:+914423456789" className="font-mono font-extrabold text-blue-600 hover:underline flex items-center gap-1.5 text-xs">
              <PhoneCall size={16} /> +91 44 2345 6789
            </a>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            <div>
              <strong className="text-slate-900 font-bold block">Fishermen Helpline Center</strong>
              <span className="text-[11px] text-slate-500">Toll-free 24/7 Helpline</span>
            </div>
            <a href="tel:18001204567" className="font-mono font-extrabold text-blue-600 hover:underline flex items-center gap-1.5 text-xs">
              <PhoneCall size={16} /> 1800 120 4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
