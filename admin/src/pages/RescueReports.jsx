import React, { useState } from 'react';
import { Search, Download, LifeBuoy } from 'lucide-react';

export default function RescueReports() {
  const [search, setSearch] = useState('');

  const reports = [
    { id: 'RES-2025-052', time: '14 May 2025, 11:30 AM', boat: 'Sea Queen (TN 07 MF 4587)', location: 'Palk Bay', type: 'Man Overboard', status: 'Completed' },
    { id: 'RES-2025-051', time: '13 May 2025, 08:45 PM', boat: 'Ocean Star (TN 04 MF 1034)', location: 'Gulf of Mannar', type: 'Engine Failure', status: 'Completed' },
    { id: 'RES-2025-050', time: '12 May 2025, 02:30 PM', boat: 'Lucky One (TN 10 MF 9876)', location: 'Palk Bay', type: 'Medical Emergency', status: 'Completed' },
    { id: 'RES-2025-049', time: '11 May 2025, 07:15 AM', boat: 'Blue Whale (TN 08 MF 9900)', location: 'Palk Bay', type: 'SOS', status: 'Completed' },
    { id: 'RES-2025-048', time: '10 May 2025, 10:10 PM', boat: 'King Fisher (TN 12 MF 3488)', location: 'Gulf of Mannar', type: 'Bad Weather', status: 'Cancelled' },
    { id: 'RES-2025-047', time: '10 May 2025, 05:05 AM', boat: 'Deep Sea (TN 02 MF 1307)', location: 'Palk Bay', type: 'Man Overboard', status: 'Completed' },
    { id: 'RES-2025-046', time: '09 May 2025, 04:20 PM', boat: 'Golden Fish (TN 19 MF 0753)', location: 'Gulf of Mannar', type: 'Engine Failure', status: 'Completed' },
  ];

  const filtered = reports.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) || 
    r.boat.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LifeBuoy className="text-blue-500" size={20} />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Rescue Operations Reports ({reports.length})</h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by incident ID or boat name..."
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
              <th className="p-3">Incident ID</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Boat / Fisherman</th>
              <th className="p-3">Location</th>
              <th className="p-3">Type</th>
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
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    item.status === 'Completed'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/40'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-600 border-red-500/40'
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
