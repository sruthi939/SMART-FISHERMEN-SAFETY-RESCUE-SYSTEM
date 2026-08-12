import React, { useState } from 'react';
import { FileCheck, Upload, Plus, Eye, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import Button from '../../components/Button';
import { useNotification } from '../../hooks/useNotification';

export default function Documents() {
  const { addNotification } = useNotification();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docs, setDocs] = useState([
    { id: 'doc-1', title: 'Boat Registration', idNumber: 'TN 07 MF 4587', validTill: '31-Dec-2027', status: 'Verified' },
    { id: 'doc-2', title: 'Fishing License', idNumber: 'IND-FISH-2025-4587', validTill: '15-Aug-2026', status: 'Verified' },
    { id: 'doc-3', title: 'Insurance Certificate', idNumber: 'INS-9082-MAR', validTill: '31-Dec-2025', status: 'Verified' },
    { id: 'doc-4', title: 'Safety Equipment Certificate', idNumber: 'SEC-2025-091', validTill: '15-Nov-2025', status: 'Verified' },
    { id: 'doc-5', title: 'Pollution Certificate', idNumber: 'POL-TN-2025-88', validTill: '20-Oct-2025', status: 'Verified' },
  ]);

  const [newDoc, setNewDoc] = useState({ title: '', idNumber: '', validTill: '' });

  const handleAddDocument = (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.idNumber) {
      addNotification('Please enter document title and ID number', 'error');
      return;
    }

    const created = {
      id: `doc-${Date.now()}`,
      title: newDoc.title,
      idNumber: newDoc.idNumber,
      validTill: newDoc.validTill || 'Pending Verification',
      status: 'Under Review'
    };

    setDocs(prev => [created, ...prev]);
    setShowUploadModal(false);
    setNewDoc({ title: '', idNumber: '', validTill: '' });
    addNotification('Document uploaded successfully! Pending Admin verification.', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Vessel & Personal Documents</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your official maritime licenses, permits, and certificates</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-600/30 transition flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Card Grid Model matching mockup requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{doc.title}</h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{doc.idNumber}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                doc.status === 'Verified'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-500/30'
                  : 'bg-amber-50 text-amber-600 border-amber-500/30'
              }`}>
                {doc.status}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Valid Till: <strong className="text-slate-700">{doc.validTill}</strong></span>
              <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                <Eye size={14} /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Upload New Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Life Raft Inspection Certificate"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Registration / Certificate ID</label>
                <input
                  type="text"
                  placeholder="e.g. CERT-2025-9901"
                  value={newDoc.idNumber}
                  onChange={(e) => setNewDoc({ ...newDoc, idNumber: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Expiry / Valid Date</label>
                <input
                  type="date"
                  value={newDoc.validTill}
                  onChange={(e) => setNewDoc({ ...newDoc, validTill: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Attach File (PDF / JPG)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-sm shadow-blue-600/30 transition"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
