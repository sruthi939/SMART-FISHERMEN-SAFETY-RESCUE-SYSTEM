import React from 'react';
import { FileCheck, Upload } from 'lucide-react';
import Button from '../../components/Button';

export default function Documents() {
  const docs = [
    { title: 'Boat Registration', subtitle: 'TN 07 MF 4587' },
    { title: 'Fishing License', subtitle: 'IND-FISH-2025-4587' },
    { title: 'Insurance Certificate', subtitle: 'Valid till 31-Dec-2025' },
    { title: 'Safety Equipment Certificate', subtitle: 'Valid till 15-Nov-2025' },
    { title: 'Pollution Certificate', subtitle: 'Valid till 20-Oct-2025' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-white">Vessel Documents</h1>
        <p className="text-xs text-slate-400 mt-1">Official registrations & permits</p>
      </div>

      <div className="space-y-3">
        {docs.map((doc, i) => (
          <div key={i} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck size={20} className="text-cyan-400" />
              <div>
                <h4 className="font-bold text-sm text-white">{doc.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{doc.subtitle}</p>
              </div>
            </div>
            <button className="text-xs text-cyan-400 font-bold hover:underline">View Document</button>
          </div>
        ))}
      </div>

      <Button className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold">
        <Upload size={16} />
        <span>Upload Document</span>
      </Button>
    </div>
  );
}
