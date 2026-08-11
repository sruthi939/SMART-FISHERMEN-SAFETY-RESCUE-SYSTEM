import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, ShieldAlert, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ portalName, onSOS }) {
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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Anchor className="text-slate-950 stroke-[2.5]" size={20} />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">SFSRS</span>
            <span className="ml-2 text-xs font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              {portalName}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {onSOS && (
          <button
            onClick={onSOS}
            className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-red-600/30 animate-pulse transition"
          >
            <ShieldAlert size={16} />
            <span>SOS DISTRESS</span>
          </button>
        )}

        <button className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-200">{user?.name || 'User'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role || 'Guest'}</p>
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
