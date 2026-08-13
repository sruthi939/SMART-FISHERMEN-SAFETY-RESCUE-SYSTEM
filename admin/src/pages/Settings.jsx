import React, { useState } from 'react';
import { Sliders, Save } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';

export default function Settings() {
  const [tab, setTab] = useState('general');
  const { addNotification } = useNotification();

  const [sysName, setSysName] = useState('Smart Fishermen Safety & Rescue System');
  const [sysEmail, setSysEmail] = useState('admin@sfsrs.gov.in');
  const [sysPhone, setSysPhone] = useState('+91 404 78 90123');
  const [timezone, setTimezone] = useState('(UTC+05:30) India Standard Time');

  const handleSave = (e) => {
    e.preventDefault();
    addNotification('System Configuration saved successfully!', 'info');
  };

  const navTabs = [
    { key: 'general', label: 'General' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'security', label: 'Security' },
    { key: 'roles', label: 'Roles & Permissions' },
    { key: 'system', label: 'System Configuration' },
    { key: 'backup', label: 'Backup & Restore' },
    { key: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Settings Sub-menu */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-1">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">General Settings</h3>
        {navTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${
              tab === t.key
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Settings Form Container */}
      <div className="md:col-span-3 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Sliders size={16} className="text-blue-600" />
          <span>General System Configuration</span>
        </h2>

        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-semibold">System Name</label>
            <input
              type="text"
              value={sysName}
              onChange={(e) => setSysName(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-semibold">System Email</label>
            <input
              type="email"
              value={sysEmail}
              onChange={(e) => setSysEmail(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-semibold">System Phone</label>
            <input
              type="text"
              value={sysPhone}
              onChange={(e) => setSysPhone(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-semibold">Time Zone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5">
            <Save size={14} />
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
}
