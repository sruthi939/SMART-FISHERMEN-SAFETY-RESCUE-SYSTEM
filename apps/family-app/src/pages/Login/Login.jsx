import React from 'react';

export default function Login() {
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-3">
      <h2 className="font-bold text-white text-sm">Family Portal Login</h2>
      <input type="text" placeholder="Phone Number" className="w-full p-2 bg-slate-950 border border-slate-800 rounded" />
      <button className="w-full py-2 bg-emerald-600 font-bold text-white rounded">Login</button>
    </div>
  );
}
