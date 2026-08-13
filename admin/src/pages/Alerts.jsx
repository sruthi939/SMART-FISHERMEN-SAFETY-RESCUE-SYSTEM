import React from 'react';
import AlertCard from '../components/AlertCard';

export default function Alerts() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Broadcast Safety Advisories</h1>
      <AlertCard title="High Waves Warning" message="Significant wave height exceeding 3.5m predicted along Malabar Coast." time="Just now" severity="warning" />
    </div>
  );
}
