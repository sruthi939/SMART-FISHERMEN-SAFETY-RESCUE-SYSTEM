import React from 'react';
import { History, Navigation } from 'lucide-react';

export default function TripHistory() {
  const previousTrips = [
    { startDate: 'May 10, 2025', endDate: 'May 12, 2025', distance: '52.3 km', duration: '24h 10m', status: 'Completed' },
    { startDate: 'May 07, 2025', endDate: 'May 09, 2025', distance: '48.6 km', duration: '23h 45m', status: 'Completed' },
    { startDate: 'May 04, 2025', endDate: 'May 06, 2025', distance: '50.1 km', duration: '24h 30m', status: 'Completed' },
    { startDate: 'May 01, 2025', endDate: 'May 03, 2025', distance: '47.8 km', duration: '22h 50m', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Current Trip Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-blue-600 uppercase tracking-wider">Current Trip</h2>
          <span className="text-[10px] font-bold text-slate-400">This Month</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Start Date</span>
            <strong className="text-slate-900">May 13, 2025 05:30 AM</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Expected Return</span>
            <strong className="text-slate-900">May 15, 2025 05:30 PM</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
          <div><span className="text-slate-400 block text-[10px]">Distance Covered</span><strong className="text-slate-900 font-black">45.6 km</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Max Speed</span><strong className="text-slate-900 font-black">18.2 km/h</strong></div>
          <div><span className="text-slate-400 block text-[10px]">Travel Time</span><strong className="text-slate-900 font-black">22h 15m</strong></div>
        </div>
      </div>

      {/* Previous Trips Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Previous Trips</h3>

        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Distance</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {previousTrips.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold">{item.startDate}</td>
                  <td className="p-3 font-semibold">{item.endDate}</td>
                  <td className="p-3 font-mono">{item.distance}</td>
                  <td className="p-3 font-mono">{item.duration}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="text-xs text-blue-600 font-bold hover:underline block text-center w-full pt-2">
          View All Trips
        </button>
      </div>
    </div>
  );
}
