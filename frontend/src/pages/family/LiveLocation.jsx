import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Clock, Compass, Radio, MapPin, ArrowLeft } from 'lucide-react';
import Map from '../../components/Map';
import Loader from '../../components/Loader';
import { familyService } from '../../services/familyService';
import { socketService } from '../../services/socketService';

export default function LiveLocation() {
  const [loading, setLoading] = useState(true);
  const [vessels, setVessels] = useState([]);
  const [selectedVesselId, setSelectedVesselId] = useState('');

  useEffect(() => {
    async function fetchVessels() {
      try {
        const res = await familyService.getLinkedFishermen();
        if (res.linkedFishermen) {
          setVessels(res.linkedFishermen);
          if (res.linkedFishermen.length > 0) {
            setSelectedVesselId(res.linkedFishermen[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch linked fishermen for tracking:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchVessels();

    // Socket.IO Real-time location update event listener
    const handleLocationUpdate = (locData) => {
      setVessels(prev => prev.map(v => v.id === locData.fishermanId || v.boatRegNumber === locData.boatRegNumber ? {
        ...v,
        speed: locData.speed,
        distanceFromShore: locData.distanceFromShore,
        course: locData.course,
        lastUpdated: locData.lastUpdate || 'Just now'
      } : v));
    };

    socketService.on('location:update', handleLocationUpdate);
    return () => {
      socketService.off('location:update', handleLocationUpdate);
    };
  }, []);

  if (loading) {
    return <Loader text="Connecting to Satellite GPS Transponder..." />;
  }

  const selectedVessel = vessels.find(v => v.id === selectedVesselId) || vessels[0];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/family" className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-xl font-black text-slate-900">Live Tracking</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Vessel Selector Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">Tracked Vessels</h3>

          {vessels.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVesselId(v.id)}
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                selectedVesselId === v.id ? 'bg-blue-50/80 border-blue-200' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <strong className="text-slate-900 font-bold text-xs block">{v.vessel} ({v.name})</strong>
                <span className="text-[11px] text-slate-500 font-mono">{v.boatRegNumber}</span>
              </div>
              <span className={`px-2 py-0.5 font-bold text-[10px] rounded-full border ${
                v.status === 'On Trip' ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-blue-50 text-blue-600 border-blue-300'
              }`}>
                {v.status}
              </span>
            </div>
          ))}
        </div>

        {/* Map View & Telemetry Card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
            <Map title={`Live Transponder Track — ${selectedVessel?.vessel || 'Sea Queen'}`} />
          </div>

          {/* Bottom Telemetry Card */}
          {selectedVessel && (
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{selectedVessel.vessel} ({selectedVessel.name})</h3>
                  <span className="text-[11px] text-slate-500 font-mono">{selectedVessel.boatRegNumber}</span>
                </div>
                <span className={`px-2.5 py-0.5 font-extrabold text-xs rounded-full border ${
                  selectedVessel.status === 'On Trip' ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-blue-50 text-blue-600 border-blue-300'
                }`}>
                  ● {selectedVessel.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Speed</span>
                  <strong className="text-slate-900 font-black text-sm font-mono">{selectedVessel.speed || '12.4 km/h'}</strong>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block">Distance from Shore</span>
                  <strong className="text-slate-900 font-black text-sm font-mono">{selectedVessel.distanceFromShore || '18.6 km'}</strong>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block">Course</span>
                  <strong className="text-slate-900 font-black text-sm font-mono">{selectedVessel.course || '128° SE'}</strong>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block">Last Update</span>
                  <strong className="text-slate-900 font-black text-sm font-mono">{selectedVessel.lastUpdated || '2 min ago'}</strong>
                </div>
              </div>

              <Link
                to="/family/history"
                className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xs shadow-blue-600/30 flex items-center justify-center transition block text-center"
              >
                View Trip Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
