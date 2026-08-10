import React from 'react';
import BoatStatus from '../../components/BoatStatus/BoatStatus';

export default function BoatStatusPage({ boat }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Vessel Telemetry Diagnostics</h2>
      <BoatStatus boat={boat} />
    </div>
  );
}
