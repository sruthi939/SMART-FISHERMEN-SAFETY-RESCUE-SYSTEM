import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, MapPin, FileCheck, CheckCircle2 } from 'lucide-react';

export default function FishermanDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState('boats');

  const fisherman = {
    id: id || 'FSH1001',
    name: 'Arun Kumar',
    status: 'Active',
    phone: '+91 98765 43210',
    email: 'arunkumar@gmail.com',
    address: '12, Beach Road, Rameswaram, Ramanathapuram, Tamil Nadu - 623526',
    dob: '15-06-1988',
    aadhaar: 'XXXX XXXX 1234',
    bloodGroup: 'O+',
    emergencyContact: '+91 91234 56789 (Brother)',
    licenseNo: 'LIC-2024-1001',
    issueDate: '01-01-2024',
    expiryDate: '31-12-2026',
    licenseType: 'Mechanized Boat License',
    boat: { name: 'Sea Queen', regNo: 'TN 07 MF 4587', type: 'Mechanized', status: 'Active' }
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/fishermen" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600">
        <ArrowLeft size={14} /> Back to Fishermen Registry
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-950 border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-md">
            <User size={42} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{fisherman.name}</h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">ID: {fisherman.id}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-500/40">
              {fisherman.status}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-left text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500 shrink-0" />
              <span>{fisherman.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-blue-500 shrink-0" />
              <span>{fisherman.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{fisherman.address}</span>
            </div>
          </div>
        </div>

        {/* Right Information & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal & License Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-2.5 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">Personal Information</h3>
              <div className="flex justify-between"><span className="text-slate-400">Date of Birth:</span><span className="font-semibold">{fisherman.dob}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Aadhaar No:</span><span className="font-mono">{fisherman.aadhaar}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Blood Group:</span><span className="font-bold text-red-500">{fisherman.bloodGroup}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Emergency Contact:</span><span className="font-semibold">{fisherman.emergencyContact}</span></div>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-2.5 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">License Information</h3>
              <div className="flex justify-between"><span className="text-slate-400">License No:</span><span className="font-mono font-bold text-blue-500">{fisherman.licenseNo}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Issue Date:</span><span>{fisherman.issueDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Expiry Date:</span><span>{fisherman.expiryDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">License Type:</span><span className="font-semibold">{fisherman.licenseType}</span></div>
            </div>
          </div>

          {/* Sub-tabs Section */}
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-2 text-xs font-bold">
              <button onClick={() => setTab('boats')} className={tab === 'boats' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Boats (1)</button>
              <button onClick={() => setTab('family')} className={tab === 'family' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Family (2)</button>
              <button onClick={() => setTab('trips')} className={tab === 'trips' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Trips</button>
              <button onClick={() => setTab('reports')} className={tab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-slate-400'}>Reports</button>
            </div>

            {tab === 'boats' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-bold bg-slate-50 dark:bg-slate-900/60">
                    <tr><th className="p-2">Boat Name</th><th className="p-2">Registration No.</th><th className="p-2">Boat Type</th><th className="p-2">Status</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-100 dark:border-slate-800">
                      <td className="p-2 font-bold">{fisherman.boat.name}</td>
                      <td className="p-2 font-mono">{fisherman.boat.regNo}</td>
                      <td className="p-2">{fisherman.boat.type}</td>
                      <td className="p-2"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-full">ACTIVE</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Documents Checklist */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">Documents</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['Aadhaar Card', 'License Certificate', 'Boat Ownership Proof', 'Insurance'].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <FileCheck size={16} className="text-emerald-500" />
                      <span>{doc}</span>
                    </div>
                    <button className="text-blue-600 font-bold hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
