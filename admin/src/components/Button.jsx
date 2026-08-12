import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50';
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20',
    outline: 'border border-purple-500/40 text-purple-300 hover:bg-purple-950/40',
  };

  return (
    <button className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
