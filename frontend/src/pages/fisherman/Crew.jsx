import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, History, Radio } from 'lucide-react';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { fishermanService } from '../../services/fishermanService';

export default function Crew() {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrew();
  }, []);

  const fetchCrew = async () => {
    try {
      const res = await fishermanService.getAll();
      const list = (res.fishermen || []).map((f, i) => ({
        id: f.id || `${i}`,
        name: f.name,
        role: i === 0 ? 'Captain' : 'Fisherman',
        wearable: 'Connected',
        status: f.status || 'On Board'
      }));
      setCrew(list);
    } catch (err) {
      console.error('Error fetching crew:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Registered Crew Members..." />;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <UserCheck size={22} className="text-emerald-400" />
            <span>Crew Members</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Total Crew: {crew.length} Members Registered</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2">
          <Plus size={15} />
          <span>Add Member</span>
        </Button>
      </div>

      <div className="space-y-3">
        {crew.map((member) => (
          <div key={member.id} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-bold flex items-center justify-center text-sm">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{member.name} <span className="text-xs font-normal text-slate-400">({member.role})</span></h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Radio size={12} className={member.wearable === 'Connected' ? 'text-emerald-400' : 'text-red-400'} />
                  Wearable: {member.wearable}
                </p>
              </div>
            </div>

            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border uppercase ${
              member.status === 'On Board' || member.status === 'Safe' || member.status === 'Active'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                : 'bg-red-950 text-red-400 border-red-500/40 animate-pulse'
            }`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>

      <Button variant="secondary" className="w-full text-xs py-2.5">
        <History size={16} />
        <span>View Crew History</span>
      </Button>
    </div>
  );
}
