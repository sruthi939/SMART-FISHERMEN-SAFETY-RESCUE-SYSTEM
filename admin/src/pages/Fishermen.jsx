import React, { useState, useEffect } from 'react';
import FishermanCard from '../components/FishermanCard';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { fishermanService } from '../services/fishermanService';
import { authService } from '../services/authService';
import { useNotification } from '../hooks/useNotification';
import { CheckCircle, XCircle, Clock, ShieldCheck, UserCheck } from 'lucide-react';

export default function Fishermen() {
  const [tab, setTab] = useState('pending');
  const [fishermen, setFishermen] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fishRes, pendRes] = await Promise.all([
        fishermanService.getAll().catch(() => ({ fishermen: [] })),
        authService.getPendingUsers().catch(() => ({ pendingUsers: [] }))
      ]);
      setFishermen(fishRes.fishermen || []);
      setPendingUsers(pendRes.pendingUsers || []);
    } catch (err) {
      console.error('Error loading fishermen/pending users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, name) => {
    try {
      const res = await authService.approveUser(userId);
      addNotification(res.message || `Approved access for ${name}!`, 'info');
      loadData();
    } catch (err) {
      addNotification('Failed to approve user', 'error');
    }
  };

  const handleReject = async (userId, name) => {
    try {
      const res = await authService.rejectUser(userId);
      addNotification(res.message || `Rejected registration for ${name}`, 'warning');
      loadData();
    } catch (err) {
      addNotification('Failed to reject user', 'error');
    }
  };

  if (loading) return <Loader text="Loading Accounts & Verification Queue..." />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Government Admin Verification & User Control</h1>
          <p className="text-xs text-slate-400 mt-1">Review pending portal registration requests and manage active fishermen</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setTab('pending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock size={14} />
            <span>Pending Approvals ({pendingUsers.length})</span>
          </button>
          <button
            onClick={() => setTab('directory')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'directory'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck size={14} />
            <span>Fishermen Directory ({fishermen.length})</span>
          </button>
        </div>
      </div>

      {tab === 'pending' && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck size={18} className="text-amber-400" />
            <span>Pending Verification Applications</span>
          </h2>

          {pendingUsers.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
              🎉 No pending user registration requests. All registration applications have been verified.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingUsers.map((user) => (
                <div key={user.id} className="bg-slate-900/70 border border-amber-500/30 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-extrabold text-sm text-white">{user.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40">
                        {user.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <p><span className="text-slate-500">Email:</span> {user.email}</p>
                      <p><span className="text-slate-500">Phone:</span> {user.phone || 'N/A'}</p>
                      {user.aadhaar && <p><span className="text-slate-500">Aadhaar:</span> {user.aadhaar}</p>}
                      {user.state && <p><span className="text-slate-500">State/Dist:</span> {user.state}, {user.district}</p>}
                      {user.department && <p><span className="text-slate-500">Dept:</span> {user.department}</p>}
                      {user.employeeId && <p><span className="text-slate-500">Emp ID:</span> {user.employeeId}</p>}
                      {user.relationship && <p><span className="text-slate-500">Relation:</span> {user.relationship}</p>}
                      {user.fishermanPhone && <p><span className="text-slate-500">Fisherman Phone:</span> {user.fishermanPhone}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3">
                    <Button
                      variant="primary"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 text-xs"
                      onClick={() => handleApprove(user.id, user.name)}
                    >
                      <CheckCircle size={15} />
                      <span>Approve Access</span>
                    </Button>

                    <Button
                      variant="danger"
                      className="flex-1 py-2 text-xs"
                      onClick={() => handleReject(user.id, user.name)}
                    >
                      <XCircle size={15} />
                      <span>Reject Application</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fishermen.map(f => <FishermanCard key={f.id} fisherman={f} />)}
        </div>
      )}
    </div>
  );
}
