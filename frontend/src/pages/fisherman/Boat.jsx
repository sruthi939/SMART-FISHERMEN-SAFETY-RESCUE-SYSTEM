import React from 'react';
import BoatCard from '../../components/BoatCard';

export default function Boat() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Vessel Specification & Hardware</h1>
      <BoatCard boat={{ name: 'Sea Harrier IV', regNumber: 'IND-KL-07-8821', speed: '12.4', battery: '94', status: 'Active' }} />
    </div>
  );
}
