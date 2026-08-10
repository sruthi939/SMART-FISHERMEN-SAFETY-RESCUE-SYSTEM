import React from 'react';
import { Home, Compass, CloudRain, ShieldAlert, Users } from 'lucide-react';

export default function BottomNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'tracking', label: 'Map', icon: Compass },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'crew', label: 'Crew', icon: Users },
    { id: 'emergency', label: 'SOS', icon: ShieldAlert }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 flex justify-around items-center z-50">
      {tabs.map(t => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
