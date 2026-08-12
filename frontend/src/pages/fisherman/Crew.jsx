import React, { useState } from 'react';
import { UserCheck, Plus, History, Radio } from 'lucide-react';
import Button from '../../components/Button';

export default function Crew() {
  const [crew] = useState([
    { id: '1', name: 'Mano', role: 'Captain', wearable: 'Connected', status: 'On Board' },
    { id: '2', name: 'Arun', role: 'Fisherman', wearable: 'Connected', status: 'On Board' },
    { id: '3', name: 'Rahul', role: 'Fisherman', wearable: 'Connected', status: 'On Board' },
    { id: '4', name: 'Suresh', role: 'Fisherman', wearable: 'Connected', status: 'On Board' },
    { id: '5', name: 'Karthik', role: 'Fisherman', wearable: 'Disconnected', status: 'Last Seen 10 min ago' },
  ]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck size={22} className="text-blue-600" />
            <span>Crew Members</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Total Crew: {crew.length}</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2">
          <Plus size={15} />
          <span>Add Member</span>
        </Button>
      </div>

      <div className="space-y-3">
        {crew.map((member) => (
          <div key={member.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-600 font-bold flex items-center justify-center text-sm">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{member.name} <span className="text-xs font-normal text-slate-500">({member.role})</span></h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Radio size={12} className={member.wearable === 'Connected' ? 'text-emerald-600' : 'text-red-500'} />
                  Wearable: <span className={member.wearable === 'Connected' ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>{member.wearable}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border uppercase ${
              member.status === 'On Board'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-500/30'
                : 'bg-red-50 text-red-600 border-red-500/30'
            }`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>

      <Button className="w-full text-xs py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold">
        <History size={16} />
        <span>View Crew History</span>
      </Button>
    </div>
  );
}
