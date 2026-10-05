"use client";

import { Award } from "lucide-react";

export const WhyChooseRoofinBanner = () => {
  return (
    <div className="w-full my-8 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#94B8FF]/60 bg-gradient-to-r from-[#98BEFD] via-[#D5E5FD] via-60% to-white shadow-[0_4px_24px_rgba(24,101,242,0.08)] flex flex-col lg:flex-row items-center justify-between p-3.5 sm:p-5 gap-4 lg:gap-2">
      {/* 1. Header Title: Why choose Roofin */}
      <div className="px-3 sm:px-6 py-1 text-center lg:text-left shrink-0">
        <h3 className="text-[#1865F2] font-bold text-[19px] sm:text-[21px] whitespace-nowrap tracking-tight">
          Why choose Roofin
        </h3>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block h-11 w-[1px] bg-[#1865F2]/20 shrink-0" />

      {/* 2. Feature 1: Verified Listings */}
      <div className="flex items-center gap-3.5 px-3 sm:px-5 py-1.5 flex-1 min-w-0">
        {/* Verified Circular Badge */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1865F2] text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-4 w-4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <div>
          <h4 className="text-[14px] font-bold text-[#1865F2] leading-tight">
            Verified Listings
          </h4>
          <p className="text-[12px] text-[#1E293B] font-normal leading-snug mt-0.5">
            100% Verified properties
          </p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block h-11 w-[1px] bg-[#1865F2]/20 shrink-0" />

      {/* 3. Feature 2: Best Price guarantee */}
      <div className="flex items-center gap-3.5 px-3 sm:px-5 py-1.5 flex-1 min-w-0">
        {/* Award Medal Circular Badge */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-xs text-[#1865F2]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-6 w-6">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            <polyline points="9.5 7.5 11 9 14.5 5.5" strokeWidth="2.5" />
          </svg>
        </div>
        <div>
          <h4 className="text-[14px] font-bold text-[#1865F2] leading-tight">
            Best Price guarantee
          </h4>
          <p className="text-[12px] text-[#1E293B] font-normal leading-snug mt-0.5">
            Get best value for your money
          </p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block h-11 w-[1px] bg-[#1865F2]/20 shrink-0" />

      {/* 4. Feature 3: Easy & Fast Process */}
      <div className="flex items-center gap-3.5 px-3 sm:px-5 py-1.5 flex-1 min-w-0">
        {/* Stopwatch Circular Badge */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-xs text-[#1865F2]">
          <div className="relative flex items-center justify-center">
            {/* Speed motion lines in red */}
            <div className="absolute -left-1.5 flex flex-col gap-0.5">
              <span className="h-[2px] w-2 bg-[#EF4444] rounded-full" />
              <span className="h-[2px] w-3 bg-[#EF4444] rounded-full" />
              <span className="h-[2px] w-1.5 bg-[#EF4444] rounded-full" />
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-6 w-6">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2 2" />
              <path d="M10 2h4" />
            </svg>
          </div>
        </div>
        <div>
          <h4 className="text-[14px] font-bold text-[#1865F2] leading-tight">
            Easy & Fast Process
          </h4>
          <p className="text-[12px] text-[#1E293B] font-normal leading-snug mt-0.5">
            Hassle - free property search
          </p>
        </div>
      </div>
    </div>
  );
};
