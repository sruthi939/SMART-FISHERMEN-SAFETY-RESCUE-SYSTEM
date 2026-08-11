import React from 'react';
import BoatCard from '../../components/BoatCard';

export default function Boats() {
  const boats = [
    { name: 'Sea Harrier IV', regNumber: 'IND-KL-07-8821', speed: '12.4', battery: '94', status: 'Active' },
    { name: 'Ocean Star 2', regNumber: 'IND-KL-07-3312', speed: '0.0', battery: '100', status: 'Safe' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Registered Vessels Database</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boats.map((b, idx) => <BoatCard key={idx} boat={b} />)}
      </div>
    </div>
  );
}
