import React from 'react';
import CrewList from '../../components/CrewList/CrewList';

export default function Crew({ crew }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Crew Manifest & Wearable Beacons</h2>
      <CrewList crew={crew} />
    </div>
  );
}
