import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import Loader from '../../components/Loader';
import { tripService } from '../../services/tripService';

export default function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);

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

  if (loading) return <Loader text="Loading Voyage & GPS Telemetry History..." />;

  const activeTrip = trips.find(t => t.status === 'ACTIVE') || trips[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Current Trip Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-blue-600 uppercase tracking-wider">Current Trip</h2>
          <span className="text-[10px] font-bold text-slate-400">This Month</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Start Date</span>
            <strong className="text-slate-900">May 13, 2025 05:30 AM</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Expected Return</span>
            <strong className="text-slate-900">May 15, 2025 05:30 PM</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
          <div><span className="text-slate-400 block text-[10px]">Distance Covered</span><strong className="text-slate-900 font-black">45.6 km</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Max Speed</span><strong className="text-slate-900 font-black">18.2 km/h</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Travel Time</span><strong className="text-slate-900 font-black">22h 15m</strong></div>
        </div>
      </div>

      {/* Previous Trips Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Previous Trips</h3>

        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Boat Name</th>
                <th className="p-3">Captain</th>
                <th className="p-3">Sector</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {trips.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold">{item.boatName}</td>
                  <td className="p-3 font-semibold">{item.captainName}</td>
                  <td className="p-3 font-mono">{item.sector || 'Sector 4B'}</td>
                  <td className="p-3 font-mono">{item.durationHours || 24} hrs</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      item.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-500/30'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setShowAllModal(true)}
          className="text-xs text-blue-600 font-bold hover:underline block text-center w-full pt-2"
        >
          View All Trips
        </button>
      </div>

      {/* View All Trips Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-xl w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Complete Historical Voyage Log</h3>
              <button onClick={() => setShowAllModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg max-h-64 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Boat</th>
                    <th className="p-2.5">Sector</th>
                    <th className="p-2.5">Duration</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trips.map((t, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold">{t.boatName}</td>
                      <td className="p-2.5 text-blue-600">{t.sector || 'Sector 4B'}</td>
                      <td className="p-2.5 font-mono">{t.durationHours || 24} h</td>
                      <td className="p-2.5 font-extrabold">{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowAllModal(false)}
              className="w-full py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
