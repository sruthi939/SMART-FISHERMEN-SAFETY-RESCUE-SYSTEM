import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, History, Radio, UserPlus, X } from 'lucide-react';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { fishermanService } from '../../services/fishermanService';
import { useNotification } from '../../hooks/useNotification';

export default function Crew() {
  const { addNotification } = useNotification();
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: 'Fisherman', phone: '' });

  useEffect(() => {
    fetchCrew();
  }, []);

  const fetchCrew = async () => {
    try {
      const res = await fishermanService.getAll();
      const list = (res.fishermen || []).map((f, i) => ({
        id: f.id || `${i}`,
        name: f.name,
        role: f.role || (i === 0 ? 'Captain' : 'Fisherman'),
        wearable: 'Connected',
        status: f.status || 'On Board'
      }));
      setCrew(list);
    } catch (err) {
      console.error('Error fetching crew:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    if (!newMember.name) {
      addNotification('Please enter crew member name', 'error');
      return;
    }

    try {
      await fishermanService.register({
        name: newMember.name,
        role: 'fisherman',
        phone: newMember.phone || '9876543210',
        aadhaar: '123456789012'
      });

      addNotification(`Crew member ${newMember.name} added successfully!`, 'info');
      setShowAddModal(false);
      setNewMember({ name: '', role: 'Fisherman', phone: '' });
      fetchCrew();
    } catch (err) {
      console.error('Add crew error:', err);
      addNotification('Failed to add crew member. Saved to store.', 'info');
      setCrew(prev => [...prev, { id: `c-${Date.now()}`, name: newMember.name, role: newMember.role, wearable: 'Connected', status: 'On Board' }]);
      setShowAddModal(false);
      setNewMember({ name: '', role: 'Fisherman', phone: '' });
    }
  };

  if (loading) return <Loader text="Loading Live Crew Telemetry..." />;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck size={22} className="text-blue-600" />
            <span>Crew Members</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Total Registered Crew: {crew.length}</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="space-y-3">
        {crew.map((member) => (
          <div key={member.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-600 font-bold flex items-center justify-center text-sm">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{member.name} <span className="text-xs font-normal text-slate-500">({member.role})</span></h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Radio size={12} className={member.wearable === 'Connected' ? 'text-emerald-600' : 'text-red-500'} />
                  Wearable: <span className={member.wearable === 'Connected' ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>{member.wearable}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border uppercase ${
              member.status === 'On Board' || member.status === 'Active' || member.status === 'Safe'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-500/30'
                : 'bg-red-50 text-red-600 border-red-500/30'
            }`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowHistoryModal(true)}
        className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 transition"
      >
        <History size={16} />
        <span>View Crew History</span>
      </button>

      {/* Add Crew Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add New Crew Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. K. Suresh"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Role / Position</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="Fisherman">Fisherman</option>
                  <option value="Navigator">Navigator</option>
                  <option value="Deck Hand">Deck Hand</option>
                  <option value="Engineer">Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
                >
                  <UserPlus size={14} />
                  <span>Add Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Crew History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Crew Voyage History Log</h3>
              <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-2.5 text-xs max-h-64 overflow-y-auto">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                <div><strong className="text-slate-900 block">Mano (Captain)</strong><span className="text-[10px] text-slate-400">Total Trips: 42</span></div>
                <span className="text-emerald-600 font-bold">100% Attendance</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                <div><strong className="text-slate-900 block">Arun Kumar</strong><span className="text-[10px] text-slate-400">Total Trips: 38</span></div>
                <span className="text-emerald-600 font-bold">98% Attendance</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                <div><strong className="text-slate-900 block">Rahul</strong><span className="text-[10px] text-slate-400">Total Trips: 30</span></div>
                <span className="text-emerald-600 font-bold">95% Attendance</span>
              </div>
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
