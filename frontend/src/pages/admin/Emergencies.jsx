import React from 'react';
import EmergencyCard from '../../components/EmergencyCard';

export default function Emergencies() {
  const emergencies = [
    { id: 'SOS-901', vessel: 'Sea Harrier IV', captain: 'Capt. Ramesh', coords: '9.9124° N, 76.2411° E', time: '5 mins ago' }
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Active Emergency Distress Log</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencies.map(e => <EmergencyCard key={e.id} emergency={e} onAssign={() => {}} />)}
      </div>
    </div>
  );
}
