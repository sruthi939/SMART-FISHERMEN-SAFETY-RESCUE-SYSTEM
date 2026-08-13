import React, { useState, useEffect } from 'react';
import EmergencyCard from '../components/EmergencyCard';
import Loader from '../components/Loader';
import { emergencyService } from '../services/emergencyService';
import { useNotification } from '../hooks/useNotification';

export default function Emergencies() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const fetchEmergencies = async () => {
    try {
      const res = await emergencyService.getActiveEmergencies();
      setEmergencies(res.emergencies || []);
    } catch (err) {
      console.error('Failed to fetch emergencies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (emergency) => {
    try {
      await emergencyService.resolveEmergency(emergency.id);
      addNotification(`Rescue Unit Assigned to ${emergency.vessel}`, 'info');
      fetchEmergencies();
    } catch (err) {
      addNotification('Failed to assign rescue unit', 'error');
    }
  };

  if (loading) return <Loader text="Loading Active SOS Emergencies..." />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-white">Active Emergency Distress Log</h1>
        <button onClick={fetchEmergencies} className="text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:text-purple-400">
          Refresh Live Feed
        </button>
      </div>

      {emergencies.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
          No active distress signals reported. All vessels operating in safe parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencies.map(e => (
            <EmergencyCard key={e.id} emergency={e} onAssign={handleAssign} />
          ))}
        </div>
      )}
    </div>
  );
}
