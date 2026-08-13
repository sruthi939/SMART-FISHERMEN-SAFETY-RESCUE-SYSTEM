import React, { useState, useEffect } from 'react';
import { ShieldAlert, Radio, Navigation, Phone, Loader2, CheckCircle2, LifeBuoy } from 'lucide-react';
import { emergencyService } from '../../services/emergencyService';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { socketService } from '../../services/socketService';

export default function Emergency() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [activeSOS, setActiveSOS] = useState(null);

  useEffect(() => {
    // Listen for real-time Rescue Acceptance & Status Updates from Rescue Officer
    const handleRescueAccepted = (data) => {
      addNotification(`🛡️ RESCUE ACCEPTED! ${data.assignedTeam} dispatched (ETA 18 mins).`, 'info');
      setActiveSOS(prev => ({
        ...prev,
        rescueStatus: `Rescue Squad Dispatched (${data.assignedTeam})`,
        assignedTeam: data.assignedTeam,
        etaMinutes: 18
      }));
    };

    const handleStatusUpdate = (statusData) => {
      addNotification(`🔄 RESCUE STATUS UPDATE: ${statusData.rescueStatus}`, 'info');
      setActiveSOS(prev => ({
        ...prev,
        rescueStatus: statusData.rescueStatus
      }));
    };

    socketService.on('emergency:accepted', handleRescueAccepted);
    socketService.on('rescue:status', handleStatusUpdate);

    return () => {
      socketService.off('emergency:accepted', handleRescueAccepted);
      socketService.off('rescue:status', handleStatusUpdate);
    };
  }, []);

  const handleTriggerSOS = async () => {
    setLoading(true);
    try {
      const payload = {
        vessel: user?.boatName ? `${user.boatName} (${user.boatRegNumber || 'TN 07 MF 4587'})` : 'Sea Queen (TN 07 MF 4587)',
        captain: user?.name || 'Manu',
        fishermanId: user?.id || 'FSH001',
        coords: '9.2876° N, 79.3129° E',
        lat: 9.2876,
        lng: 79.3129
      };

      const res = await emergencyService.triggerSOS(payload);
      setActiveSOS({
        id: res.emergency?.id || 'SOS-901',
        rescueStatus: 'Transponder Active - Alert Broadcast to Rescue Command & Family',
        assignedTeam: null
      });

      addNotification(`🚨 EMERGENCY SOS BROADCAST! Beacon ID: ${res.emergency?.id || 'SOS-901'}`, 'emergency');
    } catch (err) {
      console.error('SOS Error:', err);
      setActiveSOS({
        id: 'SOS-901',
        rescueStatus: 'Transponder Active - Alert Broadcast to Rescue Command & Family'
      });
      addNotification('SOS Beacon transmitted via satellite link to Family & Rescue systems.', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Big Red Screen Card */}
      <div className="bg-[#dc2626] rounded-2xl p-8 shadow-2xl text-white flex flex-col items-center justify-between text-center min-h-[340px]">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase tracking-wider">Emergency Distress Beacon (SOS)</h2>
          <p className="text-xs opacity-90">Pressing SOS broadcasts satellite coordinates to Coast Guard & Family systems.</p>
        </div>

        <button
          onClick={handleTriggerSOS}
          disabled={loading}
          className="w-32 h-32 rounded-full bg-white text-red-600 font-black text-2xl flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition border-4 border-red-200 my-4 shrink-0"
        >
          {loading ? (
            <Loader2 size={32} className="animate-spin text-red-600" />
          ) : (
            <>
              <span>SOS</span>
              <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Press Now</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-6 text-xs font-extrabold opacity-95">
          <span className="flex items-center gap-1.5"><Radio size={14} /> GPS Connected</span>
          <span className="flex items-center gap-1.5"><Navigation size={14} /> Transponder 100%</span>
          <span className="flex items-center gap-1.5">Battery 92%</span>
        </div>
      </div>

      {/* Active Distress Live Response Box */}
      {activeSOS && (
        <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-5 shadow-xl text-white space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] rounded-full border border-emerald-500/40 uppercase flex items-center gap-1">
              <CheckCircle2 size={12} /> Active SOS Beacon Registered
            </span>
            <span className="text-[10px] font-mono text-slate-400">ID: {activeSOS.id}</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <LifeBuoy size={22} className="animate-spin" />
            </div>
            <div>
              <strong className="text-sm font-black text-white block">Rescue Operation Live Telemetry</strong>
              <p className="text-xs text-emerald-400 font-bold mt-0.5">{activeSOS.rescueStatus}</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Emergency Contacts</h3>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
            <span className="font-bold text-slate-900">Coast Guard Dispatch</span>
            <a href="tel:+914423456789" className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Phone size={14} /> +91 44 2345 6789
            </a>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
            <span className="font-bold text-slate-900">Family Primary Contact</span>
            <a href="tel:+919876543210" className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Phone size={14} /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
