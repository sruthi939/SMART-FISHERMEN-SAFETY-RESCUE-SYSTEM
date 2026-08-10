import React from 'react';
import LocationMap from '../../components/LocationMap/LocationMap';

export default function LiveTracking({ boat }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Live GPS Vessel Tracking</h2>
      <LocationMap lat={boat?.latitude} lon={boat?.longitude} boatName={boat?.name} />
    </div>
  );
}
