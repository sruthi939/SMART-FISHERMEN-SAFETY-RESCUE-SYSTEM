import React from 'react';
import Map from '../../components/Map';

export default function LiveLocation() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Live Fisherman Map</h1>
      <Map title="Fisherman Real-Time GPS Marker" />
    </div>
  );
}
