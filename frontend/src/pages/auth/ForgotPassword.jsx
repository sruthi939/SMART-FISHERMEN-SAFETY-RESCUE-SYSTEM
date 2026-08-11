import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-extrabold text-white text-center mb-1">Reset Password</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Enter your email to receive recovery instructions</p>
        <form className="flex flex-col gap-4">
          <Input label="Email Address" type="email" placeholder="user@sfsrs.gov" required />
          <Button type="submit" className="w-full py-2.5">Send Recovery Link</Button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Back to <Link to="/auth/login" className="text-cyan-400 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
