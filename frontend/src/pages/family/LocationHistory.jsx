import React, { useState, useEffect } from 'react';
import { History, MapPin, Calendar, Clock } from 'lucide-react';
import Map from '../../components/Map';
import Loader from '../../components/Loader';
import { familyService } from '../../services/familyService';

export default function LocationHistory() {
  const [loading, setLoading] = useState(true);
  const [fishermen, setFishermen] = useState([]);
  const [selectedFisherman, setSelectedFisherman] = useState('FSH001');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await familyService.getLinkedFishermen();
        if (res.linkedFishermen) {
          setFishermen(res.linkedFishermen);
        }
      } catch (err) {
        console.error('Failed to load location history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loader text="Loading GPS Track Logs..." />;
  }

  const currentFisherman = fishermen.find(f => f.id === selectedFisherman) || fishermen[0];

  const timeline = [
    { time: '05:30 AM', text: 'Departed from Rameswaram Harbor' },
    { time: '10:15 AM', text: 'Entered Fishing Sector 4B' },
    { time: '12:30 PM', text: `GPS Transponder Ping: ${currentFisherman?.lat || '9.2876'}° N, ${currentFisherman?.lng || '79.3129'}° E` },
    { time: '02:45 PM', text: `Vessel Speed: ${currentFisherman?.speed || '12.4 km/h'}` },
    { time: '04:00 PM', text: 'Coastal Safety Check Passed' },
    { time: '05:10 PM', text: `Current Live Location (${currentFisherman?.status || 'On Trip'})` }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Location History</h1>
        <div className="flex items-center gap-2 text-xs font-bold">
          <select
            value={selectedFisherman}
            onChange={(e) => setSelectedFisherman(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700"
          >
            {fishermen.map(f => (
              <option key={f.id} value={f.id}>{f.vessel} ({f.name})</option>
            ))}
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700">
            <option>This Week</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <Map title={`Historical Route Path — ${currentFisherman?.vessel || 'Sea Queen'}`} />
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-xs border-b border-slate-100 pb-2">GPS Log History</h3>

          <div className="space-y-4 text-xs relative pl-4 border-l-2 border-blue-200">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></span>
                <span className="font-bold text-slate-900 font-mono block">{item.time}</span>
                <span className="text-slate-500 text-[11px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
