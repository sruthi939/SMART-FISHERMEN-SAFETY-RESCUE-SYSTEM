import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Radio, Compass, Fuel, Battery, AlertTriangle, 
  MapPin, Anchor, Users, CloudRain, Wind, Waves, CheckCircle2,
  PhoneCall, ExternalLink, LifeBuoy
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';

const boatIcon = new L.DivIcon({
  className: 'custom-boat-marker',
  html: `<div style="background-color: #0284c7; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px #0284c7; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M12 2v8"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

export default function FishermanApp() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [boat, setBoat] = useState({
    id: 'b-102',
    registrationNumber: 'KL-07-FISH-102',
    name: 'Sea Falcon',
    latitude: 9.9312,
    longitude: 76.2673,
    speedKnots: 8.4,
    headingDeg: 240,
    fuelPct: 78,
    batteryV: 13.2,
    waterLeak: false,
    tiltAngle: 3.5,
    status: 'AT_SEA'
  });

  const [crew, setCrew] = useState([
    { id: 'c-01', name: 'Ramesh Kumar (Captain)', role: 'CAPTAIN', wearableId: 'wb-001', status: 'ON_BOARD', battery: 94 },
    { id: 'c-02', name: 'Vijay Crewman', role: 'DECKHAND', wearableId: 'wb-002', status: 'ON_BOARD', battery: 88 }
  ]);

  const [weather, setWeather] = useState({
    windSpeedKnots: 18.5,
    waveHeightM: 2.1,
    seaCurrentKnots: 1.2,
    riskLevel: 'MODERATE_RISK',
    advisory: 'Moderate sea swell. Maintain continuous telemetry link.'
  });

  const [sosHolding, setSosHolding] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const [activeTab, setActiveTab] = useState('navigation');

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => setConnected(true));
    newSocket.on('disconnect', () => setConnected(false));

    newSocket.on('boat:telemetry', (data) => {
      if (data.boat && data.boat.id === 'b-102') {
        setBoat(prev => ({ ...prev, ...data.boat }));
      }
      if (data.riskAnalysis) {
        setWeather(prev => ({ ...prev, riskLevel: data.riskAnalysis.riskLevel, advisory: data.riskAnalysis.advisory }));
      }
    });

    newSocket.on('emergency:sos', (data) => {
      if (data.boat && data.boat.id === 'b-102') {
        setSosActive(true);
      }
    });

    fetch(`${BACKEND_URL}/api/boats/b-102`)
      .then(res => res.json())
      .then(data => {
        if (data.boat) setBoat(data.boat);
        if (data.crew) setCrew(data.crew);
        if (data.activeEmergency) setSosActive(true);
      })
      .catch(() => {});

    return () => newSocket.close();
  }, []);

  // Handle 3-second hold to trigger SOS
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

  const triggerSOS = () => {
    setSosActive(true);
    setSosProgress(100);
    fetch(`${BACKEND_URL}/api/emergency/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boatId: boat.id,
        latitude: boat.latitude,
        longitude: boat.longitude,
        description: 'Captain pressed 3-second hold SOS distress button on Fisherman App.'
      })
    }).catch(err => console.error(err));
  };

  const triggerMOB = (crewId) => {
    fetch(`${BACKEND_URL}/api/emergency/mob`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wearableId: 'wb-002',
        fishermanId: 'u-fish-02',
        boatId: boat.id,
        latitude: boat.latitude,
        longitude: boat.longitude
      })
    }).then(() => {
      setCrew(prev => prev.map(c => c.id === crewId ? { ...c, status: 'OVERBOARD' } : c));
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Universal Portal Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold text-cyan-400 tracking-wider uppercase text-sm">SFSRS Maritime Safety</span>
          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">FISHERMAN APP v1.0</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-400">
          <span className="flex items-center space-x-1">
            <Radio className={`w-3.5 h-3.5 ${connected ? 'text-emerald-400' : 'text-red-400'}`} />
            <span>{connected ? 'LTE / SATELLITE ONLINE' : 'OFFLINE'}</span>
          </span>
          <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Boat: <strong className="text-white">{boat.registrationNumber}</strong></span>
        </div>
      </header>

      {/* Emergency Active Alert Banner */}
      {sosActive && (
        <div className="bg-red-600 text-white px-4 py-3 font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-7 h-7" />
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">MAYDAY / SOS EMERGENCY ACTIVE</p>
              <p className="text-xs text-red-100 font-normal">Distress coordinates & boat telemetry live-streaming to Coast Guard Command & Family App.</p>
            </div>
          </div>
          <button 
            onClick={() => setSosActive(false)}
            className="bg-white text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50"
          >
            Cancel Alert
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left & Center Columns: Map & Navigation Controls */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          
          {/* Header Boat Info & SOS Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <Anchor className="w-6 h-6 text-cyan-400" />
                <h1 className="text-xl font-extrabold text-white tracking-tight">{boat.name}</h1>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/30">
                  {boat.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                <span>Lat: {boat.latitude?.toFixed(4)}° N, Lon: {boat.longitude?.toFixed(4)}° E</span>
                <span>•</span>
                <span>Speed: <strong className="text-cyan-300">{boat.speedKnots} knots</strong></span>
              </p>
            </div>

            {/* Hold-to-SOS Emergency Trigger */}
            <div className="flex flex-col items-center">
              <button
                onMouseDown={() => setSosHolding(true)}
                onMouseUp={() => setSosHolding(false)}
                onTouchStart={() => setSosHolding(true)}
                onTouchEnd={() => setSosHolding(false)}
                className={`relative overflow-hidden px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg ${
                  sosActive
                    ? 'bg-red-600 text-white animate-pulse-sos'
                    : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-red-900/40'
                }`}
              >
                {/* Hold Progress Fill */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-red-800/80 transition-all duration-75"
                  style={{ width: `${sosProgress}%` }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5" />
                  <span>{sosActive ? 'MAYDAY BROADCASTING' : sosHolding ? `HOLD (${Math.round(sosProgress)}%)` : 'HOLD 3S FOR SOS'}</span>
                </span>
              </button>
              <span className="text-[10px] text-slate-400 mt-1">Press & hold 3 seconds to alert Coast Guard</span>
            </div>
          </div>

          {/* Interactive Navigation Leaflet Map */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex-1 min-h-[380px] relative overflow-hidden shadow-2xl">
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
              <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={boatIcon}>
                <Popup>
                  <div className="text-slate-900 p-1">
                    <strong className="text-base font-bold">{boat.name}</strong>
                    <p className="text-xs text-slate-600">{boat.registrationNumber}</p>
                    <p className="text-xs mt-1">Speed: <strong>{boat.speedKnots} kn</strong></p>
                    <p className="text-xs">Fuel: <strong>{boat.fuelPct}%</strong> | Battery: <strong>{boat.batteryV}V</strong></p>
                  </div>
                </Popup>
              </Marker>

              {/* Safe Fishing Zone Circle Overlay */}
              <Circle
                center={[9.9312, 76.2673]}
                radius={25000}
                pathOptions={{ color: '#0284c7', fillColor: '#0284c7', fillOpacity: 0.08, dashArray: '5, 10' }}
              />
            </MapContainer>
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-xl text-xs backdrop-blur-md z-[1000] space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                <Compass className="w-4 h-4" />
                <span>Safe Fishing Zone 2</span>
              </div>
              <p className="text-[11px] text-slate-400">Harbor Distance: <strong>14.2 NM West</strong></p>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              onClick={() => triggerMOB('c-02')}
              className="bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 p-3.5 rounded-xl flex items-center justify-center space-x-2 font-semibold text-xs transition"
            >
              <LifeBuoy className="w-4 h-4 text-amber-400" />
              <span>Simulate Man Overboard</span>
            </button>

            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 p-3.5 rounded-xl flex items-center justify-center space-x-2 text-slate-300 font-semibold text-xs transition">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Waypoints</span>
            </button>

            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 p-3.5 rounded-xl flex items-center justify-center space-x-2 text-slate-300 font-semibold text-xs transition">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Coast Guard Helpline</span>
            </button>

            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 p-3.5 rounded-xl flex items-center justify-center space-x-2 text-slate-300 font-semibold text-xs transition">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>Full Weather Radar</span>
            </button>
          </div>

        </div>

        {/* Right Column: Boat Health & Telemetry Metrics */}
        <div className="space-y-6">

          {/* AI Weather Safety Risk Widget */}
          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            weather.riskLevel === 'SAFE' ? 'bg-emerald-950/40 border-emerald-500/30' :
            weather.riskLevel === 'MODERATE_RISK' ? 'bg-amber-950/40 border-amber-500/30' :
            'bg-rose-950/40 border-rose-500/40'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>AI Weather Safety Advisory</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                weather.riskLevel === 'SAFE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                weather.riskLevel === 'MODERATE_RISK' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {weather.riskLevel.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{weather.advisory}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">WIND SPEED</span>
                <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{weather.windSpeedKnots} knots</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">WAVE SWELL</span>
                <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
                  <Waves className="w-3.5 h-3.5 text-blue-400" />
                  <span>{weather.waveHeightM} meters</span>
                </span>
              </div>
            </div>
          </div>

          {/* Boat Health & Sensors Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Boat Health Telemetry</span>
              <span className="text-[10px] text-cyan-400 font-normal">ESP32 Live IoT</span>
            </h2>

            {/* Fuel Level Gauge */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400 flex items-center space-x-1">
                  <Fuel className="w-3.5 h-3.5 text-amber-400" />
                  <span>Diesel Fuel Reserve</span>
                </span>
                <span className="font-bold text-white">{boat.fuelPct}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    boat.fuelPct > 50 ? 'bg-emerald-500' : boat.fuelPct > 20 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${boat.fuelPct}%` }}
                />
              </div>
            </div>

            {/* Battery Voltage */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-300 flex items-center space-x-2">
                <Battery className="w-4 h-4 text-emerald-400" />
                <span>Backup Battery Bank</span>
              </span>
              <span className="text-xs font-bold text-emerald-400">{boat.batteryV} V (DC)</span>
            </div>

            {/* Water Leakage Sensor */}
            <div className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
              boat.waterLeak ? 'bg-rose-950/50 border-rose-500/50 text-rose-300' : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
            }`}>
              <span className="flex items-center space-x-2">
                <AlertTriangle className={`w-4 h-4 ${boat.waterLeak ? 'text-rose-400 animate-bounce' : 'text-slate-500'}`} />
                <span>Hull Water Bilge Sensor</span>
              </span>
              <span className="font-bold">{boat.waterLeak ? 'BILGE WATER DETECTED' : 'DRY (NORMAL)'}</span>
            </div>

            {/* Tilt & Stability Sensor */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-slate-300 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Vessel Roll / Pitch Angle</span>
              </span>
              <span className="font-bold text-white">{boat.tiltAngle}° (STABLE)</span>
            </div>
          </div>

          {/* Crew Wearable MOB Status List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Onboard Crew & Wearable Beacons</span>
              </h2>
              <span className="text-xs font-bold text-cyan-400">{crew.length} Active</span>
            </div>

            <div className="space-y-2.5">
              {crew.map(c => (
                <div 
                  key={c.id} 
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    c.status === 'OVERBOARD' 
                      ? 'bg-red-950/60 border-red-500/60 text-red-200 animate-pulse' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${c.status === 'OVERBOARD' ? 'bg-red-600 text-white' : 'bg-slate-800 text-cyan-400'}`}>
                      <LifeBuoy className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{c.name}</p>
                      <p className="text-[10px] text-slate-400">Beacon: {c.wearableId} | Battery: {c.battery}%</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    c.status === 'OVERBOARD' ? 'bg-red-600 text-white' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
