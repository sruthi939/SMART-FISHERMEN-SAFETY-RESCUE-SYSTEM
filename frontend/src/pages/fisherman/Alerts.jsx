import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudSun, CheckCircle2, MessageSquare, Wrench } from 'lucide-react';
import Loader from '../../components/Loader';
import { alertService } from '../../services/alertService';
import { useNotification } from '../../hooks/useNotification';

export default function Alerts() {
  const { addNotification } = useNotification();
  const [tab, setTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await alertService.getAlerts();
      setAlerts(res.alerts || []);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = () => {
    addNotification('All safety advisories marked as read.', 'info');
  };

  if (loading) return <Loader text="Loading Coastal Safety Alerts..." />;

  const filtered = alerts.filter(a => {
    if (tab === 'Unread') return a.severity === 'critical' || a.severity === 'warning';
    if (tab === 'Important') return a.severity === 'critical';
    return true;
  });

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
        {filtered.length === 0 ? (
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400">
            No active alerts in this tab category.
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {item.severity === 'critical' ? (
                  <AlertTriangle size={18} className="text-red-500 mt-0.5" />
                ) : item.severity === 'warning' ? (
                  <AlertTriangle size={18} className="text-amber-500 mt-0.5" />
                ) : (
                  <CloudSun size={18} className="text-blue-600 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.message}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">Live</span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleMarkAllRead}
        className="text-xs text-blue-600 font-bold hover:underline block text-center w-full pt-2"
      >
        Mark All as Read
      </button>
    </div>
  );
}
