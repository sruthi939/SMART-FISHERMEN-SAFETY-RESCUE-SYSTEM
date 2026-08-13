import React from 'react';
import { MessageSquare, Shield, Users, LifeBuoy, Bell } from 'lucide-react';

export default function Messages() {
  const conversations = [
    { id: 1, name: 'Anitha (Wife)', text: 'Take care and be safe. Call me when free.', time: '08:30 AM', unread: 2, icon: Users },
    { id: 2, name: 'Coast Guard Team', text: 'Weather alert for Palk Bay region.', time: 'Yesterday', unread: 0, icon: Shield },
    { id: 3, name: 'Ramesh (Fellow Fisherman)', text: 'Where are you now?', time: 'May 13', unread: 0, icon: Users },
    { id: 4, name: 'Rescue Team', text: 'Training program on May 20.', time: 'May 12', unread: 0, icon: LifeBuoy },
    { id: 5, name: 'System Notifications', text: 'Your profile has been updated.', time: 'May 10', unread: 0, icon: Bell },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <MessageSquare size={22} className="text-blue-600" />
        <span>Messages</span>
      </h1>

      <div className="space-y-3">
        {conversations.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-4 hover:bg-slate-100/80 transition cursor-pointer">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-600 font-bold flex items-center justify-center text-sm shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{item.text}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                {item.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                    {item.unread}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
