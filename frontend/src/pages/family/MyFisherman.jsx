import React from 'react';
import FishermanCard from '../../components/FishermanCard';

export default function MyFisherman() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Tracked Family Fisherman</h1>
      <FishermanCard fisherman={{ name: 'Capt. Ramesh Kumar', phone: '+91 9876543210', harbor: 'Cochin Harbor' }} />
    </div>
  );
}
