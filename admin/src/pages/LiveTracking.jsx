import React from 'react';
import Map from '../../../frontend/src/components/Map';

export default function LiveTracking() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Live Maritime Radar & Geofence Monitor</h1>
      <Map title="Real-Time Fleet Positioning" />
    </div>
  );
}
