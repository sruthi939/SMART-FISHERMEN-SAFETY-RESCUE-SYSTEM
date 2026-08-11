import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function OTPVerification() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-extrabold text-white text-center mb-1">Verify OTP</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Enter the 6-digit code sent to your mobile phone</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="OTP Code" type="text" maxLength={6} placeholder="123456" className="text-center tracking-widest text-lg" required />
          <Button type="submit" className="w-full py-2.5">Verify & Login</Button>
        </form>
      </div>
    </div>
  );
}
