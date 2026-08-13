import React from 'react';
import { User, Mail, Phone, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();

  const profileData = {
    name: user?.name || 'Anitha',
    role: 'Family Member • Primary Contact',
    email: user?.email || 'anitha@gmail.com',
    phone: user?.phone || '+91 98765 12345',
    memberSince: 'Jan 10, 2024'
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-md mx-auto">
      <h1 className="text-xl font-black text-slate-900 text-center">Profile</h1>

      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-600 font-black text-2xl flex items-center justify-center">
          {profileData.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">{profileData.name}</h2>
          <span className="text-xs text-slate-500 font-semibold">{profileData.role}</span>
        </div>
      </div>

      <div className="space-y-3.5 text-xs">
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Mail size={14} /> Email</span>
          <strong className="text-slate-900 font-mono">{profileData.email}</strong>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Phone size={14} /> Phone</span>
          <strong className="text-slate-900 font-mono">{profileData.phone}</strong>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Calendar size={14} /> Member Since</span>
          <strong className="text-slate-900">{profileData.memberSince}</strong>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full text-xs py-2.5 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl flex items-center justify-center gap-2 transition"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
}
