import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3 text-slate-400">
      <Loader2 className="animate-spin text-cyan-400" size={28} />
      <span className="text-xs font-semibold">{text}</span>
    </div>
  );
}
