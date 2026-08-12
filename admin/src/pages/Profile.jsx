import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Phone, Lock, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

export default function Profile() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [password, setPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    addNotification('Profile security settings updated.', 'info');
    setPassword('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xl shadow-md">
          {user?.name ? user.name.charAt(0) : 'A'}
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">{user?.name || 'Admin User'}</h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mt-1 border border-blue-500/30">
            <ShieldCheck size={14} /> Super Administrator
          </span>
        </div>

        <div className="w-full pt-4 border-t border-slate-100 space-y-3 text-xs text-left text-slate-600">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-blue-600" />
            <span>Email: <strong className="text-slate-900">{user?.email || 'admin@sfsrs.gov.in'}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-blue-600" />
            <span>Phone: <strong className="text-slate-900">+91 90000 00000</strong></span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Lock size={16} className="text-blue-600" />
          <span>Security & Authentication</span>
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-semibold">Update Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5">
            <Save size={14} />
            <span>Save Profile Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
}
