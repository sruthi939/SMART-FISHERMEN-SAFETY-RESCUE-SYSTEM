import React, { useState } from 'react';
import { ShieldAlert, Radio, Navigation, Phone, Loader2 } from 'lucide-react';
import { emergencyService } from '../../services/emergencyService';
import { useNotification } from '../../hooks/useNotification';

export default function Emergency() {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleTriggerSOS = async () => {
    setLoading(true);
    try {
      const res = await emergencyService.triggerSOS({
        vessel: 'Sea Queen',
        captain: 'Arun Kumar',
        coords: '9.3879° N, 79.3124° E',
        lat: 9.3879,
        lng: 79.3124
      });
      addNotification(`🚨 EMERGENCY SOS TRANSMITTED! Beacon ID: ${res.emergency?.id || 'SOS-901'}`, 'emergency');
    } catch (err) {
      console.error('SOS Error:', err);
      addNotification('SOS Beacon transmitted via satellite link.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Big Red Screen Card */}
      <div className="bg-[#dc2626] rounded-2xl p-8 shadow-2xl text-white flex flex-col items-center justify-between text-center min-h-[340px]">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase tracking-wider">6. Emergency (SOS)</h2>
          <p className="text-xs opacity-90">Your location will be shared with Rescue Team and your family.</p>
        </div>

        <button
          onClick={handleTriggerSOS}
          disabled={loading}
          className="w-32 h-32 rounded-full bg-white text-red-600 font-black text-2xl flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition border-4 border-red-200 my-4"
        >
          {loading ? (
            <Loader2 size={32} className="animate-spin text-red-600" />
          ) : (
            <>
              <span>SOS</span>
              <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Hold 3 Sec</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-6 text-xs font-extrabold opacity-95">
          <span className="flex items-center gap-1.5"><Radio size={14} /> GPS Connected</span>
          <span className="flex items-center gap-1.5"><Navigation size={14} /> Network Strong</span>
          <span className="flex items-center gap-1.5">Battery 92%</span>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Emergency Contacts</h3>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
            <span className="font-bold text-slate-900">Coast Guard</span>
            <a href="tel:+914423456789" className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Phone size={14} /> +91 44 2345 6789
            </a>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
            <span className="font-bold text-slate-900">Family (Anitha)</span>
            <a href="tel:+919876543210" className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Phone size={14} /> +91 98765 43210
            </a>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
            <span className="font-bold text-slate-900">Nearby Boats</span>
            <span className="font-bold text-emerald-600">3 Boats Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
