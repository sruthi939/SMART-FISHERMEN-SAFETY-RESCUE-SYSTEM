import React from 'react';
import Button from '../../components/Button';

export default function Emergency() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white text-red-500">Emergency Distress Control</h1>
      <div className="bg-red-950/30 border border-red-800 rounded-xl p-6 flex flex-col gap-4 text-center">
        <p className="text-xs text-red-200">Pressing SOS instantly transmits your satellite coordinates to Coast Guard Rescue Squadrons & Family.</p>
        <Button variant="danger" className="py-4 text-sm tracking-wider">TRIGGER ONE-TOUCH DISTRESS SOS</Button>
      </div>
    </div>
  );
}
