import React, { useState } from 'react';
import { Send, User, LifeBuoy, Building2, CheckCheck } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState('manu');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'manu', text: 'All good here. Weather is clear.', time: '10:20 AM', isMe: false },
    { id: 2, sender: 'manu', text: 'We will be back by tomorrow evening.', time: '10:21 AM', isMe: false },
    { id: 3, sender: 'me', text: 'Okay, take care and stay safe. Let us know if you need anything.', time: '10:25 AM', isMe: true },
    { id: 4, sender: 'manu', text: 'Sure, thank you!', time: '10:27 AM', isMe: false }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'me', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true }
    ]);
    setInputMsg('');
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs grid grid-cols-1 lg:grid-cols-12 min-h-[500px] overflow-hidden">
      {/* Conversations List */}
      <div className="lg:col-span-4 border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
        <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-slate-400">Messages</h3>

        <div className="space-y-1 text-xs">
          <div
            onClick={() => setActiveChat('manu')}
            className={`p-3 rounded-xl cursor-pointer transition flex items-center gap-3 ${
              activeChat === 'manu' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0">
              M
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <strong className={`font-bold block truncate ${activeChat === 'manu' ? 'text-white' : 'text-slate-900'}`}>Manu (Sea Queen)</strong>
                <span className={`text-[10px] ${activeChat === 'manu' ? 'text-blue-100' : 'text-slate-400'}`}>10:27 AM</span>
              </div>
              <p className={`text-[11px] truncate ${activeChat === 'manu' ? 'text-blue-100' : 'text-slate-500'}`}>Sure, thank you!</p>
            </div>
          </div>

          <div
            onClick={() => setActiveChat('ramesh')}
            className={`p-3 rounded-xl cursor-pointer transition flex items-center gap-3 ${
              activeChat === 'ramesh' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 font-bold flex items-center justify-center shrink-0">
              R
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <strong className="font-bold text-slate-900 block truncate">Ramesh (Blue Wave)</strong>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">We have returned to port.</p>
            </div>
          </div>

          <div
            onClick={() => setActiveChat('rescue')}
            className={`p-3 rounded-xl cursor-pointer transition flex items-center gap-3 ${
              activeChat === 'rescue' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center shrink-0">
              <LifeBuoy size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <strong className="font-bold text-slate-900 block truncate">Rescue Team</strong>
                <span className="text-[10px] text-slate-400">May 13</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">Training program on May 20.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-8 flex flex-col justify-between p-4">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
            M
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">Manu</h4>
            <span className="text-[10px] text-emerald-600 font-bold block">● Sea Queen • Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 py-4 flex-1 overflow-y-auto text-xs">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`p-3 rounded-2xl max-w-md ${
                msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-900 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                {msg.time} {msg.isMe && <CheckCheck size={12} className="text-blue-500" />}
              </span>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-100">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xs transition">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
