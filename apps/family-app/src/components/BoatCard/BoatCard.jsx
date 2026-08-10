import React from 'react';
import { Anchor } from 'lucide-react';

export default function BoatCard({ boat }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 text-xs">
      <span className="text-slate-400 text-[10px] uppercase">Tracked Vessel</span>
      <h3 className="font-extrabold text-white text-base flex items-center space-x-1.5">
        <Anchor className="w-4 h-4 text-cyan-400" />
        <span>{boat?.name || 'Sea Falcon'}</span>
      </h3>
      <p className="text-slate-400">{boat?.registrationNumber || 'KL-07-FISH-102'}</p>
    </div>
  );
}
