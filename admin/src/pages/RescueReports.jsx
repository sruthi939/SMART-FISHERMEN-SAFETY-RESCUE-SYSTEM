import React, { useState, useEffect } from 'react';
import { Search, Download, LifeBuoy } from 'lucide-react';
import Loader from '../components/Loader';
import { reportService } from '../services/reportService';

export default function RescueReports() {
  const [search, setSearch] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await reportService.getRescueReports();
      setReports(res.reports || []);
    } catch (err) {
      console.error('Error fetching rescue reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = reports.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) || 
    r.boat.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Loading Rescue Operations Log..." />;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LifeBuoy className="text-blue-600" size={20} />
          <h2 className="text-sm font-bold text-slate-900">Rescue Operations Reports ({reports.length})</h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by incident ID or boat name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-600/30 transition shrink-0">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="p-3">Incident ID</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Boat / Fisherman</th>
              <th className="p-3">Location</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="p-3 font-mono font-bold text-blue-600">{item.id}</td>
                <td className="p-3 text-slate-500 font-mono">{item.time}</td>
                <td className="p-3 font-bold">{item.boat}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3 font-semibold">{item.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    item.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-500/30'
                      : 'bg-red-50 text-red-600 border-red-500/30'
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
