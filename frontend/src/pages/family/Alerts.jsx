import React from 'react';
import AlertCard from '../../components/AlertCard';

export default function Alerts() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Family Safety Alerts</h1>
      <AlertCard title="Routine Check-in Alert" message="Capt. Ramesh transponder pinged 5 mins ago. All systems safe." time="5m ago" severity="info" />
    </div>
  );
}
