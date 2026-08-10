import React from 'react';
import SOSButton from '../../components/SOSButton/SOSButton';

export default function Emergency({ onTriggerSOS, sosActive }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-white uppercase text-center">Emergency Mayday Dispatch</h2>
      <SOSButton onTriggerSOS={onTriggerSOS} isActive={sosActive} />
    </div>
  );
}
