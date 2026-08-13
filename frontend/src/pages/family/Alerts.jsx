import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle2, CloudSun, MapPin, Fuel, Wrench } from 'lucide-react';
import Loader from '../../components/Loader';
import { alertService } from '../../services/alertService';
import { useNotification } from '../../hooks/useNotification';

export default function Alerts() {
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const res = await alertService.getAlerts();
        if (res.alerts) {
          setAlerts(res.alerts);
        }
      } catch (err) {
        console.error('Failed to load alerts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, []);

  if (loading) {
    return <Loader text="Loading Safety Alerts..." />;
  }

  const handleMarkRead = () => {
    addNotification('All safety alerts marked as read.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Safety Alerts</h1>
        <button onClick={handleMarkRead} className="text-xs font-bold text-blue-600 hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 w-fit text-xs font-bold">
        {['All', 'Important', 'System', 'Updates'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg transition ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs divide-y divide-slate-100">
        {alerts.map((item) => (
          <div key={item.id} className="py-3.5 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                item.severity === 'high' || item.type === 'warning' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                item.severity === 'low' || item.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 font-extrabold text-xs">{item.title}</strong>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.message || item.desc}</p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0">{item.time || 'Today'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
