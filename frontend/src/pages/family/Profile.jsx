import React from 'react';
import Input from '../../components/Input';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-extrabold text-white">Family Profile</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <Input label="Family Member Name" defaultValue="Priya Ramesh" />
        <Input label="Relationship" defaultValue="Spouse" />
        <Input label="Emergency Contact Phone" defaultValue="+91 9447123456" />
      </div>
    </div>
  );
}
