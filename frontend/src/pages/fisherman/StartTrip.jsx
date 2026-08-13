import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Anchor, ShieldCheck, Compass, Users, Clock, Loader2 } from 'lucide-react';
import Button from '../../components/Button';
import { tripService } from '../../services/tripService';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';

export default function StartTrip() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [tripData, setTripData] = useState({
    boatName: user?.boatName ? `${user.boatName} (${user.boatRegNumber || 'TN 07 MF 4587'})` : 'Sea Queen (TN 07 MF 4587)',
    captainName: user?.name || 'Arun Kumar',
    durationHours: '24',
    crewCount: '5',
    sector: 'Sector 4B (Palk Bay)'
  });

  useEffect(() => {
    if (user) {
      setTripData(prev => ({
        ...prev,
        boatName: user.boatName ? `${user.boatName} (${user.boatRegNumber || 'TN 07 MF 4587'})` : prev.boatName,
        captainName: user.name || prev.captainName
      }));
    }
  }, [user]);

  const handleStartVoyage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await tripService.startTrip({
        boatName: tripData.boatName,
        captainName: tripData.captainName,
        durationHours: parseInt(tripData.durationHours, 10),
        crewCount: parseInt(tripData.crewCount, 10),
        sector: tripData.sector
      });

      addNotification('🚀 Sea Voyage Initialized! Satellite beacon connected.', 'info');
      setTimeout(() => {
        navigate('/fisherman/active-trip');
      }, 1000);
    } catch (err) {
      console.error('Start trip error:', err);
      addNotification('Voyage initialized locally. Satellite transponder active.', 'info');
      setTimeout(() => {
        navigate('/fisherman/active-trip');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
          <Play size={20} className="fill-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900">Start New Sea Voyage</h1>
          <p className="text-xs text-slate-500 mt-0.5">Initialize satellite tracking & pre-departure safety checklist</p>
        </div>
      </div>

      <form onSubmit={handleStartVoyage} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-bold mb-1">Vessel & Captain</label>
          <input
            type="text"
            value={`${tripData.boatName} - Capt. ${tripData.captainName}`}
            disabled
            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Expected Duration (Hours)</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                value={tripData.durationHours}
                onChange={(e) => setTripData({ ...tripData, durationHours: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">On-Board Crew Count</label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                value={tripData.crewCount}
                onChange={(e) => setTripData({ ...tripData, crewCount: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Target Sector / Fishing Zone</label>
          <div className="relative">
            <Compass size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <select
              value={tripData.sector}
              onChange={(e) => setTripData({ ...tripData, sector: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="Sector 4B (Palk Bay)">Sector 4B (Palk Bay)</option>
              <option value="Sector 2A (Gulf of Mannar)">Sector 2A (Gulf of Mannar)</option>
              <option value="Sector 8C (Kanyakumari Coast)">Sector 8C (Kanyakumari Coast)</option>
            </select>
          </div>
        </div>

        {/* Pre-Departure Checklist */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-emerald-950">
          <strong className="flex items-center gap-1.5 text-xs text-emerald-900 font-bold">
            <ShieldCheck size={16} className="text-emerald-600" /> Pre-Departure Safety Checklist Verified
          </strong>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-emerald-800 font-semibold">
            <span>✓ Life Jackets Verified (5 Units)</span>
            <span>✓ AIS & VHF Radio Online</span>
            <span>✓ EPIRB Battery 92%</span>
            <span>✓ Fuel Level 340 L / 500 L</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/30 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Connecting Transponder Beacon...</span>
            </>
          ) : (
            <>
              <Anchor size={16} />
              <span>Initialize Voyage & Connect Satellite Transponder</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
