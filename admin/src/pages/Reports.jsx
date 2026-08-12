import React from 'react';
import Button from '../../../frontend/src/components/Button';

export default function Reports() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">System Reports & Incident Analytics</h1>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col gap-3">
        <p className="text-xs text-slate-300">Generate monthly safety metrics and rescue incident summaries.</p>
        <Button className="w-fit">Export PDF Report</Button>
      </div>
    </div>
  );
}
