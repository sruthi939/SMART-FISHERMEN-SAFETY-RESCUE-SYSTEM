import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, ArrowRight } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login based on role email or default to fisherman
    let role = 'fisherman';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('rescue')) role = 'rescue';
    if (email.includes('family')) role = 'family';

    login({ name: 'User', email, role }, 'sample_jwt_token');
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3">
            <Anchor className="text-slate-950 stroke-[2.5]" size={26} />
          </div>
          <h2 className="text-xl font-extrabold text-white">Smart Fishermen Safety & Rescue</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email Address" type="email" placeholder="captain@sfsrs.gov" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="flex items-center justify-between text-xs">
            <Link to="/auth/forgot-password" className="text-cyan-400 hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" className="w-full py-2.5 mt-2">
            <span>Sign In</span>
            <ArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account? <Link to="/auth/register" className="text-cyan-400 font-semibold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
}
