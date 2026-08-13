import React, { useState } from 'react';
import { FileText, Navigation, ShieldAlert, LifeBuoy, User, Lock, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

export default function Analytics() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addNotification('Passwords do not match.', 'error');
      return;
    }
    addNotification('Admin password updated successfully!', 'info');
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const stats = [
    { label: 'Total Trips', val: '1,248', icon: FileText, color: 'text-blue-600' },
    { label: 'Total Distance', val: '65,432 km', sub: '+0%', icon: Navigation, color: 'text-emerald-600' },
    { label: 'SOS Alerts', val: '18', icon: ShieldAlert, color: 'text-amber-600' },
    { label: 'Rescues', val: '24', icon: LifeBuoy, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-xs text-slate-500 font-semibold">{s.label}</p>
                <h3 className="text-xl font-black text-slate-900 mt-1">{s.val}</h3>
              </div>
              <Icon size={24} className={s.color} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin User Details Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-500 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-xs">
            <User size={36} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name || 'Admin User'}</h2>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">Super Administrator</p>
          </div>

          <div className="w-full pt-4 border-t border-slate-100 space-y-2.5 text-xs text-left text-slate-600">
            <div className="flex justify-between"><span className="text-slate-400">Email:</span><span className="font-semibold text-slate-900">{user?.email || 'admin@gov.in'}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Phone:</span><span className="font-mono text-slate-900">+91 90000 00000</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Login:</span><span className="font-mono text-slate-500">14 May 2025, 09:15 AM</span></div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock size={16} className="text-blue-600" />
            <span>Change Password</span>
          </h2>

          <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-semibold">Current Password</label>
              <input
                type="password"
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-semibold">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-semibold">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5">
              <Check size={14} />
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
