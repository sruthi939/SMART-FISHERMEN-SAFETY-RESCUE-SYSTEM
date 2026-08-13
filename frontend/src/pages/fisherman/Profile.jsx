import React, { useState } from 'react';
import { UserCheck, Phone, Mail, MapPin, Calendar, Briefcase, HeartHandshake, Edit3 } from 'lucide-react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

export default function Profile() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Arun Kumar',
    phone: '+91 98765 43210',
    email: 'arun.kumar@email.com',
    address: 'Rameswaram, Tamil Nadu, India',
    dob: '15-06-1988',
    experience: '12 Years',
    emergencyContact: 'Anitha (Wife) - +91 98765 43211'
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    addNotification('Profile updated successfully!', 'info');
    setShowEditModal(false);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
      {/* Header Profile Info */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-600 font-black text-2xl flex items-center justify-center shadow-xs">
          {profileData.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">{profileData.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs font-bold text-slate-500">Fisherman</span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full border border-emerald-500/30 flex items-center gap-1">
              <UserCheck size={12} /> Verified
            </span>
          </div>
        </div>
      </div>

      {/* Info Details List */}
      <div className="space-y-3.5 text-xs">
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Phone size={14} /> Phone</span>
          <span className="font-bold text-slate-900 font-mono">{profileData.phone}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Mail size={14} /> Email</span>
          <span className="font-bold text-slate-900">{profileData.email}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><MapPin size={14} /> Address</span>
          <span className="font-bold text-slate-900">{profileData.address}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Calendar size={14} /> Date of Birth</span>
          <span className="font-bold text-slate-900">{profileData.dob}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Briefcase size={14} /> Experience</span>
          <span className="font-bold text-slate-900">{profileData.experience}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><HeartHandshake size={14} /> Emergency Contact</span>
          <span className="font-bold text-slate-900">{profileData.emergencyContact}</span>
        </div>
      </div>

      <button
        onClick={() => setShowEditModal(true)}
        className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 transition"
      >
        <Edit3 size={16} />
        <span>Edit Profile</span>
      </button>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Edit Fisherman Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-sm shadow-blue-600/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
