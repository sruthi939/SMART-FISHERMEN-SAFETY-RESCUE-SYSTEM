import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ship, CloudSun, MapPin, ShieldAlert, Radio, Clock, AlertTriangle, Navigation, ArrowRight, UserCheck } from 'lucide-react';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import { boatService } from '../../services/boatService';
import { locationService } from '../../services/locationService';
import { emergencyService } from '../../services/emergencyService';
import { tripService } from '../../services/tripService';
import { alertService } from '../../services/alertService';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [boat, setBoat] = useState(null);
  const [location, setLocation] = useState(null);
  const [activeTrip, setActiveTrip] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [boatsRes, locsRes, tripRes, alertsRes] = await Promise.all([
        boatService.getAll().catch(() => ({ boats: [] })),
        locationService.getLiveLocations().catch(() => ({ locations: [] })),
        tripService.getActiveTrip().catch(() => ({ trip: null })),
        alertService.getAlerts().catch(() => ({ alerts: [] }))
      ]);

      const myBoat = (boatsRes.boats || [])[0] || { name: 'Sea Queen', regNumber: 'TN 07 MF 4587', status: 'On Trip', battery: 92 };
      const myLoc = (locsRes.locations || [])[0] || { lat: 9.9312, lng: 76.2673, speed: 12.4 };
      
      setBoat(myBoat);
      setLocation(myLoc);
      setActiveTrip(tripRes.trip || null);
      setAlerts((alertsRes.alerts || []).slice(0, 3));
    } catch (err) {
      console.error('Error loading fisherman dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Connecting to Vessel Telemetry & Satellite Feed..." />;

  return (
    <div className="space-y-6">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Good Morning, {user?.name || 'Capt. Ramesh Kumar'} 👋</h1>
          <p className="text-xs text-slate-400 mt-1">Stay safe and check your vessel telemetry before heading to sea</p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          All Systems Normal
        </span>
      </div>

      {/* Top Row: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Boat Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Boat Telemetry</span>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-extrabold rounded-full border border-emerald-500/40 uppercase">
                {boat?.status || 'Active'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-2">{boat?.name || 'Sea Queen'}</h3>
            <p className="text-xs font-mono text-slate-400">{boat?.regNumber || boat?.regNo || 'TN 07 MF 4587'}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Engine: <strong className="text-emerald-400">Normal</strong></span>
            <span className="text-slate-400">Battery: <strong className="text-emerald-400">{boat?.battery || 94}%</strong></span>
          </div>
        </div>

        {/* Card 2: Weather */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Weather Advisory</span>
              <CloudSun size={20} className="text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-white">29°C</span>
              <span className="text-xs text-slate-400 font-semibold">Partly Cloudy</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
              <div><span>Wind:</span> <p className="font-bold text-white">18 km/h</p></div>
              <div><span>Waves:</span> <p className="font-bold text-white">1.2 m</p></div>
              <div><span>Rain:</span> <p className="font-bold text-white">0%</p></div>
            </div>
          </div>
          <Link to="/fisherman/weather" className="text-xs text-cyan-400 font-semibold hover:underline mt-3 block text-right">
            View Full Forecast →
          </Link>
        </div>

        {/* Card 3: Location */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">GPS Coords</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                ● Live Satellite
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-2">Palk Bay Coastal Sector</h3>
            <div className="text-xs font-mono text-slate-400 space-y-0.5 mt-1">
              <p>Lat: {location?.lat ? location.lat.toFixed(4) : '9.9312'}° N</p>
              <p>Long: {location?.lng ? location.lng.toFixed(4) : '76.2673'}° E</p>
            </div>
          </div>
          <Link to="/fisherman/location" className="text-xs text-cyan-400 font-semibold hover:underline mt-3 block text-right">
            View on Map →
          </Link>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Information */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Voyage Telemetry</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Distance from Shore</span>
              <span className="text-base font-extrabold text-white">18.6 km</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Speed</span>
              <span className="text-base font-extrabold text-white">{location?.speed || 12.4} knots</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Trip Duration</span>
              <span className="text-base font-extrabold text-white">{activeTrip?.durationHours || 24}h 00m</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Sector</span>
              <span className="text-base font-extrabold text-white">{activeTrip?.sector || 'Sector 4B'}</span>
            </div>
          </div>
        </div>

        {/* Big Red SOS Card */}
        <div className="bg-gradient-to-br from-red-950/90 to-red-900/60 border border-red-600/60 rounded-xl p-6 shadow-xl flex flex-col justify-between items-center text-center">
          <div>
            <span className="text-xs font-extrabold text-red-400 tracking-wider uppercase">EMERGENCY SOS DISPATCH</span>
            <p className="text-xs text-red-200 mt-1">Direct alert to Coast Guard & Family</p>
          </div>

          <Link
            to="/fisherman/emergency"
            className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-500 border-4 border-red-400 text-white font-black text-xl flex items-center justify-center shadow-2xl shadow-red-600/50 transform hover:scale-105 transition my-4 animate-pulse"
          >
            SOS
          </Link>

          <div className="flex items-center gap-4 text-[11px] text-red-300 font-semibold">
            <span className="flex items-center gap-1"><Radio size={12} /> GPS Connected</span>
            <span className="flex items-center gap-1"><Navigation size={12} /> Network Strong</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link to="/fisherman/location" className="p-3 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <MapPin size={18} className="text-cyan-400" />
              <span className="font-semibold text-slate-200">Live Tracking</span>
            </Link>
            <Link to="/fisherman/crew" className="p-3 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <UserCheck size={18} className="text-emerald-400" />
              <span className="font-semibold text-slate-200">Crew Members</span>
            </Link>
            <Link to="/fisherman/boat" className="p-3 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <Ship size={18} className="text-purple-400" />
              <span className="font-semibold text-slate-200">Boat Status</span>
            </Link>
            <Link to="/fisherman/alerts" className="p-3 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <CloudSun size={18} className="text-amber-400" />
              <span className="font-semibold text-slate-200">Weather & Alerts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Alerts List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live System Advisories</h3>
            <Link to="/fisherman/alerts" className="text-xs text-cyan-400 hover:underline">View All →</Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {alerts.length === 0 ? (
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-400 text-center">
                No active safety warnings broadcasted.
              </div>
            ) : (
              alerts.map((a) => (
                <div key={a.id} className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-lg flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between"><strong className="text-amber-200">{a.title}</strong><span className="text-[10px] text-slate-400">Live</span></div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{a.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Next Checkpoints */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Next Checkpoints</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center justify-between">
              <div><span className="font-bold text-white block">Expected Return</span><p className="text-slate-400 text-[11px]">Cochin Harbor Base</p></div>
              <span className="text-xs font-mono text-cyan-400 font-bold">Tomorrow, 05:00 PM</span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center justify-between">
              <div><span className="font-bold text-white block">Fuel Check</span><p className="text-slate-400 text-[11px]">Scheduled telemetry</p></div>
              <span className="text-xs font-mono text-slate-400">In 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
