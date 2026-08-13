import React, { useState } from 'react';
import { Users, UserPlus, Phone, MoreVertical } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';

export default function FamilyMembers() {
  const { addNotification } = useNotification();
  const [showAddModal, setShowAddModal] = useState(false);

  const [members, setMembers] = useState([
    { id: 1, name: 'Anitha (You)', role: 'Wife', primary: true, phone: '+91 98765 12345' },
    { id: 2, name: 'Kavin', role: 'Son', primary: false, phone: '+91 98765 67890' },
    { id: 3, name: 'Meena', role: 'Daughter', primary: false, phone: '+91 98765 54321' },
    { id: 4, name: 'Lakshmi', role: 'Mother', primary: false, phone: '+91 98765 11111' }
  ]);

  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newM = {
      id: Date.now(),
      name: formData.get('name'),
      role: formData.get('role'),
      primary: false,
      phone: formData.get('phone')
    };
    setMembers(prev => [...prev, newM]);
    addNotification('Family member added successfully!', 'info');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Family Members</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition"
        >
          <UserPlus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                {m.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 font-extrabold text-xs">{m.name}</strong>
                  {m.primary && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-extrabold rounded-full">
                      Primary Contact
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 font-semibold">{m.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-900 font-bold">{m.phone}</span>
              <button className="text-slate-400 hover:text-slate-700">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Family Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                <input name="name" required type="text" placeholder="Enter name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Relationship</label>
                <input name="role" required type="text" placeholder="e.g. Brother" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Mobile Phone</label>
                <input name="phone" required type="tel" placeholder="+91 98765 00000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-xs">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
