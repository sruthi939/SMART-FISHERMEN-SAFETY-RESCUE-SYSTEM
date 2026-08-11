import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Settings() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Fisherman Settings</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <Input label="Emergency Contact Person" defaultValue="Priya Ramesh (Wife)" />
        <Input label="Emergency Phone" defaultValue="+91 9447123456" />
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
