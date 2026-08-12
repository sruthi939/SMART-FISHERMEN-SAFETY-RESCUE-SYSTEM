import React from 'react';
import { AlertTriangle, Info, Bell } from 'lucide-react';

export default function AlertCard({ title, message, time, severity = 'warning' }) {
  const styles = {
    danger: 'bg-red-950/40 border-red-800/60 text-red-200',
    warning: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
    info: 'bg-purple-950/40 border-purple-800/60 text-purple-200',
  };

  const Icons = {
    danger: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = Icons[severity] || Bell;

  return (
    <div className={`p-4 rounded-xl border ${styles[severity]} flex items-start gap-3`}>
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-xs">{title}</h4>
          <span className="text-[10px] opacity-75 font-mono">{time}</span>
        </div>
        <p className="text-xs mt-1 opacity-90 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
