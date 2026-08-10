import React from 'react';

export default function Register() {
  return (
    <div className="p-6 bg-slate-900 rounded-xl text-xs space-y-4">
      <h2 className="font-bold text-white text-sm">Fisherman Registration</h2>
      <input type="text" placeholder="Full Name" className="w-full p-2 bg-slate-950 border border-slate-800 rounded" />
      <input type="email" placeholder="Email" className="w-full p-2 bg-slate-950 border border-slate-800 rounded" />
      <button className="w-full py-2 bg-cyan-600 font-bold text-white rounded">Register</button>
    </div>
  );
}
