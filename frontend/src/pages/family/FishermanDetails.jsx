import React, { useState } from 'react';
import { UserCheck, Phone, Home, Calendar, Briefcase, HeartHandshake, Ship, FileText, Activity, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function FishermanDetails() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('boat');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/family" className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-black text-slate-900">Fisherman Details</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 border-2 border-blue-500 font-black text-2xl flex items-center justify-center shrink-0">
            M
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-slate-900">Manu</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full border border-emerald-300">
                ● On Trip
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">Sea Queen — <span className="font-mono text-slate-700">TN 07 MF 4587</span></p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-400 font-semibold flex items-center gap-2"><Phone size={14} /> Mobile</span>
            <strong className="text-slate-900 font-mono">+91 98765 43210</strong>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-400 font-semibold flex items-center gap-2"><Home size={14} /> Home</span>
            <strong className="text-slate-900">Rameswaram, Tamil Nadu</strong>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-400 font-semibold flex items-center gap-2"><Calendar size={14} /> Age</span>
            <strong className="text-slate-900">34 Years</strong>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-400 font-semibold flex items-center gap-2"><Briefcase size={14} /> Experience</span>
            <strong className="text-slate-900">12 Years</strong>
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-400 font-semibold flex items-center gap-2"><HeartHandshake size={14} /> Emergency Contact</span>
            <strong className="text-slate-900 font-mono">+91 98765 12345 (Wife)</strong>
          </div>
        </div>

        {/* 4 Sub-Tabs */}
        <div className="border-b border-slate-200 flex gap-4 text-xs font-bold pt-2">
          {['boat', 'documents', 'trips', 'equipment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 capitalize transition ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab === 'boat' ? 'Boat Info' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content: Boat Info */}
        {activeTab === 'boat' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Boat Name</span>
              <strong className="text-slate-900 font-bold">Sea Queen</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Registration No.</span>
              <strong className="text-slate-900 font-mono font-bold">TN 07 MF 4587</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Boat Type</span>
              <strong className="text-slate-900 font-bold">Mechanized</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Length</span>
              <strong className="text-slate-900 font-bold">32 ft</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Engine Power</span>
              <strong className="text-slate-900 font-bold">200 HP</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-semibold block mb-0.5">Insurance Validity</span>
              <strong className="text-slate-900 font-bold font-mono">03 Dec 2025</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
