import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, ArrowRight, Loader2, Clock, AlertTriangle } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { authService } from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingApprovalMsg, setPendingApprovalMsg] = useState(null);
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPendingApprovalMsg(null);

    try {
      const res = await authService.login({ email, password });
      const user = res.user;
      const token = res.token || 'jwt_sample_token';
      
      login(user, token);
      addNotification(`Welcome back, ${user.name}!`, 'info');
      navigate(`/${user.role || 'fisherman'}`);
    } catch (err) {
      console.error('Login error:', err);
      if (err.message && err.message.includes('pending Government Admin')) {
        setPendingApprovalMsg(err.message);
        addNotification('Account Pending Admin Verification', 'warning');
      } else {
        addNotification(err.message || 'Login failed. Please verify credentials.', 'error');
      }
    } finally {
      setLoading(false);
    }
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

        {pendingApprovalMsg && (
          <div className="mb-5 p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-3 animate-in fade-in">
            <Clock size={20} className="shrink-0 text-amber-400 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300 mb-0.5">Admin Approval Pending</span>
              <p className="leading-relaxed opacity-90">{pendingApprovalMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email Address" type="email" placeholder="captain@sfsrs.gov" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="flex items-center justify-between text-xs">
            <Link to="/auth/forgot-password" className="text-cyan-400 hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" disabled={loading} className="w-full py-2.5 mt-2">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400 flex flex-col gap-2">
          <div>
            Don't have an account? <Link to="/auth/register" className="text-cyan-400 font-semibold hover:underline">Register here</Link>
          </div>
          <Link to="/" className="text-slate-500 hover:text-slate-300 font-medium text-[11px] underline">
            ← Back to Portal Selection Gateway
          </Link>
        </div>
      </div>
    </div>
  );
}
