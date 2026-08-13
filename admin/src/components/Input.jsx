import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-slate-300">{label}</label>}
      <input
        className={`bg-slate-900/80 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-red-400">{error}</span>}
    </div>
  );
}
