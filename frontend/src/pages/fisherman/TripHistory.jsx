import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import Loader from '../../components/Loader';
import { tripService } from '../../services/tripService';

export default function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await tripService.getTrips();
      setTrips(res.trips || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Voyage & Trip History Log..." />;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <History size={22} className="text-cyan-400" />
            <span>Trip History Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Recorded voyages & GPS telemetry</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
            <tr>
              <th className="p-3">Boat Name</th>
              <th className="p-3">Captain</th>
              <th className="p-3">Sector</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {trips.map((t, idx) => (
              <tr key={t.id || idx} className="hover:bg-slate-800/40 transition">
                <td className="p-3 font-bold text-white">{t.boatName}</td>
                <td className="p-3">{t.captainName}</td>
                <td className="p-3 text-cyan-400 font-semibold">{t.sector || 'Sector 4B'}</td>
                <td className="p-3 font-mono">{t.durationHours || 24} hrs</td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    t.status === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
