"use client";

import { Check, Building2, Home, Construction, Map, Timer } from "lucide-react";

export const BuilderTrustAndStats = () => {
  const locations = ["Noida", "Greater Noida", "Gurgaon", "Noida Extension"];

  const stats = [
    {
      id: "stat-1",
      val: "25+",
      label: "PROJECTS DELIVERED",
      sub: "Across Noida",
      icon: Home,
      bgColor: "bg-[#EBF5FF] text-[#1865F2]",
    },
    {
      id: "stat-2",
      val: "8,500+",
      label: "HOMES DELIVERED",
      sub: "Happy Families",
      icon: Building2,
      bgColor: "bg-[#E6FAFE] text-[#00D1FF]",
    },
    {
      id: "stat-3",
      val: "12",
      label: "UNDER DEVELOPMENT",
      sub: "Ongoing Projects",
      icon: Construction,
      bgColor: "bg-[#EEF2FF] text-indigo-600",
    },
    {
      id: "stat-4",
      val: "120+",
      label: "LAND BANK",
      sub: "Across",
      icon: Map,
      bgColor: "bg-[#EBF8FF] text-sky-600",
    },
    {
      id: "stat-5",
      val: "25+",
      label: "ON TIME DELIVERED",
      sub: "Track Record",
      icon: Timer,
      bgColor: "bg-[#EDFCF7] text-teal-600",
    },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* 1. Left Card: Roofin Trust Score (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B]">
              Roofin trust score
            </h3>
            <span className="px-3 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
              GOOD
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-[#1865F2] tracking-tight">
              7.8
            </span>
            <span className="text-sm font-bold text-slate-400">/10</span>
          </div>
          <p className="text-[11px] font-medium text-slate-400">
            Top 5% Builder in NCR
          </p>

          {/* Semicircular Gauge Meter (SVG Arc) */}
          <div className="relative w-full flex flex-col items-center justify-center my-2">
            <svg viewBox="0 0 200 110" className="w-48 h-26 overflow-visible">
              {/* Background Gray Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#EEF2F6"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Active Gradient Arc (78% filled) */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D1FF" />
                  <stop offset="60%" stopColor="#1865F2" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="18"
                strokeDasharray="251.2"
                strokeDashoffset="55"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Verification Badges with Blue Check Icons */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-bold text-[#0B132B] pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </span>
              RERA Verified
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </span>
              Land Title Verified
            </span>
          </div>
        </div>

        {/* 2. Right Card: Location Presence & 5 Metrics (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          
          {/* Top: Location Presence Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm sm:text-[15px] font-black text-[#0B132B]">
              Location Presence
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 bg-[#F0F6FF] text-[#1865F2] border border-[#D5E6FA] rounded-full text-[11px] font-bold transition-colors cursor-pointer hover:bg-blue-100"
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
                  className="bg-white rounded-2xl p-3 border border-slate-100 flex flex-col items-center text-center transition-all hover:-translate-y-0.5 hover:shadow-sm shadow-2xs"
                >
                  {/* Circular Icon Badge */}
                  <div className={`w-11 h-11 rounded-full ${st.bgColor} flex items-center justify-center mb-2 shadow-2xs`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-lg sm:text-xl font-black text-[#0B132B] tracking-tight">
                    {st.val}
                  </span>
                  <span className="text-[9.5px] font-black text-[#0B132B] leading-tight mt-1 uppercase tracking-wider">
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
