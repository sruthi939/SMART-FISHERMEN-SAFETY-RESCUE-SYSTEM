import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/auth/otp');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <h2 className="text-xl font-extrabold text-white text-center mb-1">Create an Account</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Register as Fisherman, Family, or Rescue Staff</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <Input label="Full Name" placeholder="Ramesh Kumar" required />
          <Input label="Email" type="email" placeholder="ramesh@sfsrs.gov" required />
          <Input label="Phone Number" type="tel" placeholder="+91 9876543210" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          <Button type="submit" className="w-full py-2.5 mt-2">Continue to Verification</Button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Already have an account? <Link to="/auth/login" className="text-cyan-400 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
