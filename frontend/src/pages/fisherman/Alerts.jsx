import React from 'react';
import AlertCard from '../../components/AlertCard';

export default function Alerts() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Weather & Hazard Advisories</h1>
      <AlertCard title="High Tide Alert" message="Sea height rising above 2.8 meters after 20:00 HRS." time="15m ago" severity="warning" />
    </div>
  );
}
