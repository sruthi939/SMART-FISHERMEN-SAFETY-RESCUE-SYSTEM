import React from 'react';
import LiveMap from '../../components/LiveMap/LiveMap';

export default function BoatTracking({ boat }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Live GPS Radar Map</h2>
      <LiveMap lat={boat?.latitude} lon={boat?.longitude} />
    </div>
  );
}
