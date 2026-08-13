import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Ship, ShieldCheck, AlertTriangle, CloudSun, PhoneCall, MapPin, ArrowRight, Radio, Wind, Waves, Clock, CheckCircle2 } from 'lucide-react';
import Map from '../../components/Map';
import { useAuth } from '../../hooks/useAuth';

export default function FamilyDashboard() {
  const { user } = useAuth();
  const userName = user?.name || 'Anitha';

  return (
    <div className="space-y-6">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Good Morning, {userName} 👋</h1>
          <p className="text-xs text-slate-500 mt-0.5">Stay connected with your family and their safety.</p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold shrink-0">
            <Users size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Fishermen</span>
            <strong className="text-xl font-black text-slate-900 font-mono">02</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold shrink-0">
            <Ship size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">On Trip</span>
            <strong className="text-xl font-black text-slate-900 font-mono">01</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Safe</span>
            <strong className="text-xl font-black text-slate-900 font-mono">01</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-bold shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">In Danger</span>
            <strong className="text-xl font-black text-slate-900 font-mono">00</strong>
          </div>
        </div>
      </div>

      {/* Middle Row: Live Overview Map + Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Live Overview Map Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Radio size={16} className="text-blue-600 animate-pulse" /> Live Overview
            </h2>
            <Link to="/family/location" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
          </div>

          <Map title="Palk Bay Live Vessel Tracker (Sea Queen & Blue Wave)" />

          {/* Active Vessels Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <strong className="text-slate-900 font-bold block">Manu</strong>
                  <span className="text-[11px] text-slate-500">Sea Queen • <span className="text-emerald-600 font-bold">On Trip</span></span>
                </div>
              </div>
              <Link to="/family/location" className="px-2.5 py-1 bg-blue-600 text-white font-bold rounded-lg text-[10px]">Track</Link>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <div>
                  <strong className="text-slate-900 font-bold block">Ramesh</strong>
                  <span className="text-[11px] text-slate-500">Blue Wave • <span className="text-blue-600 font-bold">Returned</span></span>
                </div>
              </div>
              <Link to="/family/fisherman" className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px]">Details</Link>
            </div>
          </div>
        </div>

        {/* Recent Alerts Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" /> Recent Alerts
            </h2>
            <Link to="/family/alerts" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-amber-900 font-bold">Low Fuel Warning</strong>
                <span className="text-[10px] text-slate-400 font-mono">10:45 AM</span>
              </div>
              <p className="text-[11px] text-amber-800">Sea Queen (Manu)</p>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-blue-900 font-bold">Weather Update</strong>
                <span className="text-[10px] text-slate-400 font-mono">08:30 AM</span>
              </div>
              <p className="text-[11px] text-blue-800">Moderate winds in your area</p>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-emerald-900 font-bold">Safe Return</strong>
                <span className="text-[10px] text-slate-400 font-mono">Yesterday</span>
              </div>
              <p className="text-[11px] text-emerald-800">Blue Wave (Ramesh)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Return + Weather + Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Expected Return */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Clock size={16} className="text-blue-600" /> Upcoming Expected Return
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-slate-900 font-bold block">Sea Queen (Manu)</strong>
                <span className="text-[11px] text-slate-500 font-mono">May 15, 2025 - 05:30 PM</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded-md text-[10px]">On Trip</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-slate-900 font-bold block">Blue Wave (Ramesh)</strong>
                <span className="text-[11px] text-slate-500 font-mono">May 15, 2025 - 07:00 PM</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-bold rounded-md text-[10px]">Safe</span>
            </div>
          </div>

          <Link to="/family/history" className="text-xs font-bold text-blue-600 hover:underline block text-center pt-1">View Trips →</Link>
        </div>

        {/* Weather at Palk Bay */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <CloudSun size={16} className="text-amber-500" /> Weather at Palk Bay
          </h2>

          <div className="flex items-center justify-between py-2">
            <div>
              <strong className="text-3xl font-black text-slate-900 font-mono">29°C</strong>
              <span className="text-xs text-slate-500 block font-semibold">Partly Cloudy</span>
            </div>
            <CloudSun size={38} className="text-amber-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Wind size={14} className="text-blue-500" />
              <span>Wind 18 km/h</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Waves size={14} className="text-cyan-500" />
              <span>Waves 1.2 m</span>
            </div>
          </div>

          <Link to="/family/alerts" className="text-xs font-bold text-blue-600 hover:underline block text-center pt-1">View Forecast →</Link>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <PhoneCall size={16} className="text-red-500" /> Emergency Contacts
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Coast Guard</span>
              <a href="tel:+914423456789" className="font-extrabold text-slate-900 font-mono hover:text-blue-600">+91 44 2345 6789</a>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Rescue Team</span>
              <a href="tel:+919876543310" className="font-extrabold text-slate-900 font-mono hover:text-blue-600">+91 98765 43310</a>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Fishermen Helpline</span>
              <a href="tel:18001204567" className="font-extrabold text-blue-600 font-mono">1800 120 4567</a>
            </div>
          </div>

          <button className="w-full text-xs py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition">Save Contacts</button>
        </div>
      </div>
    </div>
  );
}
