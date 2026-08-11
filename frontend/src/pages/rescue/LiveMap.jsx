import React from 'react';
import Map from '../../components/Map';

export default function LiveMap() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Live Coast Guard Tactical Ocean Map</h1>
      <Map title="Tactical Rescue Vessel Positioning" />
    </div>
  );
}
