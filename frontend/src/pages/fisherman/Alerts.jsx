import React, { useState } from 'react';
import { AlertTriangle, CloudSun, CheckCircle2, MessageSquare, Wrench } from 'lucide-react';

export default function Alerts() {
  const [tab, setTab] = useState('All');

  const alerts = [
    { id: 1, title: 'Low Fuel Warning', desc: 'Fuel level is below 35%', time: '08:45 AM', type: 'warning' },
    { id: 2, title: 'Weather Update', desc: 'Moderate winds in your area', time: '05:10 AM', type: 'info' },
    { id: 3, title: 'Engine Check Required', desc: 'Next check in 20 hours', time: 'Yesterday', type: 'warning' },
    { id: 4, title: 'All Systems Normal', desc: 'Everything is working fine', time: 'Yesterday', type: 'success' },
    { id: 5, title: 'New Message from Family', desc: 'Anitha: Take Care and be safe', time: 'May 13', type: 'message' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Alerts</h1>
      </div>

      {/* Sub-tabs matching mockup screen 7 */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        {['All', 'Unread', 'Important'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2.5 transition border-b-2 ${
              tab === t ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {alerts.map((item) => (
          <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {item.type === 'warning' && <AlertTriangle size={18} className="text-amber-500 mt-0.5" />}
              {item.type === 'info' && <CloudSun size={18} className="text-blue-600 mt-0.5" />}
              {item.type === 'success' && <CheckCircle2 size={18} className="text-emerald-600 mt-0.5" />}
              {item.type === 'message' && <MessageSquare size={18} className="text-purple-600 mt-0.5" />}
              <div>
                <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.time}</span>
          </div>
        ))}
      </div>

      <button className="text-xs text-blue-600 font-bold hover:underline block text-center w-full pt-2">
        Mark All as Read
      </button>
    </div>
  );
}
