import React, { useState, useEffect } from 'react';
import { 
  Heart, Anchor, MapPin, Clock, ShieldCheck, ShieldAlert, 
  Phone, Users, Radio, Navigation, AlertOctagon, CheckCircle2, LifeBuoy
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';

const familyBoatIcon = new L.DivIcon({
  className: 'custom-family-boat',
  html: `<div style="background-color: #10b981; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px #10b981; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M12 2v8"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

export default function FamilyApp() {
  const [boat, setBoat] = useState({
    name: 'Sea Falcon',
    registrationNumber: 'KL-07-FISH-102',
    latitude: 9.9312,
    longitude: 76.2673,
    speedKnots: 8.4,
    fuelPct: 78,
    status: 'AT_SEA',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [fisherman, setFisherman] = useState({
    name: 'Ramesh Kumar',
    role: 'Captain',
    wearableId: 'wb-001',
    battery: 94,
    status: 'SAFE_ON_BOARD'
  });

  const [emergency, setEmergency] = useState(null);
  const [etaHours, setEtaHours] = useState('4.2 hours (approx 6:30 PM)');

  useEffect(() => {
    const socket = io(BACKEND_URL);

    socket.on('boat:telemetry', (data) => {
      if (data.boat && data.boat.id === 'b-102') {
        setBoat(prev => ({
          ...prev,
          latitude: data.boat.latitude,
          longitude: data.boat.longitude,
          speedKnots: data.boat.speedKnots,
          fuelPct: data.boat.fuelPct,
          lastUpdated: new Date().toLocaleTimeString()
        }));
      }
    });

    socket.on('emergency:sos', (data) => {
      setEmergency(data.emergency);
    });

    socket.on('wearable:mob', (data) => {
      setEmergency(data.emergency);
    });

    fetch(`${BACKEND_URL}/api/boats/b-102`)
      .then(res => res.json())
      .then(data => {
        if (data.boat) setBoat(data.boat);
        if (data.activeEmergency) setEmergency(data.activeEmergency);
      })
      .catch(() => {});

    return () => socket.close();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Heart className="w-5 h-5 fill-emerald-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide">FAMILY SAFETY PORTAL</h1>
            <p className="text-[10px] text-slate-400">Tracking Captain Ramesh Kumar & Crew</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">LIVE TELEMETRY FEED</span>
        </div>
      </header>

      {/* SOS Emergency Banner if Active */}
      {emergency && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse shadow-xl">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 flex-shrink-0" />
            <div>
              <span className="bg-white text-red-700 px-2 py-0.5 rounded text-[10px] uppercase font-black">EMERGENCY ALERT BROADCAST</span>
              <p className="text-sm font-extrabold mt-0.5">{emergency.description}</p>
              <p className="text-xs text-red-100 font-normal">Coast Guard Rescue Asset Assigned: <strong>{emergency.assignedRescueUnit || 'Fast Patrol Vessel CG-Kochi-1'}</strong></p>
            </div>
          </div>
          <a 
            href="tel:1554" 
            className="bg-white text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call Coast Guard (1554)</span>
          </a>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-5xl w-full mx-auto p-4 space-y-6 flex-1">

        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Fisherman Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" 
              alt="Ramesh Kumar" 
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
            />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">TRACKED FISHERMAN</span>
              <h2 className="text-base font-extrabold text-white">{fisherman.name}</h2>
              <span className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-semibold mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Wearable Beacon Active</span>
              </span>
            </div>
          </div>

          {/* Boat & ETA Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Anchor className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vessel Info</span>
            </span>
            <div className="my-1">
              <p className="text-base font-extrabold text-white">{boat.name}</p>
              <p className="text-xs text-slate-400">{boat.registrationNumber}</p>
            </div>
            <div className="text-xs text-cyan-300 font-semibold flex items-center space-x-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>Speed: {boat.speedKnots} knots</span>
            </div>
          </div>

          {/* Return ETA Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Estimated Return (ETA)</span>
            </span>
            <div className="my-1">
              <p className="text-base font-extrabold text-emerald-400">{etaHours}</p>
              <p className="text-xs text-slate-400">Destination: Kochi Harbor</p>
            </div>
            <span className="text-[10px] text-slate-500">Updated: {boat.lastUpdated}</span>
          </div>

        </div>

        {/* Live Radar & Map View */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[420px] relative overflow-hidden shadow-2xl">
          <MapContainer 
            center={[boat.latitude || 9.9312, boat.longitude || 76.2673]} 
            zoom={11} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap & SFSRS Maritime'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={familyBoatIcon}>
              <Popup>
                <div className="text-slate-900 p-1">
                  <strong className="font-bold">{boat.name}</strong>
                  <p className="text-xs">Location: ({boat.latitude?.toFixed(4)}, {boat.longitude?.toFixed(4)})</p>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">Status: Safe at Sea</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[9.9312, 76.2673]}
              radius={20000}
              pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1 }}
            />
          </MapContainer>

          <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md z-[1000] text-xs space-y-1">
            <span className="font-bold text-white block">GPS Live Tracking Radar</span>
            <p className="text-[11px] text-slate-400">14.2 Nautical Miles offshore</p>
          </div>
        </div>

        {/* Quick Contact & Rescue Support Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a 
            href="tel:+919876543210"
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 p-4 rounded-xl flex items-center justify-center space-x-3 text-cyan-400 font-bold text-xs transition"
          >
            <Phone className="w-4 h-4" />
            <span>Call Captain Ramesh</span>
          </a>

          <a 
            href="tel:1554"
            className="bg-slate-900 hover:bg-slate-800 border border-red-500/30 p-4 rounded-xl flex items-center justify-center space-x-3 text-red-400 font-bold text-xs transition"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Coast Guard Rescue Helpline (1554)</span>
          </a>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-center space-x-3 text-slate-300 text-xs font-bold">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Satellite Sync: Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
