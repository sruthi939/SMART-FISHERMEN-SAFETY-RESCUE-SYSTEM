import React from 'react';
import Button from '../../components/Button';

export default function AssignRescue() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Assign Rescue Team to Target</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <p className="text-xs text-slate-300">Assign FPV-102 Squadron Alpha to Target #SOS-901 (Sector 4B)</p>
        <Button className="mt-2">Dispatch Interceptor Fast Boat</Button>
      </div>
    </div>
  );
}
