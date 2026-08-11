import React from 'react';

export default function StatusBadge({ status = 'Active' }) {
  const styles = {
    Active: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
    Safe: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
    Warning: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
    Distress: 'bg-red-950/80 text-red-400 border-red-500/40 animate-pulse',
    Offline: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${styles[status] || styles.Active}`}>
      {status}
    </span>
  );
}
