import React, { useState } from 'react';
import { User, Bell, Lock, Globe, HelpCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

export default function Settings() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: user?.name || 'Anitha',
    email: user?.email || 'anitha@gmail.com',
    phone: user?.phone || '+91 98765 12345',
    address: `${user?.district || 'Rameswaram'}, ${user?.state || 'Tamil Nadu'}, India`
  });

  const handleSave = (e) => {
    e.preventDefault();
    addNotification('Settings saved successfully!', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-black text-slate-900">Settings</h1>

      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Sub Tabs */}
        <div className="md:col-span-4 border-r border-slate-200 p-4 bg-slate-50/50 space-y-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeTab === 'profile' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User size={16} /> Profile Settings
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bell size={16} /> Notifications
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeTab === 'privacy' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock size={16} /> Privacy & Security
          </button>

          <button
            onClick={() => setActiveTab('language')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeTab === 'language' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe size={16} /> Language
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeTab === 'help' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle size={16} /> Help & Support
          </button>
        </div>

        {/* Form Area */}
        <div className="md:col-span-8 p-6 space-y-4">
          <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">Profile Settings</h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xs transition"
            >
              Edit Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
