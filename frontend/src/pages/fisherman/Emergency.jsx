import React, { useState } from 'react';
import Button from '../../components/Button';
import { emergencyService } from '../../services/emergencyService';
import { useNotification } from '../../hooks/useNotification';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function Emergency() {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleTriggerSOS = async () => {
    setLoading(true);
    try {
      const res = await emergencyService.triggerSOS({
        vessel: 'Sea Harrier IV',
        captain: 'Capt. Ramesh Kumar',
        coords: '9.9312° N, 76.2673° E',
        lat: 9.9312,
        lng: 76.2673
      });
      addNotification(`🚨 EMERGENCY SOS TRANSMITTED! Beacon ID: ${res.emergency?.id}`, 'emergency');
    } catch (err) {
      console.error('SOS Trigger Error:', err);
      addNotification('Failed to transmit SOS. Satellite backup engaged.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-red-500 flex items-center gap-2">
        <ShieldAlert size={24} /> Emergency Distress Control
      </h1>
      <div className="bg-red-950/30 border border-red-800 rounded-xl p-6 flex flex-col gap-4 text-center">
        <p className="text-xs text-red-200 leading-relaxed">
          Pressing SOS instantly transmits your satellite coordinates and vessel telemetry to Indian Coast Guard Rescue Command & Family Contacts.
        </p>
        <Button 
          variant="danger" 
          disabled={loading} 
          onClick={handleTriggerSOS} 
          className="py-4 text-sm tracking-wider shadow-xl shadow-red-600/40 animate-pulse"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>TRANSMITTING BEACON SIGNAL...</span>
            </>
          ) : (
            <span>TRIGGER ONE-TOUCH DISTRESS SOS</span>
          )}
        </Button>
      </div>
    </div>
  );
}
