import React from 'react';
import Input from '../../components/Input';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Rescue Commander Profile</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <Input label="Commander Name" defaultValue="Cmdr. Vikram Singh" />
        <Input label="Coast Guard Squadron ID" defaultValue="CG-SQD-ALPHA-07" />
        <Input label="Command Center Base" defaultValue="Fort Kochi Base" />
      </div>
    </div>
  );
}
