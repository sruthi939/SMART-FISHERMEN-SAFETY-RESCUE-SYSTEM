import React from 'react';
import { HelpCircle, ChevronRight, PhoneCall } from 'lucide-react';

export default function HelpSupport() {
  const faqs = [
    'How to use Live Tracking?',
    'How to create a new trip?',
    'How to update family details?',
    'How to receive alerts?',
    'Contact Support'
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-black text-slate-900">Help & Support</h1>

      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-100 rounded-xl flex items-center justify-between cursor-pointer transition text-xs font-bold text-slate-800"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle size={16} className="text-blue-600" />
              <span>{faq}</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
        ))}
      </div>

      {/* Emergency Helpline Box */}
      <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-xl text-center space-y-2 text-xs">
        <strong className="text-slate-900 font-bold block">Need immediate help?</strong>
        <span className="text-slate-500 block">Call Fishermen Helpline</span>
        <a href="tel:18001234567" className="inline-flex items-center gap-2 text-lg font-black text-blue-600 font-mono">
          <PhoneCall size={20} /> 1800 123 4567
        </a>
      </div>
    </div>
  );
}
