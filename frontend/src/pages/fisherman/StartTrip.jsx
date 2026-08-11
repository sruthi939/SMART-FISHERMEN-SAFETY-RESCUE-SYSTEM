import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function StartTrip() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Start New Sea Voyage</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <Input label="Expected Voyage Duration (Hours)" defaultValue="24" />
        <Input label="Crew Count" defaultValue="4" />
        <Input label="Target Zone / Sector" defaultValue="Sector 4B" />
        <Button className="mt-2">Initialize Voyage & Transponder</Button>
      </div>
    </div>
  );
}
