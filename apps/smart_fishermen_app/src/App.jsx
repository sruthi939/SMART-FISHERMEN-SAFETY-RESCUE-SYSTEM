import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Anchor, Heart, Building2, Radio, Compass, Fuel, 
  Battery, AlertTriangle, MapPin, Users, Wind, Waves, CheckCircle2, 
  LifeBuoy, PhoneCall, Clock, Navigation, Plus, FileCheck, IndianRupee, 
  RefreshCw, Camera, Mic, Cpu, Lock, ShieldCheck, Zap, Crosshair, Server, Database, Satellite, Layers, Map,
  MessageSquare, Send, Stethoscope, TrendingUp, Bell, Check, LogOut, UserCheck, KeyRound, Mail
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

const harborMarker = new L.DivIcon({
  className: 'custom-harbor-marker',
  html: `<div style="background-color: #eab308; color: black; padding: 4px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px #eab308;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M12 2v10M8 8l4-4 4 4"/></svg></div>`,
  iconSize: [26, 26]
});

export default function SmartFishermenApp() {
  // Real API Authentication & Portal Isolation State
  const [currentUser, setCurrentUser] = useState(null); // null = Login Screen
  const [dbUsers, setDbUsers] = useState([]);
  const [loginRole, setLoginRole] = useState('fisherman');
  const [loginEmail, setLoginEmail] = useState('ramesh@fisherman.org');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [authError, setAuthError] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);

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
  const [coastalDistricts, setCoastalDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [imblWarning, setImblWarning] = useState(null);
  const [driftData, setDriftData] = useState(null);

  // Family Feature State
  const [familyChatMessages, setFamilyChatMessages] = useState([]);
  const [chatInputText, setChatInputText] = useState('');
  const [fishMarketRates, setFishMarketRates] = useState([]);
  const [teleMedicineHotlines, setTeleMedicineHotlines] = useState([]);
  const [showTeleMedModal, setShowTeleMedModal] = useState(false);

  // SOS state
  const [sosHolding, setSosHolding] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [sosActive, setSosActive] = useState(false);

  // Drone Modal State
  const [showDroneHUD, setShowDroneHUD] = useState(false);
  const [dronePayloadDropped, setDronePayloadDropped] = useState(false);

  // Admin Registration Modal State
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', registrationNumber: '', boatType: 'Deep Sea Trawler', homePort: 'Kochi Harbor' });

  // Fetch registered DB users from backend API
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/auth/users`)
      .then(res => res.json())
      .then(data => {
        if (data.users) setDbUsers(data.users);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelectRoleTab = (roleKey) => {
    setLoginRole(roleKey);
    setAuthError(null);
    const foundUser = dbUsers.find(u => u.role === roleKey);
    if (foundUser) {
      setLoginEmail(foundUser.email);
    }
  };

  // Authentic API Authentication Handler (POST /api/auth/login)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthenticating(true);
    setAuthError(null);

    fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword, role: loginRole })
    })
    .then(res => {
      if (!res.ok) throw new Error('Authentication failed. Invalid credentials.');
      return res.json();
    })
    .then(data => {
      if (data.user) {
        if (data.token) localStorage.setItem('sfsrs_token', data.token);
        setCurrentUser(data.user);
      }
      setAuthenticating(false);
    })
    .catch(err => {
      setAuthError(err.message || 'Login failed');
      setAuthenticating(false);
    });
  };

  const handleQuickApiLogin = (targetEmail, targetRole) => {
    setLoginRole(targetRole);
    setLoginEmail(targetEmail);
    setAuthenticating(true);
    setAuthError(null);

    fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: targetEmail, password: 'password123', role: targetRole })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        if (data.token) localStorage.setItem('sfsrs_token', data.token);
        setCurrentUser(data.user);
      }
      setAuthenticating(false);
    })
    .catch(err => {
      setAuthError('Authentication error');
      setAuthenticating(false);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('sfsrs_token');
    setCurrentUser(null);
  };

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

    fetch(`${BACKEND_URL}/api/rescue/drift-trajectory`)
      .then(res => res.json())
      .then(data => { if (data) setDriftData(data); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/admin/coastal-districts`)
      .then(res => res.json())
      .then(data => { if (data.coastalDistricts) setCoastalDistricts(data.coastalDistricts); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/family/messages/b-102`)
      .then(res => res.json())
      .then(data => { if (data.messages) setFamilyChatMessages(data.messages); })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/family/market-prices`)
      .then(res => res.json())
      .then(data => {
        if (data.marketPrices) setFishMarketRates(data.marketPrices);
        if (data.teleMedicine) setTeleMedicineHotlines(data.teleMedicine);
      })
      .catch(err => console.error(err));

    fetch(`${BACKEND_URL}/api/admin/dashboard`)
      .then(res => res.json())
      .then(data => {
        if (data.summary) setAdminSummary(data.summary);
        if (data.boats) setAllBoats(data.boats);
        if (data.keralaCoastalDistricts) setCoastalDistricts(data.keralaCoastalDistricts);
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
      if (data.boat && data.boat.latitude) {
        const distToBorder = Math.abs(data.boat.latitude - 9.7500) * 60;
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

    socket.on('family:chat', (data) => {
      if (data.message) {
        setFamilyChatMessages(prev => [...prev, data.message]);
      }
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

  const handleSendFamilyMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    fetch(`${BACKEND_URL}/api/family/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boatId: boat?.id || 'b-102',
        senderName: currentUser?.name || 'Family Member',
        senderRole: currentUser?.role === 'family' ? 'FAMILY' : 'FISHERMAN',
        messageText: chatInputText
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.chatMessage) {
        setFamilyChatMessages(prev => [...prev, data.chatMessage]);
        setChatInputText('');
      }
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

  // Dynamic Family ETA calculation
  const homePortLat = 9.9600;
  const homePortLon = 76.2400;
  const boatLat = boat?.latitude || 9.9312;
  const boatLon = boat?.longitude || 76.2673;
  const distanceNM = parseFloat((Math.sqrt(Math.pow(boatLat - homePortLat, 2) + Math.pow(boatLon - homePortLon, 2)) * 60).toFixed(1));
  const boatSpeed = boat?.speedKnots || 8.4;
  const hoursToPort = boatSpeed > 0 ? parseFloat((distanceNM / boatSpeed).toFixed(1)) : 0;
  const captain = crew.find(c => c.role === 'CAPTAIN') || crew[0] || { name: 'Ramesh Kumar', role: 'CAPTAIN' };

  // Dynamic AI MOB Drift Points
  const mobIncident = emergencies.find(e => e.emergencyType === 'MAN_OVERBOARD' && e.status !== 'RESCUED');
  const initialMobLat = mobIncident ? mobIncident.latitude : 9.8540;
  const initialMobLon = mobIncident ? mobIncident.longitude : 76.1200;

  const driftPoints = driftData?.trajectory ? [
    [initialMobLat, initialMobLon],
    ...driftData.trajectory.map(pt => [pt.latitude, pt.longitude])
  ] : [
    [initialMobLat, initialMobLon],
    [initialMobLat - 0.015, initialMobLon - 0.025],
    [initialMobLat - 0.030, initialMobLon - 0.050],
    [initialMobLat - 0.045, initialMobLon - 0.075]
  ];

  // District Filtering
  const filteredDistricts = selectedDistrict === 'ALL'
    ? coastalDistricts
    : coastalDistricts.filter(d => d.code === selectedDistrict || d.districtName.toUpperCase().includes(selectedDistrict.toUpperCase()));

  // =========================================================================
  // 1. AUTHENTIC API LOGIN SCREEN (WHEN CURRENTUSER IS NULL)
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
        
        {/* Background Decorative Rings */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-cyan-600/20 text-cyan-400 rounded-2xl border border-cyan-500/30 flex items-center justify-center mx-auto shadow-lg">
              <LifeBuoy className="w-9 h-9" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-wider uppercase">SMART FISHERMEN SAFETY SYSTEM</h1>
            <p className="text-xs text-slate-400">Authentic Database API Authentication • Select Portal Role</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => handleSelectRoleTab('fisherman')}
              className={`p-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${loginRole === 'fisherman' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Anchor className="w-4 h-4" />
              <span>Fisherman</span>
            </button>

            <button
              onClick={() => handleSelectRoleTab('family')}
              className={`p-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${loginRole === 'family' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Heart className="w-4 h-4" />
              <span>Family</span>
            </button>

            <button
              onClick={() => handleSelectRoleTab('rescue')}
              className={`p-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${loginRole === 'rescue' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Coast Guard</span>
            </button>

            <button
              onClick={() => handleSelectRoleTab('admin')}
              className={`p-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${loginRole === 'admin' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-4 h-4" />
              <span>Govt Admin</span>
            </button>
          </div>

          {authError && (
            <div className="bg-red-600/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-bold text-center">
              {authError}
            </div>
          )}

          {/* Authentic API Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1.5 font-bold flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Registered Email Address</span>
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="Enter user email..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1.5 font-bold flex items-center space-x-1">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white shadow-lg transition flex items-center justify-center space-x-2 ${
                loginRole === 'fisherman' ? 'bg-cyan-600 hover:bg-cyan-500' :
                loginRole === 'family' ? 'bg-emerald-600 hover:bg-emerald-500' :
                loginRole === 'rescue' ? 'bg-red-600 hover:bg-red-500' : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{authenticating ? 'AUTHENTICATING WITH DATABASE...' : `LOG IN TO ${loginRole.toUpperCase()} PORTAL`}</span>
            </button>
          </form>

          {/* Dynamic DB User Accounts API Login Shortcuts */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block text-center">Registered Users API Authentication:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {dbUsers.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleQuickApiLogin(u.email, u.role)}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-200 font-bold text-left flex items-center space-x-2 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 flex items-center justify-center text-[10px]">
                    {u.name[0]}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-white text-[10px]">{u.name}</p>
                    <p className="text-[9px] text-cyan-400 uppercase font-bold">{u.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. LOGGED IN PORTAL VIEW (STRICT USER ISOLATION - ONLY SHOWS OWN ROLE)
  // =========================================================================
  const userRole = currentUser.role;

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
              <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 font-bold uppercase">
                {userRole.toUpperCase()} PORTAL ACTIVE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Strict Role Isolation • Authenticated JWT Session Active</p>
          </div>
        </div>

        {/* User Account Info & Logout Button */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2.5 text-xs">
            <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
              {currentUser.name[0]}
            </div>
            <div className="text-left">
              <span className="font-extrabold text-white block">{currentUser.name}</span>
              <span className="text-[10px] text-cyan-400 uppercase font-bold">{userRole} account</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button onClick={fetchAllData} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition" title="Refresh API Data"><RefreshCw className="w-3.5 h-3.5" /></button>
          <span className="flex items-center space-x-1.5"><Radio className={`w-3.5 h-3.5 ${connected ? 'text-emerald-400' : 'text-red-400'}`} /><span className="text-slate-300 font-semibold">{connected ? 'API / SOCKET LIVE' : 'CONNECTING...'}</span></span>
        </div>
      </header>

      {/* IMBL Boundary Alert Banner */}
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

      {/* Main Isolated Portal Views */}
      <div className="max-w-7xl w-full mx-auto p-6 flex-1">

        {loading && !boat ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold">Connecting to Live Backend API Server (http://localhost:5000)...</p>
          </div>
        ) : (
          <>
            {/* 1. FISHERMAN PORTAL VIEW */}
            {userRole === 'fisherman' && boat && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Anchor className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-extrabold text-white">{boat.name}</h2>
                        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold">{boat.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Reg: <strong>{boat.registrationNumber}</strong> | Pos: ({boat.latitude?.toFixed(4)}° N, {boat.longitude?.toFixed(4)}° E)</p>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Bearer: {boat.signalType || 'HYBRID_LORA_MESH'} [Multi-Hop Relayed]</span>
                        </span>
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1">
                          <Satellite className="w-3.5 h-3.5 text-purple-400" />
                          <span>NavIC + GPS Sat Lock (14 Sats)</span>
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

                  {/* Navigation Map */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[380px] relative overflow-hidden isolate shadow-xl">
                    <MapContainer center={[boat.latitude || 9.9312, boat.longitude || 76.2673]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                      <TileLayer attribution='&copy; OpenStreetMap & SFSRS' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      
                      <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={boatIcon}>
                        <Popup><strong className="font-bold">{boat.name}</strong><br />Speed: {boat.speedKnots} kn</Popup>
                      </Marker>

                      <Polyline
                        positions={[[9.7500, 75.8000], [9.7500, 76.6000]]}
                        pathOptions={{ color: '#ef4444', weight: 3, dashArray: '6, 12' }}
                      />

                      <Circle center={[9.9312, 76.2673]} radius={25000} pathOptions={{ color: '#0284c7', fillColor: '#0284c7', fillOpacity: 0.08, dashArray: '5, 10' }} />
                    </MapContainer>

                    <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-xs backdrop-blur-md z-30 space-y-1">
                      <span className="text-red-400 font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Red Line: IMBL Border (9.75° N)</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => triggerMOB('c-02')} className="bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 p-3.5 rounded-xl flex items-center space-x-2 font-bold text-xs transition">
                      <LifeBuoy className="w-4 h-4 text-amber-400" />
                      <span>Simulate Dual-Validated Man-Overboard (MOB)</span>
                    </button>
                  </div>

                </div>

                <div className="space-y-6">
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

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-slate-400">ESP32 & Dual-Sensor Diagnostics</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-500/30">ANTI-FALSE-ALARM ACTIVE</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Diesel Fuel Level</span>
                        <span className="font-bold text-white">{boat.fuelPct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className={`h-2 rounded-full ${boat.fuelPct > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${boat.fuelPct}%` }} />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">Backup Battery Bank</span><span className="font-bold text-emerald-400">{boat.batteryV} V (DC)</span></div>
                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">Bilge Water Sensor</span><span className={`font-bold ${boat.waterLeak ? 'text-red-400' : 'text-slate-300'}`}>{boat.waterLeak ? 'WATER DETECTED' : 'DRY (NORMAL)'}</span></div>
                    <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">MPU6050 Gyro Roll Angle</span><span className="font-bold text-white">{boat.tiltAngle}° (STABLE)</span></div>
                    <div className="flex justify-between text-xs pt-1 border-t border-slate-800/80 pt-2"><span className="text-slate-400">Hardware Seal</span><span className="font-bold text-emerald-400">IP68 WATERPROOF SEAL PASSED</span></div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Onboard Crew Manifest</span>
                    {crew.map(c => (
                      <div key={c.id} className="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{c.name}</p>
                          <p className="text-[10px] text-slate-400">Role: {c.role} | Beacon: {c.wearableId || 'wb-001'}</p>
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
            {userRole === 'family' && boat && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt={captain.name} className="w-16 h-16 rounded-full border-2 border-emerald-400 object-cover" />
                      <div>
                        <h3 className="text-lg font-extrabold text-white">{captain.name}</h3>
                        <p className="text-xs text-slate-400">Vessel: <strong>{boat.name} ({boat.registrationNumber})</strong> • {boat.homePort}</p>
                        <p className="text-xs text-emerald-400 font-bold mt-1 flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>SAFE AT SEA • Multi-Bearer Mesh Telemetry Active</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">DYNAMIC RETURN ETA</span>
                      <span className="text-base font-extrabold text-emerald-400">{hoursToPort} hrs to {boat.homePort}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{distanceNM} NM offshore</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-white">Safe-Zone Geofence Status: </span>
                        <span className="text-emerald-400 font-bold">NORMAL DEEP SEA FISHING ZONE</span>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-0.5 rounded font-bold border border-emerald-500/30">SMS NOTIFICATIONS ACTIVE</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[360px] relative overflow-hidden isolate shadow-xl">
                    <MapContainer center={[boat.latitude || 9.9312, boat.longitude || 76.2673]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                      <TileLayer attribution='&copy; OpenStreetMap & SFSRS' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[boat.latitude || 9.9312, boat.longitude || 76.2673]} icon={boatIcon}>
                        <Popup><strong className="font-bold">{boat.name}</strong><br />Position: ({boat.latitude?.toFixed(4)}, {boat.longitude?.toFixed(4)})</Popup>
                      </Marker>
                    </MapContainer>
                  </div>

                  {/* 💬 Two-Way Off-Grid Family Mesh Chat Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="font-extrabold text-sm text-white flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        <span>Two-Way Off-Grid Family Mesh Messaging</span>
                      </h4>
                      <span className="text-[10px] bg-slate-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">Relayed via LoRa Mesh Packet</span>
                    </div>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {familyChatMessages.map(msg => (
                        <div key={msg.id} className={`p-3 rounded-xl text-xs space-y-1 ${msg.senderRole === 'FAMILY' ? 'bg-cyan-950/50 border border-cyan-500/30 ml-6' : 'bg-slate-950 border border-slate-800 mr-6'}`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{msg.senderName}</span>
                            <span className="text-[10px] text-slate-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-slate-200 leading-relaxed">{msg.messageText}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendFamilyMessage} className="flex space-x-2 pt-1">
                      <input
                        type="text"
                        value={chatInputText}
                        onChange={e => setChatInputText(e.target.value)}
                        placeholder="Type message to send to boat over mesh bearer..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>

                </div>

                <div className="space-y-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <h4 className="font-extrabold text-xs uppercase text-slate-300 tracking-wider flex items-center space-x-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>Live Kerala Harbor Fish Market Auction Rates</span>
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {fishMarketRates.map(m => (
                        <div key={m.id} className="p-2.5 bg-slate-950 rounded-xl flex items-center justify-between text-xs border border-slate-800/80">
                          <div>
                            <p className="font-bold text-white">{m.fishName}</p>
                            <p className="text-[10px] text-slate-400">{m.harbor}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-emerald-400 text-sm">₹{m.priceINRPerKg} / kg</span>
                            <span className="text-[10px] text-emerald-300 block font-bold">▲ Market High</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase text-slate-300 tracking-wider flex items-center space-x-1.5">
                      <Stethoscope className="w-4 h-4 text-purple-400" />
                      <span>24x7 Marine Tele-Medicine Medical Hotline</span>
                    </h4>

                    {teleMedicineHotlines.map(h => (
                      <div key={h.id} className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-white">{h.title}</p>
                        <p className="text-purple-300 font-extrabold text-sm">{h.contactPhone}</p>
                        <span className="text-[10px] text-emerald-400 font-bold block">● {h.available}</span>
                      </div>
                    ))}

                    <button
                      onClick={() => setShowTeleMedModal(true)}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-xl text-xs shadow-lg shadow-purple-900/40"
                    >
                      Open First-Aid Medical Guidance
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Coast Guard MRCC Direct Hotline</span>
                    <a href="tel:1554" className="block bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-red-900/40 flex items-center justify-center space-x-2">
                      <PhoneCall className="w-4 h-4" />
                      <span>CALL MRCC 1554 EMERGENCY</span>
                    </a>
                  </div>

                </div>

              </div>
            )}

            {/* 3. COAST GUARD RESCUE VIEW */}
            {userRole === 'rescue' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-[460px] relative overflow-hidden isolate shadow-xl">
                    <MapContainer center={[9.8800, 76.1500]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                      <TileLayer attribution='&copy; Coast Guard MROC' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      
                      {coastalDistricts.map(dist => (
                        <Marker key={dist.id} position={[dist.lat, dist.lon]} icon={harborMarker}>
                          <Popup>
                            <strong className="font-bold text-amber-600">{dist.districtName} District</strong><br />
                            Harbors: {dist.majorHarbors.join(', ')}<br />
                            CG Base: {dist.coastGuardStation}
                          </Popup>
                        </Marker>
                      ))}

                      {allBoats.map(b => (
                        <Marker key={b.id} position={[b.latitude || 9.9312, b.longitude || 76.2673]} icon={boatIcon}>
                          <Popup><strong className="font-bold">{b.name}</strong> ({b.registrationNumber})</Popup>
                        </Marker>
                      ))}

                      {emergencies.map(e => (
                        <Marker key={e.id} position={[e.latitude, e.longitude]} icon={emergencyMarker}>
                          <Popup><strong className="font-bold text-red-600">{e.emergencyType}</strong><br />{e.description}</Popup>
                        </Marker>
                      ))}

                      <Marker position={[9.8750, 76.1400]} icon={droneIcon}>
                        <Popup><strong className="font-bold text-purple-400">CG-Drone-Alpha (Thermal IR SAR Drone)</strong></Popup>
                      </Marker>

                      {rescueUnits.map(ru => (
                        <Marker key={ru.id} position={[ru.latitude, ru.longitude]} icon={rescueUnitIcon}>
                          <Popup><strong className="font-bold text-emerald-600">{ru.unitName}</strong></Popup>
                        </Marker>
                      ))}

                      <Polyline
                        positions={driftPoints}
                        pathOptions={{ color: '#f59e0b', weight: 4, dashArray: '4, 8' }}
                      />
                      
                      {driftPoints[1] && <Circle center={driftPoints[1]} radius={500} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.15 }} />}
                      {driftPoints[2] && <Circle center={driftPoints[2]} radius={900} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.10 }} />}
                      {driftPoints[3] && <Circle center={driftPoints[3]} radius={1300} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.08 }} />}
                    </MapContainer>

                    <div className="absolute top-4 right-4 bg-slate-900/90 border border-amber-500/40 p-3 rounded-xl backdrop-blur-md z-30 text-xs space-y-1 shadow-xl">
                      <span className="font-bold text-amber-400 flex items-center space-x-1">
                        <Crosshair className="w-4 h-4" />
                        <span>AI MOB Drift Trajectory Radar</span>
                      </span>
                      <p className="text-[11px] text-slate-300">Sea Current: <strong>{driftData?.driftSpeedKnots || 1.8} knots @ 225° SW</strong></p>
                      <p className="text-[11px] text-slate-300">+1h Projected: ({driftPoints[1][0].toFixed(4)}, {driftPoints[1][1].toFixed(4)})</p>
                    </div>
                  </div>

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

            {/* 4. GOVT ADMIN VIEW */}
            {userRole === 'admin' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">ALL KERALA COASTAL DISTRICTS</span>
                    <p className="text-2xl font-extrabold text-cyan-400 mt-1">9 Districts (590 km Coast)</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">TOTAL REGISTERED HARBORS</span>
                    <p className="text-2xl font-extrabold text-white mt-1">27 Major Harbors</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">COASTAL LANDING STATIONS</span>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">248 Landing Centers</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <span className="text-slate-400 text-xs font-bold">REGISTERED MARITIME FLEET</span>
                    <p className="text-2xl font-extrabold text-purple-400 mt-1">32,980 Vessels</p>
                  </div>
                </div>

                {/* District Filter Chips */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center space-x-2">
                      <Map className="w-4 h-4 text-cyan-400" />
                      <span>Select Kerala Maritime District to Inspect Seashore Harbors</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Showing {filteredDistricts.length} of {coastalDistricts.length} Districts</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => setSelectedDistrict('ALL')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedDistrict === 'ALL' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
                    >
                      All 9 Coastal Districts
                    </button>
                    {coastalDistricts.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDistrict(d.code)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedDistrict === d.code ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}
                      >
                        {d.districtName} ({d.code})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kerala Seashore Directory */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center space-x-2">
                      <Anchor className="w-4 h-4 text-cyan-400" />
                      <span>Official Kerala State Fisheries & Harbor Registry Directory</span>
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
                          <th className="p-4">District</th>
                          <th className="p-4">Coastline (km)</th>
                          <th className="p-4">Major Seashores & Fishing Harbors</th>
                          <th className="p-4">Landing Centers</th>
                          <th className="p-4">Registered Fleet</th>
                          <th className="p-4">Coast Guard / Naval Station</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredDistricts.map(d => (
                          <tr key={d.id} className="hover:bg-slate-800/40 transition">
                            <td className="p-4 font-extrabold text-white flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              <span>{d.districtName}</span>
                            </td>
                            <td className="p-4 font-semibold text-cyan-300">{d.coastlineKm} km</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {d.majorHarbors.map((h, idx) => (
                                  <span key={idx} className="bg-slate-950 text-slate-200 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                                    ⚓ {h}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 font-bold text-emerald-400">{d.landingCentersCount} Centers</td>
                            <td className="p-4 font-bold text-white">{d.registeredVesselsCount} Boats</td>
                            <td className="p-4">
                              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded text-[10px] font-bold flex items-center space-x-1 w-fit">
                                <ShieldCheck className="w-3 h-3 text-purple-400" />
                                <span>{d.coastGuardStation}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Registered Vessels & Cryptographic Hashes */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-5 border-b border-slate-800">
                    <h3 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <span>Registered Fishing Vessels & Cryptographic Blockchain Audit Ledger</span>
                    </h3>
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
                                <span>{b.blockchainTxHash ? `${b.blockchainTxHash.slice(0, 18)}...` : '0x8f23a9b1c74d8120e3...'}</span>
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

      {/* Tele-Medicine First-Aid Modal */}
      {showTeleMedModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-purple-500/30 pb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-purple-400" />
                <span>Marine First-Aid & Tele-Medicine Protocol</span>
              </h3>
              <button onClick={() => setShowTeleMedModal(false)} className="text-slate-400 hover:text-white font-bold text-xs">Close</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <p className="font-bold text-cyan-300">1. Man Overboard Hypothermia Care</p>
                <p className="text-slate-300">Wrap victim in warm dry blankets. Do NOT rub skin vigorously. Offer warm fluids if conscious.</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <p className="font-bold text-cyan-300">2. Deep Sea Hook / Cut Injury</p>
                <p className="text-slate-300">Apply continuous pressure with sterile gauze. Elevate wound above heart. Clean with antiseptics.</p>
              </div>
              <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl">
                <p className="font-bold text-white">Call Emergency Naval Doctor</p>
                <p className="text-purple-300 font-extrabold text-sm mt-0.5">+91 484 2872100</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Autonomous Thermal IR SAR Drone Camera HUD Modal */}
      {showDroneHUD && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4">
            <div className="bg-purple-950/80 p-4 border-b border-purple-500/30 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-purple-400 animate-pulse" />
                <h3 className="font-extrabold text-sm text-white">CG-Drone-Alpha (Autonomous Thermal IR SAR Live Camera Feed)</h3>
              </div>
              <button onClick={() => setShowDroneHUD(false)} className="text-slate-400 hover:text-white font-bold text-xs">Close Feed</button>
            </div>

            <div className="p-4 space-y-4">
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
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
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
