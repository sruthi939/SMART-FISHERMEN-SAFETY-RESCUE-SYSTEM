import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { authService } from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('admin@sfsrs.gov');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authService.login({ email, password });
      const user = res.user;
      const token = res.token || 'admin_sample_token';
      
      login(user, token);
      addNotification(`Welcome, ${user.name}! Government Admin Portal Authenticated.`, 'info');
      navigate('/admin');
    } catch (err) {
      console.error('Admin Login Error:', err);
      addNotification(err.message || 'Admin authentication failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-purple-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-3">
            <Building2 className="text-white stroke-[2.5]" size={28} />
          </div>
          <h2 className="text-xl font-extrabold text-white">Government Admin Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Official Maritime Authority Verification Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Admin Officer Email" type="email" placeholder="admin@sfsrs.gov" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <Button type="submit" disabled={loading} className="w-full py-2.5 mt-2 bg-purple-600 hover:bg-purple-500 text-white">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating Admin Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-semibold">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Authorized Government Personnel Only</span>
        </div>
      </div>
    </div>
  );
}
