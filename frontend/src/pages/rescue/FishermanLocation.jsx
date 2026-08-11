import React from 'react';
import Map from '../../components/Map';

export default function FishermanLocation() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Target Fisherman Live GPS Beacon Tracker</h1>
      <Map title="Distress Signal Coordinate Vector" />
    </div>
  );
}
