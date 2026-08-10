import React, { useState, useEffect } from 'react';
import { 
  Building2, Anchor, ShieldCheck, FileCheck, IndianRupee, 
  Users, Plus, Search, Filter, CheckCircle2, AlertTriangle, BarChart2
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

export default function GovernmentAdminApp() {
  const [boats, setBoats] = useState([
    { id: 'b-102', registrationNumber: 'KL-07-FISH-102', name: 'Sea Falcon', ownerName: 'Ramesh Kumar', boatType: 'Deep Sea Trawler', homePort: 'Kochi Harbor', licenseStatus: 'ACTIVE', insuranceExpiry: '2027-12-31' },
    { id: 'b-105', registrationNumber: 'KL-07-FISH-105', name: 'Ocean Defender', ownerName: 'Vijay Sea-Captain', boatType: 'Gillnetter Boat', homePort: 'Kollam Port', licenseStatus: 'ACTIVE', insuranceExpiry: '2027-06-30' },
    { id: 'b-88', registrationNumber: 'TN-01-FISH-88', name: 'Wave Rider', ownerName: 'Ramesh Kumar', boatType: 'Motorized Crafts', homePort: 'Kanyakumari Port', licenseStatus: 'PENDING_RENEWAL', insuranceExpiry: '2026-09-15' }
  ]);

  const [summary, setSummary] = useState({
    totalBoats: 1428,
    activeAtSea: 842,
    activeEmergencies: 1,
    totalFishermen: 4890,
    totalSubsidiesDisbursedINR: 64250000
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    boatType: 'Deep Sea Trawler',
    homePort: 'Kochi Harbor',
    ownerName: ''
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/admin/dashboard`)
      .then(res => res.json())
      .then(data => {
        if (data.boats) setBoats(data.boats);
        if (data.summary) setSummary(data.summary);
      })
      .catch(() => {});
  }, []);

  const handleRegisterBoat = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/api/admin/register-boat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.boat) {
        setBoats(prev => [...prev, data.boat]);
        setShowModal(false);
        setFormData({ name: '', registrationNumber: '', boatType: 'Deep Sea Trawler', homePort: 'Kochi Harbor', ownerName: '' });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white uppercase tracking-wider">STATE DEPARTMENT OF FISHERIES & MARITIME ADMINISTRATION</h1>
            <p className="text-xs text-slate-400">Digital Registry, Safety Compliance & Subsidy Management Portal</p>
          </div>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-cyan-900/30"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Fishing Boat</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto p-6 space-y-6 flex-1">
        
        {/* State Analytics Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-slate-400 text-xs">
              <span>REGISTERED FLEET</span>
              <Anchor className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">{summary.totalBoats.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">98.4% IoT Beacon Compliant</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-slate-400 text-xs">
              <span>REGISTERED FISHERMEN</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">{summary.totalFishermen.toLocaleString()}</p>
            <span className="text-[10px] text-blue-400 font-semibold">Wearable MOB Beacons Issued</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-slate-400 text-xs">
              <span>FUEL SUBSIDY DISBURSED</span>
              <IndianRupee className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-400 mt-2">₹{(summary.totalSubsidiesDisbursedINR / 100000).toFixed(2)} Lakhs</p>
            <span className="text-[10px] text-slate-400 font-semibold">Direct Benefit Transfer</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-start text-slate-400 text-xs">
              <span>SAFETY COMPLIANCE</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-400 mt-2">96.5%</p>
            <span className="text-[10px] text-slate-400 font-semibold">Inspected Marine Electronics</span>
          </div>
        </div>

        {/* Boats Registry Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase text-white tracking-wider flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Vessel Registration Registry</span>
            </h2>
            <span className="text-xs text-slate-400">{boats.length} Vessels Listed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Reg Number</th>
                  <th className="p-4">Vessel Name</th>
                  <th className="p-4">Vessel Type</th>
                  <th className="p-4">Home Port</th>
                  <th className="p-4">License Status</th>
                  <th className="p-4">Insurance Expiry</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {boats.map(b => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-white">{b.registrationNumber}</td>
                    <td className="p-4 font-semibold text-cyan-300">{b.name}</td>
                    <td className="p-4">{b.boatType}</td>
                    <td className="p-4">{b.homePort}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        b.licenseStatus === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {b.licenseStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{b.insuranceExpiry}</td>
                    <td className="p-4 text-right">
                      <button className="text-cyan-400 hover:text-cyan-300 font-bold underline">View Certificate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-white">Register New Fishing Vessel</h3>
            
            <form onSubmit={handleRegisterBoat} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Vessel Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sea Falcon"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Registration Number (Official)</label>
                <input 
                  type="text" 
                  required 
                  value={formData.registrationNumber}
                  onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="e.g. KL-07-FISH-200"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Boat Type</label>
                <select 
                  value={formData.boatType}
                  onChange={e => setFormData({ ...formData, boatType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="Deep Sea Trawler">Deep Sea Trawler</option>
                  <option value="Gillnetter Boat">Gillnetter Boat</option>
                  <option value="Motorized Craft">Motorized Craft</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Home Port</label>
                <input 
                  type="text" 
                  required 
                  value={formData.homePort}
                  onChange={e => setFormData({ ...formData, homePort: e.target.value })}
                  placeholder="e.g. Kochi Harbor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
