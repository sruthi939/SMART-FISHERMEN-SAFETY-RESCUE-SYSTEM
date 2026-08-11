import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Anchor, Heart, Building2, Radio, Compass, Fuel, 
  Battery, AlertTriangle, MapPin, Users, Wind, Waves, CheckCircle2, 
  LifeBuoy, PhoneCall, Clock, Navigation, Plus, FileCheck, IndianRupee, 
  RefreshCw, Camera, Mic, Cpu, Lock, ShieldCheck, Zap, Crosshair
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';

const boatIcon = new L.DivIcon({
  className: 'custom-boat-marker',
  html: `<div style="background-color: #0284c7; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px #0284c7; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M12 2v8"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

const emergencyMarker = new L.DivIcon({
  className: 'custom-sos-marker',
  html: `<div style="background-color: #ef4444; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 20px #ef4444; animation: pulse 1s infinite;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>`,
  iconSize: [34, 34]
});

const droneIcon = new L.DivIcon({
  className: 'custom-drone-marker',
  html: `<div style="background-color: #a855f7; color: white; padding: 5px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 15px #a855f7;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/></svg></div>`,
  iconSize: [32, 32]
});

const rescueUnitIcon = new L.DivIcon({
  className: 'custom-rescue-marker',
  html: `<div style="background-color: #10b981; color: white; padding: 5px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 12px #10b981;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>`,
  iconSize: [30, 30]
});

export default function SmartFishermenApp() {
  const [activeRole, setActiveRole] = useState('fisherman');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic Backend State
  const [boat, setBoat] = useState(null);
  const [allBoats, setAllBoats] = useState([]);
  const [crew, setCrew] = useState([]);
  const [weather, setWeather] = useState(null);
  const [emergencies, setEmergencies] = useState([]);
  const [rescueUnits, setRescueUnits] = useState([]);
  const [adminSummary, setAdminSummary] = useState(null);
  const [imblWarning, setImblWarning] = useState(null);

  // SOS & Voice state
  const [sosHolding, setSosHolding] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');

  // Drone Modal State
  const [showDroneHUD, setShowDroneHUD] = useState(false);
  const [dronePayloadDropped, setDronePayloadDropped] = useState(false);

  // Admin Registration Modal State
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', registrationNumber: '', boatType: 'Deep Sea Trawler', homePort: 'Kochi Harbor' });

  // Fetch initial backend data
  const fetchAllData = () => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/boats/b-102`)
      .then(res => res.json())
      .then(data => {
        if (data.boat) setBoat(data.boat);
        if (data.crew) setCrew(data.crew);
        if (data.activeEmergency) setSosActive(true);
      })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/boats`)
      .then(res => res.json())
      .then(data => { if (data.boats) setAllBoats(data.boats); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/weather`)
      .then(res => res.json())
      .then(data => { if (data) setWeather(data); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/emergency`)
      .then(res => res.json())
      .then(data => { if (data.emergencies) setEmergencies(data.emergencies); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/rescue/units`)
      .then(res => res.json())
      .then(data => { if (data.rescueUnits) setRescueUnits(data.rescueUnits); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/admin/dashboard`)
      .then(res => res.json())
      .then(data => {
        if (data.summary) setAdminSummary(data.summary);
        if (data.boats) setAllBoats(data.boats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllData();
    const socket = io(BACKEND_URL);

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('boat:telemetry', (data) => {
      if (data.boat) {
        setAllBoats(prev => prev.map(b => b.id === data.boat.id ? { ...b, ...data.boat } : b));
        if (data.boat.id === 'b-102') setBoat(prev => prev ? { ...prev, ...data.boat } : data.boat);
      }
      // Check IMBL boundary distance
      if (data.boat && data.boat.latitude) {
        const distToBorder = Math.abs(data.boat.latitude - 9.7500) * 60; // NM
        if (distToBorder < 8.0) {
          setImblWarning(`WARNING: Vessel is ${distToBorder.toFixed(1)} NM from International Maritime Boundary (IMBL 9.75° N)!`);
        } else {
          setImblWarning(null);
        }
      }
    });

    socket.on('emergency:sos', (data) => {
      if (data.emergency) {
        setEmergencies(prev => [data.emergency, ...prev]);
        if (data.boat && data.boat.id === boat?.id) setSosActive(true);
      }
    });

    socket.on('wearable:mob', (data) => {
      if (data.emergency) setEmergencies(prev => [data.emergency, ...prev]);
      if (data.crewMember) setCrew(prev => prev.map(c => c.id === data.crewMember.id ? { ...c, status: 'OVERBOARD' } : c));
    });

    socket.on('rescue:update', (data) => {
      if (data.emergency) setEmergencies(prev => prev.map(e => e.id === data.emergency.id ? data.emergency : e));
    });

    return () => socket.close();
  }, []);

  // 3-Sec SOS Hold
  useEffect(() => {
    let timer;
    if (sosHolding && sosProgress < 100) {
      timer = setInterval(() => {
        setSosProgress(prev => {
          if (prev >= 95) {
            triggerSOS();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else if (!sosHolding && sosProgress < 100) {
      setSosProgress(0);
    }
    return () => clearInterval(timer);
  }, [sosHolding, sosProgress]);

  const triggerSOS = (voiceLang = null) => {
    if (!boat) return;
    setSosActive(true);
    setSosProgress(100);
    const desc = voiceLang 
      ? `Voice-Activated SOS distress trigger in ${voiceLang} aboard ${boat.name} (${boat.registrationNumber}).`
      : `Mayday SOS button pressed aboard ${boat.name} (${boat.registrationNumber}).`;

    fetch(`${BACKEND_URL}/api/emergency/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boatId: boat.id, latitude: boat.latitude, longitude: boat.longitude, description: desc })
    })
    .then(res => res.json())
    .then(data => { if (data.emergency) setEmergencies(prev => [data.emergency, ...prev]); });
  };

  const triggerMOB = (crewId) => {
    if (!boat) return;
    const targetCrew = crew.find(c => c.id === crewId) || crew[0];
    fetch(`${BACKEND_URL}/api/emergency/mob`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wearableId: targetCrew.wearableId || 'wb-002',
        fishermanId: targetCrew.fishermanId || 'u-fish-02',
        boatId: boat.id,
        latitude: boat.latitude,
        longitude: boat.longitude
      })
    })
    .then(res => res.json())
    .then(data => {
      setCrew(prev => prev.map(c => c.id === crewId ? { ...c, status: 'OVERBOARD' } : c));
      if (data.emergency) setEmergencies(prev => [data.emergency, ...prev]);
    });
  };

  const handleDispatch = (emergencyId, unitType = 'PATROL') => {
    fetch(`${BACKEND_URL}/api/rescue/dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emergencyId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.result && data.result.emergency) {
        setEmergencies(prev => prev.map(e => e.id === emergencyId ? data.result.emergency : e));
      }
      if (unitType === 'DRONE') setShowDroneHUD(true);
    });
  };

  const handleResolve = (emergencyId) => {
    fetch(`${BACKEND_URL}/api/emergency/${emergencyId}/resolve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolutionNotes: 'Victim safely recovered by Coast Guard Patrol Vessel & SAR Drone.' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.emergency) setEmergencies(prev => prev.map(e => e.id === emergencyId ? data.emergency : e));
    });
  };

  const handleRegisterBoat = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/api/admin/register-boat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regForm)
    })
    .then(res => res.json())
    .then(data => {
      if (data.boat) {
        setAllBoats(prev => [...prev, data.boat]);
        setShowRegModal(false);
        setRegForm({ name: '', registrationNumber: '', boatType: 'Deep Sea Trawler', homePort: 'Kochi Harbor' });
      }
    });
  };

  // AI MOB Drift Coordinates (+1h, +2h, +3h)
  const mobIncident = emergencies.find(e => e.emergencyType === 'MAN_OVERBOARD' && e.status !== 'RESCUED');
  const mobLat = mobIncident ? mobIncident.latitude : 9.8540;
  const mobLon = mobIncident ? mobIncident.longitude : 76.1200;
  const driftPoints = [
    [mobLat, mobLon],
    [mobLat - 0.015, mobLon - 0.025], // +1h Drift
    [mobLat - 0.030, mobLon - 0.050], // +2h Drift
    [mobLat - 0.045, mobLon - 0.075]  // +3h Drift
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Application Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wider uppercase flex items-center space-x-2">
              <span>SMART FISHERMEN SAFETY SYSTEM (SFSRS)</span>
              <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/30">v2.0 NEXT-GEN</span>
            </h1>
            <p className="text-[11px] text-slate-400">Autonomous SAR Drones • AI MOB Drift Trajectory • LoRa Mesh Relay • Blockchain Audit</p>
          </div>
        </div>

        {/* Role Portal Switcher */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button onClick={() => setActiveRole('fisherman')} className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${activeRole === 'fisherman' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
            <Anchor className="w-3.5 h-3.5" />
            <span>Fisherman App</span>
          </button>
          <button onClick={() => setActiveRole('family')} className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${activeRole === 'family' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
            <Heart className="w-3.5 h-3.5" />
            <span>Family Portal</span>
          </button>
          <button onClick={() => setActiveRole('rescue')} className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${activeRole === 'rescue' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Coast Guard Command</span>
          </button>
          <button onClick={() => setActiveRole('admin')} className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${activeRole === 'admin' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
            <Building2 className="w-3.5 h-3.5" />
            <span>Govt Admin</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button onClick={fetchAllData} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition" title="Refresh API Data"><RefreshCw className="w-3.5 h-3.5" /></button>
          <span className="flex items-center space-x-1.5"><Radio className={`w-3.5 h-3.5 ${connected ? 'text-emerald-400' : 'text-red-400'}`} /><span className="text-slate-300 font-semibold">{connected ? 'API / SOCKET LIVE' : 'CONNECTING...'}</span></span>
        </div>
      </header>

      {/* IMBL Boundary Alert Banner if Near Border */}
      {imblWarning && (
        <div className="bg-amber-600 text-slate-950 px-6 py-2 font-bold flex items-center justify-between text-xs animate-pulse">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{imblWarning}</span>
          </div>
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded font-black text-[10px]">IMBL GEOFENCE WARNING</span>
        </div>
      )}

      {/* SOS Active Banner */}
      {sosActive && (
        <div className="bg-red-600 text-white px-6 py-2.5 font-bold flex items-center justify-between animate-pulse text-xs">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5" />
            <span>MAYDAY SOS EMERGENCY BROADCAST LIVE TO COAST GUARD & FAMILY APP</span>
          </div>
          <button onClick={() => setSosActive(false)} className="bg-white text-red-700 px-3 py-1 rounded-lg font-bold">Dismiss Alert</button>
        </div>
      )}

      {/* Dynamic Role Views */}
      <div className="max-w-7xl w-full mx-auto p-6 flex-1">

        {loading && !boat ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold">Connecting to Live Backend API Server (http://localhost:5000)...</p>
          </div>
        ) : (
          <>
            {/* 1. FISHERMAN PORTAL VIEW */}
            {activeRole === 'fisherman' && boat && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Boat Header & SOS */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Anchor className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-extrabold text-white">{boat.name}</h2>
                        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold">{boat.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Reg: <strong>{boat.registrationNumber}</strong> | Pos: ({boat.latitude?.toFixed(4)}° N, {boat.longitude?.toFixed(4)}° E)</p>
                      <div className="flex items-center space-x-3 text-xs text-cyan-300 mt-1">
                        <span>Speed: <strong>{boat.speedKnots} kn</strong></span>
                        <span>•</span>
                        <span className="flex items-center space-x-1 text-amber-400 font-bold">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Signal: {boat.signalType || 'LORA_MESH_RELAY'} [Via KL-07-FISH-105]</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onMouseDown={() => setSosHolding(true)}
                      onMouseUp={() => setSosHolding(false)}
                      onTouchStart={() => setSosHolding(true)}
                      onTouchEnd={() => setSosHolding(false)}
                      className="relative overflow-hidden px-6 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-900/40"
                    >
                      <div className="absolute left-0 top-0 bottom-0 bg-red-800/80 transition-all duration-75" style={{ width: `${sosProgress}%` }} />
                      <span className="relative z-10 flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4" />
                        <span>{sosHolding ? `HOLDING (${Math.round(sosProgress)}%)` : 'HOLD 3S FOR SOS'}</span>
                      </span>
                    </button>
                  </div>

                  {/* Multilingual Voice-Activated SOS Buttons */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Mic className="w-4 h-4 text-cyan-400" />
                      <span>Multilingual Hands-Free Voice SOS Activation</span>
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { code: 'EN', label: 'English Voice SOS' },
                        { code: 'ML', label: 'മലയാളം (Malayalam)' },
                        { code: 'TA', label: 'தமிழ் (Tamil)' },
                        { code: 'TE', label: 'తెలుగు (Telugu)' },
                        { code: 'HI', label: 'हिंदी (Hindi)' }
                      ].map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => triggerSOS(lang.label)}
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
                        >
                          <Mic className="w-3 h-3 text-red-400" />
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Navigation & IMBL Boundary Map */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[380px] relative overflow-hidden shadow-xl">
                    <MapContainer center={[boat.latitude || 9.9312, boat.longitude || 76.2673]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                      <TileLayer attribution='&copy; OpenStreetMap & SFSRS' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      
                      <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={boatIcon}>
                        <Popup><strong className="font-bold">{boat.name}</strong><br />Speed: {boat.speedKnots} kn</Popup>
                      </Marker>

                      {/* International Maritime Boundary Line (IMBL 9.75° N) */}
                      <Polyline
                        positions={[[9.7500, 75.8000], [9.7500, 76.6000]]}
                        pathOptions={{ color: '#ef4444', weight: 3, dashArray: '6, 12' }}
                      />

                      <Circle center={[9.9312, 76.2673]} radius={25000} pathOptions={{ color: '#0284c7', fillColor: '#0284c7', fillOpacity: 0.08, dashArray: '5, 10' }} />
                    </MapContainer>

                    <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-xs backdrop-blur-md z-[1000] space-y-1">
                      <span className="text-red-400 font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Red Line: IMBL Border (9.75° N)</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => triggerMOB('c-02')} className="bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 p-3.5 rounded-xl flex items-center space-x-2 font-bold text-xs transition">
                      <LifeBuoy className="w-4 h-4 text-amber-400" />
                      <span>Simulate Man-Overboard (MOB)</span>
                    </button>
                  </div>

                </div>

                {/* Right Telemetry Column */}
                <div className="space-y-6">
                  
                  {/* Weather Risk */}
                  {weather && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-slate-400">AI Weather Risk Advisory</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {weather.weather?.riskLevel || weather.riskAnalysis?.riskLevel || 'SAFE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{weather.weather?.advisory || weather.riskAnalysis?.advisory}</p>
                    </div>
                  )}

                  {/* Sensors */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-bold uppercase text-slate-400">Live ESP32 & Gyro Telemetry</span>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Diesel Fuel Level</span>
                        <span className="font-bold text-white">{boat.fuelPct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${boat.fuelPct > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${boat.fuelPct}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">Battery Voltage</span><span className="font-bold text-emerald-400">{boat.batteryV} V</span></div>
                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">Bilge Water Sensor</span><span className={`font-bold ${boat.waterLeak ? 'text-red-400' : 'text-slate-300'}`}>{boat.waterLeak ? 'WATER DETECTED' : 'DRY (NORMAL)'}</span></div>
                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">MPU6050 Gyro Roll Angle</span><span className="font-bold text-white">{boat.tiltAngle}° (STABLE)</span></div>
                  </div>

                  {/* Crew */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Onboard Crew Manifest</span>
                    {crew.map(c => (
                      <div key={c.id} className="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{c.name}</p>
                          <p className="text-[10px] text-slate-400">Beacon: {c.wearableId || 'wb-001'}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'OVERBOARD' ? 'bg-red-600 text-white' : 'bg-emerald-500/20 text-emerald-300'}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 2. FAMILY PORTAL VIEW */}
            {activeRole === 'family' && boat && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Captain Ramesh" className="w-16 h-16 rounded-full border-2 border-emerald-400 object-cover" />
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Ramesh Kumar (Captain)</h3>
                      <p className="text-xs text-slate-400">Vessel: {boat.name} ({boat.registrationNumber})</p>
                      <p className="text-xs text-emerald-400 font-bold mt-1">Status: SAFE AT SEA • LoRa Mesh Syncing</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-400 block text-[10px]">ESTIMATED RETURN (ETA)</span>
                    <span className="text-base font-extrabold text-emerald-400">6:30 PM Today (4.2 hrs away)</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[420px] relative overflow-hidden shadow-xl">
                  <MapContainer center={[boat.latitude || 9.9312, boat.longitude || 76.2673]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                    <TileLayer attribution='&copy; OpenStreetMap & SFSRS' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={boatIcon}>
                      <Popup><strong className="font-bold">{boat.name}</strong></Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            {/* 3. COAST GUARD RESCUE VIEW WITH AI DRIFT TRAJECTORY & SAR DRONE */}
            {activeRole === 'rescue' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Tactical Operations & AI Drift Trajectory Map */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[460px] relative overflow-hidden shadow-xl">
                    <MapContainer center={[9.8800, 76.1500]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                      <TileLayer attribution='&copy; Coast Guard MROC' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      
                      {/* Active Boats */}
                      {allBoats.map(b => (
                        <Marker key={b.id} position={[b.latitude || 9.9312, b.longitude || 76.2673]} icon={boatIcon}>
                          <Popup><strong className="font-bold">{b.name}</strong> ({b.registrationNumber})</Popup>
                        </Marker>
                      ))}

                      {/* Active Emergencies */}
                      {emergencies.map(e => (
                        <Marker key={e.id} position={[e.latitude, e.longitude]} icon={emergencyMarker}>
                          <Popup><strong className="font-bold text-red-600">{e.emergencyType}</strong><br />{e.description}</Popup>
                        </Marker>
                      ))}

                      {/* Autonomous SAR Drone */}
                      <Marker position={[9.8750, 76.1400]} icon={droneIcon}>
                        <Popup><strong className="font-bold text-purple-400">CG-Drone-Alpha (Thermal IR SAR Drone)</strong><br />Altitude: 120m • Camera: Thermal FLIR</Popup>
                      </Marker>

                      {/* Coast Guard Patrol Vessels */}
                      {rescueUnits.map(ru => (
                        <Marker key={ru.id} position={[ru.latitude, ru.longitude]} icon={rescueUnitIcon}>
                          <Popup><strong className="font-bold text-emerald-600">{ru.unitName}</strong></Popup>
                        </Marker>
                      ))}

                      {/* AI MOB Drift Trajectory Vectors (+1h, +2h, +3h) */}
                      <Polyline
                        positions={driftPoints}
                        pathOptions={{ color: '#f59e0b', weight: 4, dashArray: '4, 8' }}
                      />
                      
                      {/* Expanding AI Search Radius Circles */}
                      <Circle center={driftPoints[1]} radius={500} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.15 }} />
                      <Circle center={driftPoints[2]} radius={900} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.10 }} />
                      <Circle center={driftPoints[3]} radius={1300} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.08 }} />
                    </MapContainer>

                    {/* AI Drift Trajectory Overlay Box */}
                    <div className="absolute top-4 right-4 bg-slate-900/90 border border-amber-500/40 p-3 rounded-xl backdrop-blur-md z-[1000] text-xs space-y-1 shadow-xl">
                      <span className="font-bold text-amber-400 flex items-center space-x-1">
                        <Crosshair className="w-4 h-4" />
                        <span>AI MOB Drift Trajectory Radar</span>
                      </span>
                      <p className="text-[11px] text-slate-300">Sea Current: <strong>1.8 knots @ 225° SW</strong></p>
                      <p className="text-[11px] text-slate-300">+1h Projected: ({driftPoints[1][0].toFixed(4)}, {driftPoints[1][1].toFixed(4)})</p>
                      <p className="text-[11px] text-slate-300">+3h Projected: ({driftPoints[3][0].toFixed(4)}, {driftPoints[3][1].toFixed(4)})</p>
                    </div>
                  </div>

                  {/* SAR Drone Quick Action */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">Autonomous SAR Drone (CG-Drone-Alpha)</h4>
                        <p className="text-xs text-slate-400">FLIR Thermal Night-Vision Camera • Payload Lifebuoy Drop Ready</p>
                      </div>
                    </div>
                    <button onClick={() => setShowDroneHUD(true)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-purple-900/40 flex items-center space-x-1.5">
                      <Camera className="w-4 h-4" />
                      <span>Open Thermal IR HUD Feed</span>
                    </button>
                  </div>

                </div>

                {/* Emergency Incident Queue */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase text-slate-400">Active Distress Incident Queue</h3>
                  <div className="space-y-3 overflow-y-auto max-h-[520px] pr-1">
                    {emergencies.map(e => (
                      <div key={e.id} className={`p-4 rounded-2xl border ${e.status === 'RESCUED' ? 'bg-slate-900/60 border-slate-800' : 'bg-red-950/40 border-red-500/50'}`}>
                        <div className="flex justify-between items-start">
                          <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black uppercase text-[10px]">{e.emergencyType}</span>
                          <span className="text-[10px] text-slate-400">Live</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5">{e.boatName || 'Sea Falcon'} ({e.registrationNumber || 'KL-07-FISH-102'})</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{e.description}</p>

                        <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                          <span className="text-[11px] text-slate-400">Unit: <strong className="text-cyan-300">{e.assignedRescueUnit || 'Unassigned'}</strong></span>
                          {e.status !== 'RESCUED' ? (
                            <div className="flex space-x-1.5">
                              <button onClick={() => handleDispatch(e.id, 'DRONE')} className="bg-purple-600 text-white px-2.5 py-1 rounded font-bold text-[10px]">Dispatch Drone</button>
                              <button onClick={() => handleDispatch(e.id, 'PATROL')} className="bg-emerald-600 text-white px-2.5 py-1 rounded font-bold text-[10px]">Patrol Boat</button>
                              <button onClick={() => handleResolve(e.id)} className="bg-blue-600 text-white px-2.5 py-1 rounded font-bold text-[10px]">Rescued</button>
                            </div>
                          ) : (
                            <span className="text-emerald-400 font-bold text-[11px]">RESCUED</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 4. GOVT ADMIN VIEW WITH BLOCKCHAIN AUDIT LEDGER */}
            {activeRole === 'admin' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">TOTAL REGISTERED FLEET</span>
                    <p className="text-2xl font-extrabold text-white mt-1">{adminSummary?.totalBoats || allBoats.length} Vessels</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">REGISTERED FISHERMEN</span>
                    <p className="text-2xl font-extrabold text-white mt-1">{adminSummary?.totalFishermen || 4890} Crewmen</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">FUEL SUBSIDY DISBURSED</span>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹{((adminSummary?.totalSubsidiesDisbursedINR || 6425000) / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">BLOCKCHAIN AUDIT VERIFIED</span>
                    <p className="text-2xl font-extrabold text-purple-400 mt-1">100% SHA-256</p>
                  </div>
                </div>

                {/* Vessel Registry with Blockchain Hashes */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <span>State Vessel Registry & Blockchain Audit Trail</span>
                    </h3>
                    <button onClick={() => setShowRegModal(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register New Boat</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-4">Reg Number</th>
                          <th className="p-4">Vessel Name</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Home Port</th>
                          <th className="p-4">License Status</th>
                          <th className="p-4">Cryptographic Blockchain Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {allBoats.map(b => (
                          <tr key={b.id} className="hover:bg-slate-800/40 transition">
                            <td className="p-4 font-bold text-white">{b.registrationNumber}</td>
                            <td className="p-4 font-semibold text-cyan-300">{b.name}</td>
                            <td className="p-4">{b.boatType || 'Deep Sea Trawler'}</td>
                            <td className="p-4">{b.homePort}</td>
                            <td className="p-4">
                              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">ACTIVE</span>
                            </td>
                            <td className="p-4">
                              <span className="font-mono text-[10px] bg-slate-950 px-2 py-1 rounded border border-purple-500/30 text-purple-300 flex items-center space-x-1">
                                <ShieldCheck className="w-3 h-3 text-purple-400 flex-shrink-0" />
                                <span>0x8f23a9b1c74d8120e3a...</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </>
        )}

      </div>

      {/* Autonomous Thermal IR SAR Drone Camera HUD Modal */}
      {showDroneHUD && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4">
            <div className="bg-purple-950/80 p-4 border-b border-purple-500/30 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-purple-400 animate-pulse" />
                <h3 className="font-extrabold text-sm text-white">CG-Drone-Alpha (Autonomous Thermal IR SAR Live Camera Feed)</h3>
              </div>
              <button onClick={() => setShowDroneHUD(false)} className="text-slate-400 hover:text-white font-bold text-xs">Close Feed</button>
            </div>

            <div className="p-4 space-y-4">
              {/* Thermal View Container */}
              <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-purple-500/40 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800" alt="Drone FLIR View" className="w-full h-full object-cover filter contrast-200 hue-rotate-180 brightness-75" />
                <div className="absolute inset-0 border-2 border-purple-500/30 pointer-events-none flex items-center justify-center">
                  <div className="w-32 h-32 border border-red-500/70 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded text-[10px] font-mono text-purple-300 border border-purple-500/30">
                  FLIR THERMAL IR ACTIVE • ALT: 120M • LAT: 9.8540° N
                </div>
                {dronePayloadDropped && (
                  <div className="absolute bottom-3 bg-emerald-600 text-white px-3 py-1 rounded text-xs font-bold animate-bounce shadow-lg">
                    LIFEBUOY PAYLOAD RELEASED AT VICTIM COORDINATES
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-slate-300 space-y-0.5">
                  <p>Battery: <strong className="text-emerald-400">88%</strong> | Ground Speed: <strong>42 knots</strong></p>
                  <p className="text-[11px] text-slate-400">Thermal Heat Signature Detected 240m South-West</p>
                </div>
                <button
                  onClick={() => setDronePayloadDropped(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-purple-900/40"
                >
                  Drop Lifebuoy Flotation Payload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-white">Register New Fishing Vessel</h3>
            <form onSubmit={handleRegisterBoat} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Vessel Name</label>
                <input type="text" required value={regForm.name} onChange={e => setRegForm({ ...regForm, name: e.target.value })} placeholder="e.g. Sea Falcon" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Registration Number</label>
                <input type="text" required value={regForm.registrationNumber} onChange={e => setRegForm({ ...regForm, registrationNumber: e.target.value })} placeholder="e.g. KL-07-FISH-200" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Home Port</label>
                <input type="text" required value={regForm.homePort} onChange={e => setRegForm({ ...regForm, homePort: e.target.value })} placeholder="e.g. Kochi Harbor" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowRegModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl">Register Vessel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
