import React from 'react';
import { AlertCircle, Clock, MapPin } from 'lucide-react';
import Button from './Button';

export default function EmergencyCard({ emergency, onAssign }) {
  return (
    <div className="bg-red-950/20 border border-red-800/60 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
          <AlertCircle size={16} />
          <span>DISTRESS SOS #{emergency?.id || 'SOS-901'}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          <Clock size={12} /> {emergency?.time || '2 mins ago'}
        </span>
      </div>

      <div className="text-xs text-slate-200">
        <p className="font-semibold">{emergency?.vessel || 'Sea Harrier IV'} ({emergency?.captain || 'Capt. Ramesh'})</p>
        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
          <MapPin size={12} /> Coords: {emergency?.coords || '9.9124° N, 76.2411° E'} (Sector 4B)
        </p>
      </div>

      {onAssign && (
        <Button variant="danger" className="w-full text-xs py-1.5" onClick={() => onAssign(emergency)}>
          Dispatch Rescue Team
        </Button>
      )}
    </div>
  );
}
