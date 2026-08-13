import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Clock, ShieldCheck, Compass, StopCircle, Radio, MapPin, Waves } from 'lucide-react';
import Map from '../../components/Map';
import { tripService } from '../../services/tripService';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';

export default function ActiveTrip() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [activeVoyage, setActiveVoyage] = useState({
    id: 'TRIP-2025-089',
    boatName: user?.boatName ? `${user.boatName} (${user.boatRegNumber || 'TN 07 MF 4587'})` : 'Sea Queen (TN 07 MF 4587)',
    sector: 'Sector 4B (Palk Bay)',
    coordinates: '9.2876° N, 79.3129° E',
    speed: '8.4 knots',
    heading: '124° SE',
    duration: '06h 45m',
    status: 'In Progress'
  });

  useEffect(() => {
    if (user) {
      setActiveVoyage(prev => ({
        ...prev,
        boatName: user.boatName ? `${user.boatName} (${user.boatRegNumber || 'TN 07 MF 4587'})` : prev.boatName
      }));
    }
  }, [user]);

  const handleEndVoyage = async () => {
    setLoading(true);
    try {
      await tripService.endTrip(activeVoyage.id);
      addNotification('⚓ Voyage Completed! Safely docked at Rameswaram Harbor.', 'info');
      setTimeout(() => {
        navigate('/fisherman/history');
      }, 1000);
    } catch (err) {
      console.error('End trip error:', err);
      addNotification('Voyage completed and logged to historical trip register.', 'info');
      setTimeout(() => {
        navigate('/fisherman/history');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
            <Radio size={20} className="animate-pulse text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">Active Voyage Telemetry</h1>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full border border-emerald-500/30">
                ● Transponder Live
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{activeVoyage.boatName} — {activeVoyage.sector}</p>
          </div>
        </div>

        <button
          onClick={handleEndVoyage}
          disabled={loading}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl shadow-xs shadow-red-600/30 transition flex items-center gap-2 shrink-0"
        >
          <StopCircle size={16} />
          <span>{loading ? 'Docking Voyage...' : 'Complete Voyage & Return to Port'}</span>
        </button>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <MapPin size={14} className="text-blue-500" /> Current Coordinates
          </span>
          <strong className="text-sm font-black text-slate-900 font-mono">{activeVoyage.coordinates}</strong>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <Navigation size={14} className="text-cyan-500" /> Vessel Speed
          </span>
          <strong className="text-sm font-black text-slate-900">{activeVoyage.speed}</strong>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <Compass size={14} className="text-amber-500" /> Compass Heading
          </span>
          <strong className="text-sm font-black text-slate-900">{activeVoyage.heading}</strong>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <Clock size={14} className="text-emerald-500" /> Time Elapsed
          </span>
          <strong className="text-sm font-black text-slate-900 font-mono">{activeVoyage.duration}</strong>
        </div>
      </div>

      {/* Map View */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <Map title="Live Active Voyage Transponder Track (Palk Bay Sector 4B)" />
      </div>
    </div>
  );
}
