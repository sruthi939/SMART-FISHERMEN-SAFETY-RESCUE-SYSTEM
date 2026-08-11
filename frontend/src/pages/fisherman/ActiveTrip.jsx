import React from 'react';
import Map from '../../components/Map';

export default function ActiveTrip() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Active Voyage Telemetry</h1>
      <Map title="Live Active Voyage Coordinates" />
    </div>
  );
}
