import React, { useState } from 'react';
import { Bell, Moon, Globe, Sliders, Lock, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Settings() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-black text-slate-900">Settings</h1>

      <div className="space-y-4 text-xs">
        {/* Toggle 1: Notifications */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Notifications</span>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full p-1 transition duration-200 ease-in-out ${notifications ? 'bg-emerald-500' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle 2: Dark Mode */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Dark Mode</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 rounded-full p-1 transition duration-200 ease-in-out ${darkMode ? 'bg-emerald-500' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Option 3: Language */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Language</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-semibold">
            <span>English</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Option 4: Units */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Sliders size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Units</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-semibold">
            <span>Metric (km, °C)</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Option 5: Change Password */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Change Password</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>

        {/* Option 6: Privacy Policy */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Privacy Policy</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>

        {/* Option 7: Help & Support */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <HelpCircle size={18} className="text-slate-500" />
            <span className="font-bold text-slate-900">Help & Support</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>

        {/* Logout */}
        <button onClick={logout} className="flex items-center gap-3 py-3 px-2 text-red-600 font-bold hover:bg-red-50 rounded-lg w-full transition mt-4">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
