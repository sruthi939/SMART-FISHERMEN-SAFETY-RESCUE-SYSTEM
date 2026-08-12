import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, Plus, Eye, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import Loader from '../components/Loader';
import { fishermanService } from '../services/fishermanService';
import { authService } from '../services/authService';
import { useNotification } from '../hooks/useNotification';

export default function Fishermen() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('registered'); // 'registered' | 'pending'
  const [fishermen, setFishermen] = useState([
    { id: 'FSH1001', name: 'Arun Kumar', phone: '+91 98765 43210', district: 'Ramanathapuram', licenseNo: 'LIC-2024-1001', status: 'Active' },
    { id: 'FSH1002', name: 'Manoj S.', phone: '+91 87654 32109', district: 'Thoothukudi', licenseNo: 'LIC-2024-1002', status: 'Active' },
    { id: 'FSH1003', name: 'Suresh R.', phone: '+91 98765 43211', district: 'Nagapattinam', licenseNo: 'LIC-2024-1003', status: 'Active' },
    { id: 'FSH1004', name: 'Rajesh P.', phone: '+91 91234 56789', district: 'Kanyakumari', licenseNo: 'LIC-2024-1004', status: 'Expired' },
    { id: 'FSH1005', name: 'Karthik K.', phone: '+91 82345 67890', district: 'Pudukkottai', licenseNo: 'LIC-2024-1005', status: 'Active' },
    { id: 'FSH1006', name: 'Muthuvel', phone: '+91 91234 98760', district: 'Cuddalore', licenseNo: 'LIC-2024-1006', status: 'Active' },
    { id: 'FSH1007', name: 'Vijay Kumar', phone: '+91 90123 45678', district: 'Thanjavur', licenseNo: 'LIC-2024-1007', status: 'Active' },
    { id: 'FSH1008', name: 'Prakash M.', phone: '+91 99987 65434', district: 'Thoothukudi', licenseNo: 'LIC-2024-1008', status: 'Suspended' }
  ]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [fishRes, pendRes] = await Promise.all([
        fishermanService.getAll().catch(() => ({ fishermen: [] })),
        authService.getPendingUsers().catch(() => ({ pendingUsers: [] }))
      ]);

      if (fishRes.fishermen && fishRes.fishermen.length > 0) {
        const apiFish = fishRes.fishermen.map((f, i) => ({
          id: f.id || `FSH100${i + 9}`,
          name: f.name,
          phone: f.phone || '+91 98765 00000',
          district: f.harbor || 'Ramanathapuram',
          licenseNo: f.licenseNumber || `LIC-2024-100${i + 9}`,
          status: f.status || 'Active'
        }));
        setFishermen(prev => [...apiFish, ...prev]);
      }
      setPendingUsers(pendRes.pendingUsers || []);
    } catch (err) {
      console.error('Error loading fishermen data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, name) => {
    try {
      const res = await authService.approveUser(userId);
      addNotification(res.message || `Approved access for ${name}!`, 'info');
      loadData();
    } catch (err) {
      addNotification('Failed to approve user', 'error');
    }
  };

  const handleReject = async (userId, name) => {
    try {
      const res = await authService.rejectUser(userId);
      addNotification(res.message || `Rejected registration for ${name}`, 'warning');
      loadData();
    } catch (err) {
      addNotification('Failed to reject user', 'error');
    }
  };

  const filteredFishermen = fishermen.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.id.toLowerCase().includes(search.toLowerCase()) || 
    f.phone.includes(search) ||
    f.district.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Loading Fishermen Registry..." />;

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('registered')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'registered'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Registered Directory ({fishermen.length})
          </button>
          <button
            onClick={() => setTab('pending')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Clock size={14} />
            <span>Pending Approvals ({pendingUsers.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Fishermen by name, ID or phone..."
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
            <span>Add Fisherman</span>
          </button>
        </div>
      </div>

      {tab === 'registered' ? (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">District</th>
                <th className="p-3">License No.</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredFishermen.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                  <td className="p-3 font-bold">{item.name}</td>
                  <td className="p-3 font-mono text-slate-500">{item.phone}</td>
                  <td className="p-3">{item.district}</td>
                  <td className="p-3 font-mono text-slate-400">{item.licenseNo}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                      item.status === 'Active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/40'
                        : item.status === 'Expired'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border-amber-500/40'
                        : 'bg-red-50 dark:bg-red-950/60 text-red-600 border-red-500/40'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <Link to={`/admin/fishermen/${item.id}`} title="View Details" className="hover:text-blue-500 p-1">
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
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Verification Queue</h3>
          {pendingUsers.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg">
              No pending registrations at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingUsers.map(u => (
                <div key={u.id} className="p-4 border border-amber-500/30 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 text-xs flex flex-col justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</span>
                    <p className="text-slate-500 mt-1">Email: {u.email} | Role: <span className="font-bold uppercase text-amber-600">{u.role}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleApprove(u.id, u.name)} className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center justify-center gap-1">
                      <CheckCircle size={14} /> Approve Access
                    </button>
                    <button onClick={() => handleReject(u.id, u.name)} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
