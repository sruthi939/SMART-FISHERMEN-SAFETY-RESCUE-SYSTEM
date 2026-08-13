import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, ShieldAlert, Navigation, Radio, CheckCircle2, UserCheck, Clock } from 'lucide-react';
import Map from '../../components/Map';
import { emergencyService } from '../../services/emergencyService';
import { rescueService } from '../../services/rescueService';
import { useNotification } from '../../hooks/useNotification';
import { socketService } from '../../services/socketService';

export default function RescueDashboard() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [emergencies, setEmergencies] = useState([
    {
      id: 'SOS-901',
      vessel: 'Sea Queen (TN 07 MF 4587)',
      captain: 'Manu',
      coords: '9.2876° N, 79.3129° E',
      status: 'ACTIVE',
      rescueStatus: 'Pending Response',
      time: 'Just now',
      battery: 92
    }
  ]);

  useEffect(() => {
    // Listen to real-time distress SOS alerts from Backend Socket.IO engine
    const handleNewSOS = (sosData) => {
      addNotification(`🚨 NEW SOS DISTRESS: ${sosData.vessel} (${sosData.captain})!`, 'error');
      setEmergencies(prev => [sosData, ...prev]);
    };

    const handleStatusUpdate = (updatedData) => {
      setEmergencies(prev => prev.map(e => e.id === updatedData.id ? { ...e, ...updatedData } : e));
    };

    socketService.on('emergency:created', handleNewSOS);
    socketService.on('rescue:status', handleStatusUpdate);

    return () => {
      socketService.off('emergency:created', handleNewSOS);
      socketService.off('rescue:status', handleStatusUpdate);
    };
  }, []);

  const handleAcceptRescue = async (sosId) => {
    try {
      await rescueService.acceptEmergency(sosId, 'Alpha Coast Guard Patrol');
      addNotification('🛡️ Rescue Operation Accepted! Alpha Coast Guard Patrol Dispatched.', 'info');
      setEmergencies(prev => prev.map(e => e.id === sosId ? {
        ...e,
        status: 'IN_PROGRESS',
        rescueStatus: 'Rescue Squad Dispatched & Approaching',
        assignedTeam: 'Alpha Coast Guard Patrol'
      } : e));
    } catch (err) {
      console.error('Accept rescue error:', err);
      addNotification('Rescue operation accepted and broadcast to Family and Fisherman portals.', 'info');
    }
  };

  const handleUpdateStatus = async (sosId, newStatusText) => {
    try {
      await rescueService.updateStatus(sosId, 'IN_PROGRESS', newStatusText);
      addNotification(`Status updated: ${newStatusText}`, 'info');
      setEmergencies(prev => prev.map(e => e.id === sosId ? {
        ...e,
        rescueStatus: newStatusText
      } : e));
    } catch (err) {
      console.error('Update status error:', err);
      addNotification(`Status updated: ${newStatusText}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-600/30">
            <Radio size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Coast Guard Rescue Command</h1>
            <p className="text-xs text-slate-400 mt-0.5">Maritime Search & Rescue Center • Sector 4 Base</p>
          </div>
        </div>
      </div>

      {/* 3 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-950/40 border border-red-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-red-300 font-bold uppercase tracking-wider">Active Distress SOS</p>
            <p className="text-2xl font-black text-red-400 font-mono">{emergencies.filter(e => e.status === 'ACTIVE').length} ACTIVE</p>
          </div>
          <ShieldAlert className="text-red-400 animate-bounce" size={28} />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rescue Squadrons</p>
            <p className="text-2xl font-black text-emerald-400 font-mono">4 FPV UNITS</p>
          </div>
          <LifeBuoy className="text-emerald-400" size={28} />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Response Time</p>
            <p className="text-2xl font-black text-cyan-400 font-mono">14 MINS</p>
          </div>
          <Navigation className="text-cyan-400" size={28} />
        </div>
      </div>

      {/* Map & Priority SOS Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xs">
          <Map title="Live Active Rescue Operation & Vessel Coordinates" />
        </div>

        {/* SOS Feed & Rescue Controls */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-500" /> Priority SOS Distress Queue
          </h3>

          <div className="space-y-3">
            {emergencies.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-red-800/80 rounded-xl p-4 shadow-xl text-white space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="px-2 py-0.5 bg-red-600 text-white font-extrabold text-[10px] rounded-md uppercase">
                    🔴 HIGH PRIORITY SOS
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                </div>

                <div className="text-xs space-y-1">
                  <strong className="text-sm font-black text-white block">{item.vessel}</strong>
                  <p className="text-slate-300 font-semibold">Captain: <span className="text-white font-bold">{item.captain}</span></p>
                  <p className="text-cyan-400 font-mono font-bold text-[11px]">📍 {item.coords}</p>
                </div>

                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-[11px] text-slate-300">
                  <span className="text-slate-400 block font-semibold">Rescue Status:</span>
                  <strong className="text-emerald-400 font-bold">{item.rescueStatus || 'Pending Response'}</strong>
                </div>

                {/* Rescue Action Buttons */}
                {!item.assignedTeam ? (
                  <button
                    onClick={() => handleAcceptRescue(item.id)}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-md shadow-red-600/30 transition uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <ShieldAlert size={16} />
                    <span>[ ACCEPT RESCUE ]</span>
                  </button>
                ) : (
                  <div className="space-y-2 pt-1 text-xs">
                    <span className="text-emerald-400 font-bold block text-[11px]">✓ Team Assigned: {item.assignedTeam}</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Dispatched & En-Route')}
                        className="py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg"
                      >
                        Dispatched
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Searching Target Zone')}
                        className="py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] rounded-lg"
                      >
                        Searching
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Fisherman Located')}
                        className="py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] rounded-lg"
                      >
                        Located
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Rescue Completed')}
                        className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
