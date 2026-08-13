import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ship, Clock, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import Loader from '../../components/Loader';
import { tripService } from '../../services/tripService';

export default function TripHistory() {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function loadTrips() {
      try {
        const res = await tripService.getTrips();
        if (res.trips) {
          setTrips(res.trips);
        }
      } catch (err) {
        console.error('Failed to load trips:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  if (loading) {
    return <Loader text="Loading Voyage Records..." />;
  }

  const filteredTrips = trips.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'On Trip') return t.status === 'ACTIVE' || t.status === 'On Trip';
    if (filter === 'Completed') return t.status === 'COMPLETED' || t.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Trips History</h1>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 w-fit text-xs font-bold">
        {['All', 'On Trip', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg transition ${
              filter === tab ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trip List Cards */}
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Ship size={18} />
                </div>
                <strong className="text-slate-900 font-extrabold text-sm">{trip.boatName} ({trip.captainName})</strong>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                trip.status === 'ACTIVE' || trip.status === 'On Trip' ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-blue-50 text-blue-600 border-blue-300'
              }`}>
                {trip.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Start Time</span>
                <strong className="text-slate-900 font-mono">{trip.startTime ? new Date(trip.startTime).toLocaleString() : 'May 14, 2025 - 05:30 AM'}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">
                  {trip.status === 'ACTIVE' ? 'Expected Return' : 'End Time'}
                </span>
                <strong className="text-slate-900 font-mono">{trip.expectedReturn || 'May 15, 2025 - 05:30 PM'}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Fishing Zone</span>
                <strong className="text-slate-900">{trip.sector || 'Palk Bay'}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Crew Members</span>
                <strong className="text-slate-900 font-mono">{trip.crewCount || 4}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Link to="/family/location" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>View Live Tracking</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
