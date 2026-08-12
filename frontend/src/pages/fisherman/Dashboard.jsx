import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ship, CloudSun, MapPin, ShieldAlert, Radio, Clock, AlertTriangle, Navigation, ArrowRight, UserCheck, Fuel, Wrench, Compass, CheckCircle2 } from 'lucide-react';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import { boatService } from '../../services/boatService';
import { locationService } from '../../services/locationService';
import { emergencyService } from '../../services/emergencyService';
import { tripService } from '../../services/tripService';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [boat, setBoat] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [boatsRes, locsRes] = await Promise.all([
        boatService.getAll().catch(() => ({ boats: [] })),
        locationService.getLiveLocations().catch(() => ({ locations: [] }))
      ]);

      const myBoat = (boatsRes.boats || [])[0] || { name: 'Sea Queen', regNumber: 'TN 07 MF 4587', status: 'On Trip' };
      const myLoc = (locsRes.locations || [])[0] || { lat: 9.3879, lng: 79.3124, speed: 12.4 };

      setBoat(myBoat);
      setLocation(myLoc);
    } catch (err) {
      console.error('Error loading fisherman dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Connecting to Telemetry Feed..." />;

  return (
    <div className="space-y-6">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Good Morning, {user?.name || 'Arun Kumar'} 👋</h1>
          <p className="text-xs text-slate-500 mt-0.5">Stay safe and check your boat status</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
          <span>+ All Systems Normal</span>
        </span>
      </div>

      {/* Top Row: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Boat Status */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Boat Status</span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-500/30 uppercase">
                + On Trip
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-2">{boat?.name || 'Sea Queen'}</h3>
            <p className="text-xs font-mono text-slate-400">{boat?.regNumber || boat?.regNo || 'TN 07 MF 4587'}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="w-full h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-black">
              🚢 Sea Queen at Sea
            </div>
          </div>
        </div>

        {/* Card 2: Weather */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Weather</span>
              <CloudSun size={20} className="text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900">29°C</span>
              <span className="text-xs text-slate-500 font-bold">Partly Cloudy</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div><span className="block text-[10px] text-slate-400">Wind</span><strong className="text-slate-900">18 km/h <span className="text-[9px] text-slate-400">SE</span></strong></div>
              <div><span className="block text-[10px] text-slate-400">Waves</span><strong className="text-slate-900">1.2 m</strong></div>
              <div><span className="block text-[10px] text-slate-400">Rain</span><strong className="text-slate-900">0%</strong></div>
            </div>
          </div>
          <Link to="/fisherman/weather" className="text-xs text-blue-600 font-bold hover:underline mt-3 block text-right">
            View Full Forecast →
          </Link>
        </div>

        {/* Card 3: Location */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Location</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/30">
                ● Live
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-2">Palk Bay</h3>
            <div className="text-xs font-mono text-slate-500 space-y-0.5 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p>Lat: {location?.lat ? location.lat.toFixed(4) : '9.3879'}° N</p>
              <p>Long: {location?.lng ? location.lng.toFixed(4) : '79.3124'}° E</p>
              <p className="text-[10px] text-slate-400">Accuracy: 5 m</p>
            </div>
          </div>
          <Link to="/fisherman/location" className="text-xs text-blue-600 font-bold hover:underline mt-3 block text-right">
            View on Map →
          </Link>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Information */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900">Trip Information</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Distance from Shore</span>
              <span className="text-base font-black text-slate-900">18.6 km</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Speed</span>
              <span className="text-base font-black text-slate-900">12.4 km/h</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Trip Duration</span>
              <span className="text-base font-black text-slate-900">24h 00m</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Course</span>
              <span className="text-base font-black text-slate-900">120° SE</span>
            </div>
          </div>
        </div>

        {/* Big Red SOS Card */}
        <div className="bg-[#dc2626] rounded-xl p-6 shadow-xl flex flex-col justify-between items-center text-center text-white">
          <div>
            <span className="text-xs font-black tracking-wider uppercase opacity-90">EMERGENCY</span>
            <p className="text-xs mt-0.5 opacity-90">Press and hold the button to send SOS</p>
          </div>

          <Link
            to="/fisherman/emergency"
            className="w-22 h-22 rounded-full bg-white text-red-600 font-black text-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition my-3"
          >
            SOS
          </Link>

          <div className="flex items-center gap-4 text-[11px] font-bold opacity-90">
            <span className="flex items-center gap-1"><Radio size={12} /> GPS Connected</span>
            <span className="flex items-center gap-1"><Navigation size={12} /> Network Strong</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Link to="/fisherman/location" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <MapPin size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Live Tracking</span>
            </Link>
            <Link to="/fisherman/crew" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <UserCheck size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Members</span>
            </Link>
            <Link to="/fisherman/boat" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <Ship size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Boat Status</span>
            </Link>
            <Link to="/fisherman/weather" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <CloudSun size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Weather</span>
            </Link>
            <Link to="/fisherman/alerts" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <AlertTriangle size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Alerts</span>
            </Link>
            <Link to="/fisherman/history" className="p-3 bg-slate-50 border border-slate-100 hover:border-blue-500 rounded-lg flex flex-col items-center gap-1.5 text-center transition">
              <Clock size={18} className="text-blue-600" />
              <span className="font-semibold text-slate-800 text-[11px]">Trip History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Alerts List */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Recent Alerts</h3>
            <Link to="/fisherman/alerts" className="text-xs text-blue-600 font-bold hover:underline">View All →</Link>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between"><strong className="text-amber-900">Low Fuel Warning</strong><span className="text-[10px] text-slate-400">May 14, 2025 - 08:45 AM</span></div>
                <p className="text-slate-600 text-[11px] mt-0.5">Fuel level is below 35%.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-2.5">
              <CloudSun size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between"><strong className="text-slate-900">Weather Update</strong><span className="text-[10px] text-slate-400">May 14, 2025 - 05:10 AM</span></div>
                <p className="text-slate-500 text-[11px] mt-0.5">Moderate winds in your area.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between"><strong className="text-slate-900">All Systems Normal</strong><span className="text-[10px] text-slate-400">May 14, 2025 - 04:30 AM</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Checkpoints */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">Next Checkpoints</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
              <div><span className="font-bold text-slate-900 block">Expected Return</span></div>
              <span className="text-xs font-mono text-slate-600 font-bold">Tomorrow, 05:00 PM</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
              <div><span className="font-bold text-slate-900 block">Fuel Check</span></div>
              <span className="text-xs font-mono text-slate-600">In 2 hours</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
              <div><span className="font-bold text-slate-900 block">Engine Maintenance</span></div>
              <span className="text-xs font-mono text-slate-600">In 3 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
