import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Settings() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">System Settings & Thresholds</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
        <Input label="Max Safe Zone Distance (NM)" defaultValue="15" />
        <Input label="Emergency SOS Alert Sound Volume" defaultValue="100%" />
        <Button>Save System Settings</Button>
      </div>
    </div>
  );
}
