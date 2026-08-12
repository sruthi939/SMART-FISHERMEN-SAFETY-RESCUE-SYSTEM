import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ship, CheckCircle2 } from 'lucide-react';

export default function BoatDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState('crew');

  const boat = {
    name: 'Sea Queen',
    regNo: id || 'TN 07 MF 4587',
    status: 'Active',
    owner: 'Arun Kumar (FSH1001)',
    type: 'Mechanized',
    length: '32 ft',
    year: '2021',
    engine: '200 HP',
    homePort: 'Rameswaram',
    insuranceValid: 'Valid (31-12-2025)',
    equipment: [
      { name: 'GPS Tracker', status: 'Active' },
      { name: 'VHF Radio', status: 'Active' },
      { name: 'AIS System', status: 'Active' },
      { name: 'EPIRB', status: 'Active' },
      { name: 'Life Raft', status: 'Active' },
      { name: 'Fire Extinguisher', status: 'Active' },
    ],
    crew: [
      { name: 'Mano', role: 'Captain', phone: '+91 98765 43210' },
      { name: 'Arun', role: 'Fisherman', phone: '+91 87654 32109' }
    ]
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/boats" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600">
        <ArrowLeft size={14} /> Back to Registered Boats
      </Link>

      {/* Top Banner Overview */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-500/30 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-inner">
            <Ship size={36} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{boat.name}</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full border border-emerald-500/40 uppercase">
                {boat.status}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">Registration No: {boat.regNo}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs w-full md:w-auto text-left">
          <div><span className="text-slate-400 block text-[10px]">Owner:</span><span className="font-bold">{boat.owner}</span></div>
          <div><span className="text-slate-400 block text-[10px]">Type:</span><span className="font-semibold">{boat.type}</span></div>
          <div><span className="text-slate-400 block text-[10px]">Length:</span><span className="font-mono">{boat.length}</span></div>
          <div><span className="text-slate-400 block text-[10px]">Engine:</span><span className="font-semibold">{boat.engine}</span></div>
        </div>
      </div>

      {/* Middle Equipment & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Boat Specifications */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">Boat Information</h3>
          <div className="flex justify-between"><span className="text-slate-400">Registration No:</span><span className="font-mono font-bold text-blue-500">{boat.regNo}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Registration Date:</span><span>15-03-2021</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Expiry Date:</span><span>14-03-2026</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Home Port:</span><span className="font-semibold">{boat.homePort}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Insurance Status:</span><span className="font-extrabold text-emerald-600">{boat.insuranceValid}</span></div>
        </div>

        {/* Safety Equipment Checklist */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">Safety Equipment Checklist</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {boat.equipment.map((eq, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">{eq.name}</span>
                <span className="text-emerald-500 font-extrabold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 size={12} /> Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-2 text-xs font-bold">
          <button onClick={() => setTab('crew')} className={tab === 'crew' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Crew (6)</button>
          <button onClick={() => setTab('docs')} className={tab === 'docs' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Documents</button>
          <button onClick={() => setTab('maint')} className={tab === 'maint' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Maintenance</button>
          <button onClick={() => setTab('trips')} className={tab === 'trips' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Trips</button>
        </div>

        {tab === 'crew' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold">
              <tr><th className="p-2">Name</th><th className="p-2">Role</th><th className="p-2">Phone</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {boat.crew.map((c, idx) => (
                <tr key={idx}>
                  <td className="p-2 font-bold">{c.name}</td>
                  <td className="p-2 text-slate-400">{c.role}</td>
                  <td className="p-2 font-mono">{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
