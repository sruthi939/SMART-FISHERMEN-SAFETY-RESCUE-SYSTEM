import React, { useState, useEffect } from 'react';
import { Ship, Award, ShieldCheck, LifeBuoy, Leaf, Plus, Eye, Upload, FileText } from 'lucide-react';
import Loader from '../../components/Loader';
import { documentService } from '../../services/documentService';
import { useNotification } from '../../hooks/useNotification';

export default function Documents() {
  const { addNotification } = useNotification();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', idNumber: '', validTill: '' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await documentService.getDocuments();
      const docsList = (res.documents || []).map((d) => {
        let IconComponent = FileText;
        let colorStyle = 'bg-blue-50 text-blue-600 border-blue-200';

        if (d.title.includes('Boat')) {
          IconComponent = Ship;
          colorStyle = 'bg-blue-50 text-blue-600 border-blue-200';
        } else if (d.title.includes('License')) {
          IconComponent = Award;
          colorStyle = 'bg-cyan-50 text-cyan-600 border-cyan-200';
        } else if (d.title.includes('Insurance')) {
          IconComponent = ShieldCheck;
          colorStyle = 'bg-emerald-50 text-emerald-600 border-emerald-200';
        } else if (d.title.includes('Safety')) {
          IconComponent = LifeBuoy;
          colorStyle = 'bg-amber-50 text-amber-600 border-amber-200';
        } else if (d.title.includes('Pollution')) {
          IconComponent = Leaf;
          colorStyle = 'bg-purple-50 text-purple-600 border-purple-200';
        }

        return { ...d, icon: IconComponent, color: colorStyle };
      });

      setDocuments(docsList);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.idNumber) {
      addNotification('Please enter document title and registration ID', 'error');
      return;
    }

    try {
      const res = await documentService.uploadDocument(newDoc);
      addNotification('Document uploaded successfully to API server!', 'info');
      setShowUploadModal(false);
      setNewDoc({ title: '', idNumber: '', validTill: '' });
      fetchDocuments();
    } catch (err) {
      console.error('Upload Error:', err);
      addNotification('Document upload failed. Please try again.', 'error');
    }
  };

  if (loading) return <Loader text="Fetching Verified Maritime Licenses & Registrations..." />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Vessel & Personal Documents</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your official licenses, certificates and registrations</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-600/30 transition flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Square Card Grid Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => {
          const IconComponent = doc.icon;
          return (
            <div
              key={doc.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between aspect-square hover:shadow-md hover:border-blue-300 transition group relative overflow-hidden"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl ${doc.color} border flex items-center justify-center shadow-xs group-hover:scale-105 transition`}>
                  <IconComponent size={26} className="stroke-[2.2]" />
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                  doc.status === 'Verified'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-500/30'
                    : 'bg-amber-50 text-amber-600 border-amber-500/30'
                }`}>
                  {doc.status}
                </span>
              </div>

              {/* Middle Section */}
              <div className="space-y-1.5 my-auto">
                <h3 className="font-extrabold text-sm text-slate-900 leading-tight group-hover:text-blue-600 transition">
                  {doc.title}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-500">{doc.idNumber}</p>
                <p className="text-[11px] text-slate-400">
                  Valid Till: <span className="font-bold text-slate-700">{doc.validTill}</span>
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Official Copy</span>
                <button className="text-xs text-blue-600 font-extrabold hover:underline flex items-center gap-1">
                  <Eye size={14} /> View
                </button>
              </div>
            </div>
          );
        })}

        {/* Upload Add Card Button */}
        <div
          onClick={() => setShowUploadModal(true)}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 bg-slate-50/50 hover:bg-blue-50/30 transition flex flex-col items-center justify-center text-center cursor-pointer aspect-square space-y-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
            <Plus size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900 block group-hover:text-blue-600 transition">
              Upload New Document
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              PDF, JPG, PNG up to 10MB
            </span>
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Navigation Permit / Life Raft Cert"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Certificate / Registration ID</label>
                <input
                  type="text"
                  placeholder="e.g. REG-2025-9901"
                  value={newDoc.idNumber}
                  onChange={(e) => setNewDoc({ ...newDoc, idNumber: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newDoc.validTill}
                  onChange={(e) => setNewDoc({ ...newDoc, validTill: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Upload File (PDF / Image)</label>
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
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-sm shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
                >
                  <Upload size={14} />
                  <span>Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
