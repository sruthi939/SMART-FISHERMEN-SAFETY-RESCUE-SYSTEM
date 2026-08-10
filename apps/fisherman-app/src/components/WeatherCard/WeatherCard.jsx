import React from 'react';
import { Wind, Waves } from 'lucide-react';

export default function WeatherCard({ weather }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
      <div className="flex justify-between items-center">
        <span className="font-bold text-white uppercase">Marine Weather Advisory</span>
        <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px]">{weather?.riskLevel || 'SAFE'}</span>
      </div>
      <p className="text-slate-300">{weather?.advisory}</p>
      <div className="flex space-x-4 pt-1 text-slate-400">
        <span className="flex items-center space-x-1"><Wind className="w-3.5 h-3.5 text-cyan-400" /><span>{weather?.windSpeedKnots || 15} kn</span></span>
        <span className="flex items-center space-x-1"><Waves className="w-3.5 h-3.5 text-blue-400" /><span>{weather?.waveHeightM || 1.5} m</span></span>
      </div>
    </div>
  );
}
