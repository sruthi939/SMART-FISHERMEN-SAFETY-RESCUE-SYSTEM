import React from 'react';
import { History, MapPin, Calendar, Clock } from 'lucide-react';
import Map from '../../components/Map';

export default function LocationHistory() {
  const timeline = [
    { time: '05:30 AM', text: 'Departed from Rameswaram' },
    { time: '10:15 AM', text: 'Reached Fishing Zone' },
    { time: '12:30 PM', text: 'Location Updated' },
    { time: '02:45 PM', text: 'Location Updated' },
    { time: '04:00 PM', text: 'Location Updated' },
    { time: '05:10 PM', text: 'Current Location' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Location History</h1>
        <div className="flex items-center gap-2 text-xs font-bold">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700">
            <option>Sea Queen (Manu)</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700">
            <option>This Week</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <Map title="Historical Route Path - Palk Bay" />
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-xs border-b border-slate-100 pb-2">May 14, 2025</h3>

          <div className="space-y-4 text-xs relative pl-4 border-l-2 border-blue-200">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white"></span>
                <span className="font-bold text-slate-900 font-mono block">{item.time}</span>
                <span className="text-slate-500 text-[11px]">{item.text}</span>
              </div>
            ))}
          </div>

          <button className="w-full text-xs py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition">
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
}
