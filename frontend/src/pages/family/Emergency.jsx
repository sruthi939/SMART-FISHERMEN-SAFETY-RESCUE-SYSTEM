import React from 'react';
import Button from '../../components/Button';

export default function Emergency() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white text-red-400">Emergency Family Hotline</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
        <p className="text-xs text-slate-300">If you are unable to contact your fisherman or suspect danger, click below to notify Coast Guard Rescue Command immediately.</p>
        <Button variant="danger">Request Coast Guard Verification</Button>
      </div>
    </div>
  );
}
