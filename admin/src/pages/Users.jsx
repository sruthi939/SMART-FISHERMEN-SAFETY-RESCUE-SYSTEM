import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Loader from '../components/Loader';
import { authService } from '../services/authService';

export default function Users() {
  const [roleTab, setRoleTab] = useState('all'); // 'all' | 'fisherman' | 'family' | 'rescue' | 'admin'
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: '1', name: 'Arun Kumar', email: 'arun@gmail.com', role: 'Fisherman', phone: '+91 98765 43210', status: 'Active' },
    { id: '2', name: 'Manoj S.', email: 'manoj@gmail.com', role: 'Fisherman', phone: '+91 87654 32109', status: 'Active' },
    { id: '3', name: 'Coast Guard Alpha', email: 'rescue@gov.in', role: 'Rescue Officer', phone: '+91 90000 11111', status: 'Active' },
    { id: '4', name: 'Admin User', email: 'admin@sfsrs.gov.in', role: 'Administrator', phone: '+91 90000 00000', status: 'Active' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await authService.getAllUsers().catch(() => ({ users: [] }));
      if (res.users && res.users.length > 0) {
        const mapped = res.users.map((u, idx) => ({
          id: u.id || `usr_${idx}`,
          name: u.name,
          email: u.email,
          role: u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : 'Fisherman',
          phone: u.phone || '+91 98765 00000',
          status: u.isApproved ? 'Active' : 'Pending'
        }));
        setUsers(prev => [...mapped, ...prev]);
      }
    } catch (e) {
      console.error('Error loading users:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleTab === 'all' ? true : u.role.toLowerCase().includes(roleTab);
    return matchSearch && matchRole;
  });

  if (loading) return <Loader text="Loading System User Accounts..." />;

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold overflow-x-auto">
        {[
          { key: 'all', label: 'All Users' },
          { key: 'fisherman', label: 'Fishermen' },
          { key: 'family', label: 'Family Members' },
          { key: 'rescue', label: 'Rescue Officers' },
          { key: 'admin', label: 'Admin Users' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setRoleTab(t.key)}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              roleTab === t.key
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Registered Users ({filtered.length})</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
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
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
            {filtered.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="p-3 font-bold">{u.name}</td>
                <td className="p-3 text-slate-500 font-mono">{u.email}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                    {u.role}
                  </span>
                </td>
                <td className="p-3 font-mono">{u.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    u.status === 'Active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/40'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border-amber-500/40'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button title="View" className="hover:text-blue-500 p-1"><Eye size={16} /></button>
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
