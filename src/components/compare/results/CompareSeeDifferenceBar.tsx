"use client";

import { useState } from "react";
import { Search, ArrowRight, CheckCircle2, Tag, Building } from "lucide-react";

interface CompareSeeDifferenceBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export const CompareSeeDifferenceBar = ({
  activeTab,
  onTabChange,
  onSearch,
}: CompareSeeDifferenceBarProps) => {
  const [searchVal, setSearchVal] = useState("");

  const tabs = [
    { id: "highlights", label: "Highlights", icon: CheckCircle2 },
    { id: "price", label: "Price", icon: Tag },
    { id: "facilities", label: "Facilities", icon: Building },
  ];

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8 font-jakarta">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0B132B] tracking-tight">
          See The Difference
        </h2>
        <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
          Make a smarter decision for your dream home.
        </p>
      </div>

      {/* Search Input Bar with Rounded Pill & Blue Circular Action Button */}
      <div className="max-w-[560px] mx-auto mb-6">
        <div className="relative flex items-center bg-white rounded-full border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-1.5 pl-4 transition-all focus-within:border-blue-400 focus-within:shadow-[0_2px_16px_rgba(24,101,242,0.1)]">
          {/* Custom Search with Sparkle Icon from Figma */}
          <div className="text-slate-400 mr-2.5 flex items-center shrink-0">
            <div className="relative flex items-center justify-center">
              <Search className="w-4.5 h-4.5 text-slate-800 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 text-[#00D084] text-[10px] font-bold leading-none select-none">
                ✦
              </span>
            </div>
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Select Features"
            className="w-full bg-transparent text-[13.5px] sm:text-[14px] text-slate-800 placeholder-slate-400 font-normal outline-none pr-2"
          />
          <button
            type="button"
            onClick={() => onSearch?.(searchVal)}
            className="w-9 h-9 rounded-full bg-[#1865F2] hover:bg-[#1250C4] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xs cursor-pointer shrink-0"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3 Quick Filter Pill Tabs */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#D6EAFF] text-[#0B132B] shadow-[0_2px_8px_rgba(24,101,242,0.12)] border border-[#BFDBFE]"
                  : "bg-[#F1F3F5] text-[#374151] hover:bg-[#E5E7EB] border border-transparent"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  isActive ? "text-[#059669]" : "text-slate-600"
                }`}
              >
                {tab.id === "highlights" ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#059669]" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
