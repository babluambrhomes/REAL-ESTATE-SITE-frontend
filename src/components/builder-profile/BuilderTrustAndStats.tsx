"use client";

import { Check, ShieldCheck, Award, Building2, Home, Construction, Map, Timer } from "lucide-react";

export const BuilderTrustAndStats = () => {
  const locations = ["Noida", "Greater Noida", "Gurgaon", "Noida Extension"];

  const stats = [
    {
      id: "stat-1",
      val: "25+",
      label: "PROJECTS DELIVERED",
      sub: "Across Noida",
      icon: Home,
      bgColor: "bg-blue-50 text-[#1865F2]",
    },
    {
      id: "stat-2",
      val: "8,500+",
      label: "HOMES DELIVERED",
      sub: "Happy Families",
      icon: Building2,
      bgColor: "bg-cyan-50 text-[#00D1FF]",
    },
    {
      id: "stat-3",
      val: "12",
      label: "UNDER DEVELOPMENT",
      sub: "Ongoing Projects",
      icon: Construction,
      bgColor: "bg-indigo-50 text-indigo-600",
    },
    {
      id: "stat-4",
      val: "120+",
      label: "LAND BANK",
      sub: "Across",
      icon: Map,
      bgColor: "bg-sky-50 text-sky-600",
    },
    {
      id: "stat-5",
      val: "25+",
      label: "ON TIME DELIVERED",
      sub: "Track Record",
      icon: Timer,
      bgColor: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 font-jakarta">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* 1. Left Card: Roofin Trust Score (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-[20px] border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0B132B]">
              Roofin trust score
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-extrabold uppercase tracking-wide">
              GOOD
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#1865F2]">7.8</span>
            <span className="text-xs font-bold text-slate-400">/ 10</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500">
            Top 5% Builder in NCR
          </p>

          {/* Semicircular Gauge Meter (SVG Arc) */}
          <div className="relative w-full flex flex-col items-center justify-center my-2">
            <svg viewBox="0 0 200 110" className="w-44 h-24 overflow-visible">
              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Active Gradient Arc (78% filled) */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D1FF" />
                  <stop offset="50%" stopColor="#1865F2" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="16"
                strokeDasharray="251.2"
                strokeDashoffset="55"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Verification Badges with Blue Check Icons */}
          <div className="flex items-center justify-center gap-5 text-[11px] font-bold text-[#0B132B] pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              RERA Verified
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              Land Title Verified
            </span>
          </div>
        </div>

        {/* 2. Right Card: Location Presence & 5 Metrics (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-[20px] border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          
          {/* Top: Location Presence Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#0B132B]">
              Location Presence
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[10.5px] font-semibold transition-colors"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: 5 Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {stats.map((st) => {
              const IconComp = st.icon;
              return (
                <div
                  key={st.id}
                  className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-3 border border-slate-100/90 flex flex-col items-center text-center transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className={`w-9 h-9 rounded-xl ${st.bgColor} flex items-center justify-center mb-2 shadow-2xs`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-[#0B132B] tracking-tight">
                    {st.val}
                  </span>
                  <span className="text-[9.5px] font-black text-slate-700 leading-tight mt-0.5 uppercase tracking-wide">
                    {st.label}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5 truncate w-full">
                    {st.sub}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
