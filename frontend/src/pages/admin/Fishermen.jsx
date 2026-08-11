import React from 'react';
import FishermanCard from '../../components/FishermanCard';

export default function Fishermen() {
  const list = [
    { id: 1, name: 'Capt. Ramesh Kumar', phone: '+91 9876543210', harbor: 'Cochin Harbor' },
    { id: 2, name: 'Capt. Suresh Nair', phone: '+91 9876543211', harbor: 'Munambam Port' },
    { id: 3, name: 'Capt. Antony Joseph', phone: '+91 9876543212', harbor: 'Kollam Coast' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Registered Fishermen Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(f => <FishermanCard key={f.id} fisherman={f} />)}
      </div>
    </div>
  );
}
