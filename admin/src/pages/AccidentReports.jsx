import React, { useState } from 'react';
import { Search, Download, AlertTriangle } from 'lucide-react';

export default function AccidentReports() {
  const [search, setSearch] = useState('');

  const accidents = [
    { id: 'ACC-2025-031', time: '14 May 2025, 09:15 AM', boat: 'Sea Queen', location: 'Palk Bay', type: 'Collision', severity: 'Minor', status: 'Under Review' },
    { id: 'ACC-2025-030', time: '13 May 2025, 07:40 PM', boat: 'Ocean Star', location: 'Palk Bay', type: 'Equipment Damage', severity: 'Minor', status: 'Under Review' },
    { id: 'ACC-2025-029', time: '12 May 2025, 11:10 AM', boat: 'Lucky One', location: 'Gulf of Mannar', type: 'Capsized (Minor)', severity: 'Major', status: 'Under Review' },
    { id: 'ACC-2025-028', time: '11 May 2025, 03:00 PM', boat: 'Blue Whale', location: 'Palk Bay', type: 'Fire on Board', severity: 'Major', status: 'Under Review' },
    { id: 'ACC-2025-027', time: '10 May 2025, 08:30 AM', boat: 'King Fisher', location: 'Gulf of Mannar', type: 'Grounding', severity: 'Minor', status: 'Under Review' },
    { id: 'ACC-2025-026', time: '09 May 2025, 06:00 PM', boat: 'Deep Sea', location: 'Gulf of Mannar', type: 'Flooding', severity: 'Major', status: 'Closed' },
    { id: 'ACC-2025-025', time: '08 May 2025, 04:20 AM', boat: 'Golden Fish', location: 'Palk Bay', type: 'Collision', severity: 'Minor', status: 'Closed' },
  ];

  const filtered = accidents.filter(a => 
    a.id.toLowerCase().includes(search.toLowerCase()) || 
    a.boat.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={20} />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Accident Reports ({accidents.length})</h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by report ID or boat name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-600/30 transition shrink-0">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3">Report ID</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Boat</th>
              <th className="p-3">Location</th>
              <th className="p-3">Type</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                <td className="p-3 text-slate-500 font-mono">{item.time}</td>
                <td className="p-3 font-bold">{item.boat}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3 font-semibold">{item.type}</td>
                <td className="p-3 font-bold">
                  <span className={item.severity === 'Major' ? 'text-red-500' : 'text-amber-500'}>
                    {item.severity}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    item.status === 'Under Review'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border-amber-500/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
