import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Loader from '../components/Loader';
import { boatService } from '../services/boatService';

export default function Boats() {
  const [search, setSearch] = useState('');
  const [boats, setBoats] = useState([
    { regNo: 'TN 07 MF 4587', name: 'Sea Queen', owner: 'Arun Kumar', type: 'Mechanized', length: '32 ft', status: 'Active' },
    { regNo: 'TN 04 MF 1034', name: 'Ocean Star', owner: 'Manoj S.', type: 'Mechanized', length: '30 ft', status: 'Active' },
    { regNo: 'TN 10 MF 9876', name: 'Lucky One', owner: 'Suresh R.', type: 'Mechanized', length: '35 ft', status: 'Active' },
    { regNo: 'TN 08 MF 9900', name: 'Blue Whale', owner: 'Rajesh P.', type: 'Mechanized', length: '30 ft', status: 'Under Maintenance' },
    { regNo: 'TN 12 MF 3488', name: 'King Fisher', owner: 'Karthik K.', type: 'Mechanized', length: '28 ft', status: 'Active' },
    { regNo: 'TN 02 MF 1307', name: 'Deep Sea', owner: 'Muthuvel', type: 'Mechanized', length: '31 ft', status: 'Active' },
    { regNo: 'TN 19 MF 0753', name: 'Golden Fish', owner: 'Vijay Kumar', type: 'Mechanized', length: '27 ft', status: 'Active' },
    { regNo: 'TN 14 MF 8842', name: 'Marine King', owner: 'Prakash M.', type: 'Mechanized', length: '33 ft', status: 'Inactive' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoats();
  }, []);

  const fetchBoats = async () => {
    try {
      const res = await boatService.getAll();
      if (res.boats && res.boats.length > 0) {
        const apiBoats = res.boats.map((b, i) => ({
          regNo: b.regNumber || `TN 07 MF ${4000 + i}`,
          name: b.name,
          owner: b.captainName || 'Arun Kumar',
          type: 'Mechanized',
          length: '32 ft',
          status: b.status || 'Active'
        }));
        setBoats(prev => [...apiBoats, ...prev]);
      }
    } catch (err) {
      console.error('Error fetching boats:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBoats = boats.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.regNo.toLowerCase().includes(search.toLowerCase()) ||
    b.owner.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Loading Registered Vessels Database..." />;

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Registered Boats ({boats.length})</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Boats by name or registration..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs pl-8 pr-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-lg transition">
            <Download size={14} />
            <span>Export</span>
          </button>

          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-600/30 transition shrink-0">
            <Plus size={15} />
            <span>Add Boat</span>
          </button>
        </div>
      </div>

      {/* Vessels Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3">Reg. No.</th>
              <th className="p-3">Boat Name</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Boat Type</th>
              <th className="p-3">Length</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
            {filteredBoats.map((boat, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{boat.regNo}</td>
                <td className="p-3 font-bold">{boat.name}</td>
                <td className="p-3">{boat.owner}</td>
                <td className="p-3">{boat.type}</td>
                <td className="p-3 font-mono text-slate-500">{boat.length}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    boat.status === 'Active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/40'
                      : boat.status === 'Under Maintenance'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border-amber-500/40'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-600 border-red-500/40'
                  }`}>
                    {boat.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <Link to={`/admin/boats/${boat.regNo}`} title="View Boat Details" className="hover:text-blue-500 p-1">
                      <Eye size={16} />
                    </Link>
                    <button title="Edit" className="hover:text-amber-500 p-1"><Edit size={16} /></button>
                    <button title="Delete" className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
