import React from 'react';
import EmergencyCard from '../../components/EmergencyCard';

export default function ActiveEmergencies() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Active Distress Calls & Emergency Beacon Feed</h1>
      <EmergencyCard emergency={{ id: 'SOS-901', vessel: 'Sea Harrier IV', captain: 'Capt. Ramesh', coords: '9.9124° N, 76.2411° E', time: '5m ago' }} onAssign={() => {}} />
    </div>
  );
}
