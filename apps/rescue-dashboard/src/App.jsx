import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Radio, Anchor, Navigation, Users, LifeBuoy, 
  MapPin, CheckCircle2, AlertTriangle, Send, PhoneCall, RefreshCw, 
  BarChart3, CloudLightning, ShieldCheck
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';

const boatMarker = new L.DivIcon({
  className: 'custom-boat-marker',
  html: `<div style="background-color: #0284c7; color: white; padding: 5px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px #0284c7;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M12 2v8"/></svg></div>`,
  iconSize: [28, 28]
});

const emergencyMarker = new L.DivIcon({
  className: 'custom-sos-marker',
  html: `<div style="background-color: #ef4444; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 20px #ef4444; animation: pulse 1s infinite;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>`,
  iconSize: [34, 34]
});

const mobMarker = new L.DivIcon({
  className: 'custom-mob-marker',
  html: `<div style="background-color: #f59e0b; color: white; padding: 6px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 20px #f59e0b; animation: pulse 1s infinite;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2v20M2 12h20"/></svg></div>`,
  iconSize: [32, 32]
});

const rescueUnitIcon = new L.DivIcon({
  className: 'custom-rescue-unit',
  html: `<div style="background-color: #10b981; color: white; padding: 6px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 12px #10b981;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>`,
  iconSize: [30, 30]
});

export default function RescueDashboard() {
  const [boats, setBoats] = useState([
    { id: 'b-102', registrationNumber: 'KL-07-FISH-102', name: 'Sea Falcon', latitude: 9.9312, longitude: 76.2673, speedKnots: 8.4, status: 'AT_SEA' },
    { id: 'b-105', registrationNumber: 'KL-07-FISH-105', name: 'Ocean Defender', latitude: 9.8540, longitude: 76.1200, speedKnots: 6.2, status: 'EMERGENCY' }
  ]);

  const [emergencies, setEmergencies] = useState([
    {
      id: 'em-1001',
      incidentNumber: 'INC-2026-0811-01',
      boatId: 'b-105',
      boatName: 'Ocean Defender',
      registrationNumber: 'KL-07-FISH-105',
      emergencyType: 'MAN_OVERBOARD',
      latitude: 9.8540,
      longitude: 76.1200,
      severity: 'CRITICAL',
      status: 'DISPATCHED',
      description: 'Water immersion sensor triggered on Wearable WB-003 for Anil Kumar. Boat KL-07-FISH-105 reports missing crew member.',
      assignedRescueUnit: 'CG-Kochi-1 (Fast Patrol Vessel)',
      createdAt: '12:04 AM'
    }
  ]);

  const [rescueUnits, setRescueUnits] = useState([
    { id: 'ru-01', unitName: 'CG-Kochi-1 (Fast Patrol Vessel)', latitude: 9.8700, longitude: 76.1800, status: 'DISPATCHED' },
    { id: 'ru-02', unitName: 'CG-Copter-03 (Sea King Helicopter)', latitude: 9.9500, longitude: 76.2700, status: 'STANDBY' }
  ]);

  const [selectedEmergency, setSelectedEmergency] = useState(null);

  useEffect(() => {
    const socket = io(BACKEND_URL);

    socket.on('boat:telemetry', (data) => {
      if (data.boat) {
        setBoats(prev => prev.map(b => b.id === data.boat.id ? { ...b, ...data.boat } : b));
      }
    });

    socket.on('emergency:sos', (data) => {
      if (data.emergency) {
        setEmergencies(prev => [data.emergency, ...prev]);
      }
    });

    socket.on('wearable:mob', (data) => {
      if (data.emergency) {
        setEmergencies(prev => [data.emergency, ...prev]);
      }
    });

    fetch(`${BACKEND_URL}/api/emergency`)
      .then(res => res.json())
      .then(data => {
        if (data.emergencies) setEmergencies(data.emergencies);
      })
      .catch(() => {});

    return () => socket.close();
  }, []);

  const handleDispatch = (emergencyId) => {
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
    });
  };

  const handleResolve = (emergencyId) => {
    fetch(`${BACKEND_URL}/api/emergency/${emergencyId}/resolve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolutionNotes: 'Victim safely recovered by Coast Guard Fast Patrol Vessel.' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.emergency) {
        setEmergencies(prev => prev.map(e => e.id === emergencyId ? data.emergency : e));
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Coast Guard Command Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wider text-white uppercase">INDIAN COAST GUARD - RESCUE COMMAND CENTER</h1>
            <p className="text-xs text-slate-400">Maritime Emergency Response & Live Telemetry Monitoring System</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-red-400 font-bold">EMERGENCY FEED: LIVE</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            Active Fleet: <strong className="text-white">{boats.length} Boats</strong>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Map */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          
          {/* Tactical Map Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex-1 min-h-[460px] relative overflow-hidden shadow-2xl">
            <MapContainer 
              center={[9.9000, 76.2000]} 
              zoom={10} 
              scrollWheelZoom={true} 
              style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap & SFSRS Rescue Operations'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Active Boats */}
              {boats.map(b => (
                <Marker key={b.id} position={[b.latitude || 9.9312, b.longitude || 76.2673]} icon={boatMarker}>
                  <Popup>
                    <div className="text-slate-900 p-1">
                      <strong className="font-bold">{b.name}</strong> ({b.registrationNumber})
                      <p className="text-xs">Speed: {b.speedKnots} kn | Status: {b.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Active Emergencies */}
              {emergencies.map(e => (
                <Marker 
                  key={e.id} 
                  position={[e.latitude, e.longitude]} 
                  icon={e.emergencyType === 'MAN_OVERBOARD' ? mobMarker : emergencyMarker}
                >
                  <Popup>
                    <div className="text-slate-900 p-1">
                      <strong className="font-bold text-red-600">{e.emergencyType}</strong>
                      <p className="text-xs text-slate-700">{e.description}</p>
                      <p className="text-xs font-semibold mt-1">Boat: {e.boatName} ({e.registrationNumber})</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Coast Guard Patrol Vessels */}
              {rescueUnits.map(ru => (
                <Marker key={ru.id} position={[ru.latitude, ru.longitude]} icon={rescueUnitIcon}>
                  <Popup>
                    <div className="text-slate-900 p-1">
                      <strong className="font-bold text-emerald-700">{ru.unitName}</strong>
                      <p className="text-xs">Status: {ru.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Coast Guard HQ Station Radius */}
              <Circle
                center={[9.9312, 76.2673]}
                radius={40000}
                pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.05, dashArray: '4, 8' }}
              />
            </MapContainer>

            {/* Map Map Legend Overlay */}
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md z-[1000] text-xs space-y-1.5 shadow-xl">
              <span className="font-bold text-white block text-[11px] uppercase tracking-wider">Tactical Map Legend</span>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                <span>Active Fishing Boat</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                <span>Boat SOS Alert</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
                <span>Man Overboard (MOB)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Coast Guard Rescue Vessel</span>
              </div>
            </div>
          </div>

          {/* Quick Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Boats at Sea</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">{boats.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active SOS Alerts</span>
              <p className="text-xl font-extrabold text-red-500 mt-1">{emergencies.filter(e => e.status !== 'RESCUED').length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Dispatched Rescue Units</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">{rescueUnits.filter(r => r.status === 'DISPATCHED').length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Rescue Response</span>
              <p className="text-xl font-extrabold text-white mt-1">14.2 min</p>
            </div>
          </div>

        </div>

        {/* Right Column: SOS Emergency Incidents Panel */}
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>SOS Emergency Incident Queue</span>
            </h2>
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
              {emergencies.length} Incidents
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
            {emergencies.map(e => (
              <div 
                key={e.id}
                className={`p-4 rounded-2xl border transition-all ${
                  e.status === 'RESCUED' 
                    ? 'bg-slate-900/60 border-slate-800 opacity-75' 
                    : 'bg-red-950/40 border-red-500/50 shadow-lg shadow-red-950/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      e.emergencyType === 'MAN_OVERBOARD' ? 'bg-amber-500 text-slate-950' : 'bg-red-600 text-white'
                    }`}>
                      {e.emergencyType.replace('_', ' ')}
                    </span>
                    <h3 className="font-extrabold text-sm text-white mt-1.5">{e.boatName} ({e.registrationNumber})</h3>
                  </div>
                  <span className="text-[10px] text-slate-400">{e.createdAt}</span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{e.description}</p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">
                    Assigned Unit: <strong className="text-cyan-300">{e.assignedRescueUnit || 'Unassigned'}</strong>
                  </span>

                  {e.status !== 'RESCUED' ? (
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDispatch(e.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition"
                      >
                        Dispatch Asset
                      </button>
                      <button 
                        onClick={() => handleResolve(e.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition"
                      >
                        Mark Rescued
                      </button>
                    </div>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RESCUED & CLOSED</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
