import React from 'react';
import EmergencyAlert from '../../components/EmergencyAlert/EmergencyAlert';

export default function Emergency({ emergency }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Emergency Alerts</h2>
      <EmergencyAlert emergency={emergency} />
    </div>
  );
}
