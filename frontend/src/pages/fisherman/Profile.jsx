import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Fisherman Profile</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <Input label="Name" defaultValue="Capt. Ramesh Kumar" />
        <Input label="License Number" defaultValue="KL-FISH-9012" />
        <Input label="Primary Harbor" defaultValue="Cochin Harbor" />
        <Button className="mt-2">Update Profile</Button>
      </div>
    </div>
  );
}
