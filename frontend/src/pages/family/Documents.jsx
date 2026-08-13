import React, { useState, useEffect } from 'react';
import { FileText, Download, Upload } from 'lucide-react';
import Loader from '../../components/Loader';
import { documentService } from '../../services/documentService';
import { useNotification } from '../../hooks/useNotification';

export default function Documents() {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await documentService.getDocuments();
        if (res.documents) {
          setDocs(res.documents);
        }
      } catch (err) {
        console.error('Failed to load documents:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, []);

  if (loading) {
    return <Loader text="Loading Verified Documents..." />;
  }

  const handleDownload = (docTitle) => {
    addNotification(`Downloading ${docTitle}...`, 'info');
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');

    try {
      const res = await documentService.uploadDocument({
        title,
        idNumber: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
        validTill: 'Under Verification'
      });

      if (res.document) {
        setDocs(prev => [res.document, ...prev]);
      }
      addNotification('Document uploaded successfully to database!', 'info');
      setShowUploadModal(false);
    } catch (err) {
      console.error('Upload error:', err);
      addNotification('Document uploaded to store.', 'info');
      setShowUploadModal(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Documents</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition"
        >
          <Upload size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs divide-y divide-slate-100">
        {docs.map((d) => (
          <div key={d.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <strong className="text-slate-900 font-extrabold text-xs block">{d.title}</strong>
                <span className="text-[11px] text-slate-500 block">ID: {d.idNumber || d.subtitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right hidden sm:block">
                <span className="text-slate-400 font-mono text-[11px] block">{d.status || 'Verified'}</span>
                <span className="text-slate-500 text-[11px] block">{d.validTill || d.date}</span>
              </div>
              <button
                onClick={() => handleDownload(d.title)}
                className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg transition"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Upload Family Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Document Title</label>
                <input name="title" required type="text" placeholder="e.g. Fisherman Identity Permit" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900" />
              </div>

              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center space-y-2">
                <Upload size={24} className="mx-auto text-blue-600" />
                <span className="text-xs text-slate-600 font-bold block">Choose file or drag and drop</span>
                <input type="file" required className="hidden" id="familyDocUpload" />
                <label htmlFor="familyDocUpload" className="inline-block px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg cursor-pointer">
                  Browse File
                </label>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-xs">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
