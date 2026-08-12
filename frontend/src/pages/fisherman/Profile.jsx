import React from 'react';
import { UserCheck, Phone, Mail, MapPin, Calendar, Briefcase, HeartHandshake, Edit3 } from 'lucide-react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
      {/* Header Profile Info */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-600 font-black text-2xl flex items-center justify-center shadow-xs">
          {user?.name ? user.name.charAt(0) : 'A'}
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">{user?.name || 'Arun Kumar'}</h2>
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
          <span className="font-bold text-slate-900 font-mono">+91 98765 43210</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Mail size={14} /> Email</span>
          <span className="font-bold text-slate-900">arun.kumar@email.com</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><MapPin size={14} /> Address</span>
          <span className="font-bold text-slate-900">Rameswaram, Tamil Nadu, India</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Calendar size={14} /> Date of Birth</span>
          <span className="font-bold text-slate-900">15-06-1988</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><Briefcase size={14} /> Experience</span>
          <span className="font-bold text-slate-900">12 Years</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-slate-400 font-semibold flex items-center gap-2"><HeartHandshake size={14} /> Emergency Contact</span>
          <span className="font-bold text-slate-900">Anitha (Wife) - +91 98765 43211</span>
        </div>
      </div>

      <Button className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-sm shadow-blue-600/30">
        <Edit3 size={16} />
        <span>Edit Profile</span>
      </Button>
    </div>
  );
}
