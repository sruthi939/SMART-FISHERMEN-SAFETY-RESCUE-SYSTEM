import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, Users, LifeBuoy, Building2, User, Phone, Mail, CreditCard, Briefcase, MapPin, Lock, Eye, EyeOff, Home, Shield, Award, Hash, ShieldCheck, Wifi, UserPlus, LockKeyhole } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { authService } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useNotification();

  // Active Role Tab ('fisherman' | 'family' | 'rescue' | 'admin')
  const [activeTab, setActiveTab] = useState('fisherman');

  // Password visibility states
  const [showPass, setShowPass] = useState({
    pass: false,
    confirmPass: false,
  });

  const toggleShowPass = (key) => {
    setShowPass(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRegister = async (e, roleName, redirectPath) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps.role = roleName.toLowerCase();

    try {
      const res = await authService.register(formProps);
      
      if (res.isApproved) {
        const user = res.user || { name: formProps.name || roleName, role: roleName.toLowerCase() };
        const token = res.token || 'jwt_sample_token';
        login(user, token);
        addNotification(`${roleName} Registration Successful! Redirecting...`, 'info');
        setTimeout(() => {
          navigate(redirectPath);
        }, 800);
      } else {
        addNotification(
          `Registration Submitted! Account pending Government Admin verification. Please sign in after Admin approval.`,
          'warning'
        );
        setTimeout(() => {
          navigate('/auth/login');
        }, 1500);
      }
    } catch (err) {
      console.error('Registration error:', err);
      addNotification(err.message || 'Registration failed. Please try again.', 'error');
    }
  };

  const tabs = [
    { id: 'fisherman', label: 'Fisherman', icon: Anchor, activeColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10' },
    { id: 'family', label: 'Family Member', icon: Users, activeColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
    { id: 'rescue', label: 'Rescue Officer', icon: LifeBuoy, activeColor: 'border-amber-500 text-amber-400 bg-amber-500/10' },
    { id: 'admin', label: 'Administrator', icon: Building2, activeColor: 'border-purple-500 text-purple-400 bg-purple-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Anchor className="text-slate-950 stroke-[2.5]" size={26} />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight block">SMART FISHERMEN</span>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">SAFETY & RESCUE SYSTEM</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create Your Account</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Select your portal role to register</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/auth/login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <LockKeyhole size={14} />
              <span>Login</span>
            </Link>
          </div>
        </header>

        {/* Role Tab Selector Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800 backdrop-blur">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowPass({ pass: false, confirmPass: false });
                }}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-bold transition border ${isActive
                    ? tab.activeColor
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Single Focused Active Registration Form Card */}
        <div className="max-w-2xl mx-auto w-full">

          {/* 1. Fisherman Registration Form */}
          {activeTab === 'fisherman' && (
            <div className="bg-slate-900/70 backdrop-blur border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl transition duration-300">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/15 border-2 border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
                  <Anchor size={30} className="stroke-[2]" />
                </div>
                <h2 className="text-xl font-bold text-cyan-400">Fisherman Registration</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Register as a Fisherman to access boat tracking, weather updates and emergency alerts
                </p>
              </div>

              <form onSubmit={(e) => handleRegister(e, 'Fisherman', '/fisherman')} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="phone" type="tel" placeholder="Mobile Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                  </div>

                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="aadhaar" type="text" placeholder="Aadhaar Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="experience" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition appearance-none">
                      <option value="">Fishing Experience (Years)</option>
                      <option value="1-3">1 - 3 Years</option>
                      <option value="4-8">4 - 8 Years</option>
                      <option value="9+">9+ Years</option>
                    </select>
                  </div>

                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="state" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition appearance-none">
                      <option value="">Select State</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Goa">Goa</option>
                    </select>
                  </div>

                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="district" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition appearance-none">
                      <option value="">Select District</option>
                      <option value="Ernakulam">Ernakulam</option>
                      <option value="Kollam">Kollam</option>
                      <option value="Alappuzha">Alappuzha</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="password" type={showPass.pass ? 'text' : 'password'} placeholder="Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('pass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.pass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="confirmPassword" type={showPass.confirmPass ? 'text' : 'password'} placeholder="Confirm Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('confirmPass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.confirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 mt-4">
                  <UserPlus size={16} />
                  <span>Register as Fisherman</span>
                </button>
              </form>
              <p className="text-[11px] text-slate-500 text-center mt-4">
                By registering, you agree to our <a href="#" className="text-cyan-400 hover:underline">Terms & Conditions</a> and <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* 2. Family Member Registration Form */}
          {activeTab === 'family' && (
            <div className="bg-slate-900/70 backdrop-blur border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl transition duration-300">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
                  <Users size={30} className="stroke-[2]" />
                </div>
                <h2 className="text-xl font-bold text-emerald-400">Family Member Registration</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Register as a Family Member to track your loved ones and receive important updates
                </p>
              </div>

              <form onSubmit={(e) => handleRegister(e, 'Family', '/family')} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="phone" type="tel" placeholder="Mobile Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                  </div>

                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="relationship" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition appearance-none">
                      <option value="">Relationship with Fisherman</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
                  <input name="fishermanPhone" type="tel" placeholder="Fisherman Mobile Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                </div>

                <div className="relative">
                  <Home size={16} className="absolute left-3.5 top-3 text-slate-500" />
                  <textarea name="address" placeholder="Address" rows={2} required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="password" type={showPass.pass ? 'text' : 'password'} placeholder="Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('pass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.pass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="confirmPassword" type={showPass.confirmPass ? 'text' : 'password'} placeholder="Confirm Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('confirmPass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.confirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 mt-4">
                  <UserPlus size={16} />
                  <span>Register as Family Member</span>
                </button>
              </form>
              <p className="text-[11px] text-slate-500 text-center mt-4">
                By registering, you agree to our <a href="#" className="text-emerald-400 hover:underline">Terms & Conditions</a> and <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* 3. Rescue Officer Registration Form */}
          {activeTab === 'rescue' && (
            <div className="bg-slate-900/70 backdrop-blur border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl transition duration-300">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
                  <LifeBuoy size={30} className="stroke-[2]" />
                </div>
                <h2 className="text-xl font-bold text-amber-400">Rescue Officer Registration</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Register as a Rescue Officer to manage emergencies and coordinate rescue operations
                </p>
              </div>

              <form onSubmit={(e) => handleRegister(e, 'Rescue', '/rescue')} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="phone" type="tel" placeholder="Mobile Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                  </div>

                  <div className="relative">
                    <Shield size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="department" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition appearance-none">
                      <option value="">Department</option>
                      <option value="Indian Coast Guard">Indian Coast Guard</option>
                      <option value="Marine Police">Marine Police</option>
                      <option value="Disaster Management">Disaster Management Authority</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="relative">
                    <Award size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="designation" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition appearance-none">
                      <option value="">Designation</option>
                      <option value="Rescue Commander">Rescue Commander</option>
                      <option value="Patrol Pilot">Patrol Pilot</option>
                      <option value="Dispatcher">Emergency Dispatcher</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="employeeId" type="text" placeholder="Employee ID" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                  </div>

                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="station" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition appearance-none">
                      <option value="">Select Station / Unit</option>
                      <option value="Cochin Base">Cochin Base Unit</option>
                      <option value="Vizhinjam Base">Vizhinjam Marine Base</option>
                      <option value="Kollam Station">Kollam Station</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="password" type={showPass.pass ? 'text' : 'password'} placeholder="Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('pass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.pass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="confirmPassword" type={showPass.confirmPass ? 'text' : 'password'} placeholder="Confirm Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('confirmPass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.confirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-4">
                  <UserPlus size={16} />
                  <span>Register as Rescue Officer</span>
                </button>
              </form>
              <p className="text-[11px] text-slate-500 text-center mt-4">
                By registering, you agree to our <a href="#" className="text-amber-400 hover:underline">Terms & Conditions</a> and <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* 4. Administrator Registration Form */}
          {activeTab === 'admin' && (
            <div className="bg-slate-900/70 backdrop-blur border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl transition duration-300">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-500/15 border-2 border-purple-500/40 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-3">
                  <Building2 size={30} className="stroke-[2]" />
                </div>
                <h2 className="text-xl font-bold text-purple-400">Administrator Registration</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Register as an Administrator to manage system, users, boats and overall operations
                </p>
              </div>

              <form onSubmit={(e) => handleRegister(e, 'Admin', '/admin')} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="phone" type="tel" placeholder="Mobile Number" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                  </div>

                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="department" type="text" placeholder="Department / Organization" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Award size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <select name="designation" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500 transition appearance-none">
                      <option value="">Designation</option>
                      <option value="System Administrator">System Administrator</option>
                      <option value="Fisheries Officer">Fisheries Officer</option>
                      <option value="Maritime Auditor">Maritime Auditor</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="employeeId" type="text" placeholder="Employee ID" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="password" type={showPass.pass ? 'text' : 'password'} placeholder="Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('pass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.pass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input name="confirmPassword" type={showPass.confirmPass ? 'text' : 'password'} placeholder="Confirm Password" required className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
                    <button type="button" onClick={() => toggleShowPass('confirmPass')} className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300">
                      {showPass.confirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 mt-4">
                  <UserPlus size={16} />
                  <span>Register as Administrator</span>
                </button>
              </form>
              <p className="text-[11px] text-slate-500 text-center mt-4">
                By registering, you agree to our <a href="#" className="text-purple-400 hover:underline">Terms & Conditions</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}

        </div>

        {/* Bottom Security Banner */}
        <footer className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Secure Registration</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Your information is encrypted and secure with us.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Lock size={14} /> Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Wifi size={14} /> Secure
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400">
              <ShieldCheck size={14} /> Protected
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
