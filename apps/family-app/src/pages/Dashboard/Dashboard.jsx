import React from 'react';
import BoatCard from '../../components/BoatCard/BoatCard';

export default function Dashboard({ boat }) {
  return (
    <div className="space-y-3">
      <BoatCard boat={boat} />
    </div>
  );
}
