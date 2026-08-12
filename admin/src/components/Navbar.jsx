import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, LogOut, Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Building2 className="text-white stroke-[2.5]" size={20} />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">SFSRS</span>
            <span className="ml-2 text-xs font-semibold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
              Government Admin Portal
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-semibold">
          <ShieldCheck size={16} />
          <span>System Verified Authority</span>
        </div>

        <button className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-400 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-200">{user?.name || 'Admin Officer'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role || 'Administrator'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
