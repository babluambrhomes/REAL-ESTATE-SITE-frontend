"use client";

import { ShieldCheck, FileSpreadsheet, Building2, Star } from "lucide-react";

export const PostPropertyStats = () => {
  return (
    <div className="w-full max-w-[1340px] mx-auto mt-6 sm:mt-7">
      <div className="rounded-[18px] bg-[#F8FAFF] border-[1.5px] border-[#93C5FD] p-4 sm:p-5 shadow-[0_4px_20px_rgba(37,99,235,0.04)] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#BFDBFE]">
        
        {/* Stat 1: 50k+ verified buyers */}
        <div className="flex items-center gap-3.5 sm:gap-4 lg:px-6">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(37,99,235,0.08)] border border-[#E0E7FF] shrink-0">
            {/* Person with Verified Badge SVG */}
            <svg className="w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none">
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="#1E293B"/>
              <path d="M6 21V19C6 16.7909 7.79086 15 10 15H11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="17.5" cy="17.5" r="4.5" fill="#2563EB"/>
              <path d="M15.5 17.5L17 19L19.5 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 4L19 6L21 7L19 8L18 10L17 8L15 7L17 6L18 4Z" fill="#2563EB"/>
            </svg>
          </div>
          <div>
            <div className="text-[22px] sm:text-[24px] font-extrabold text-[#2563EB] leading-tight font-jakarta tracking-tight">
              50k+
            </div>
            <div className="text-[13px] sm:text-[14px] font-medium text-[#64748B] leading-tight mt-0.5">
              verified buyers
            </div>
          </div>
        </div>

        {/* Stat 2: 2L+ properties listed */}
        <div className="flex items-center gap-3.5 sm:gap-4 lg:px-6">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(37,99,235,0.08)] border border-[#E0E7FF] shrink-0">
            {/* Checklist Document with House SVG */}
            <svg className="w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="13" height="18" rx="2" stroke="#1E293B" strokeWidth="2"/>
              <path d="M7 7H11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 11H10" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 15H9" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="17" cy="16" r="5" fill="#2563EB"/>
              <path d="M14.5 16.5L17 14L19.5 16.5V18.5H14.5V16.5Z" fill="white"/>
            </svg>
          </div>
          <div>
            <div className="text-[22px] sm:text-[24px] font-extrabold text-[#2563EB] leading-tight font-jakarta tracking-tight">
              2L+
            </div>
            <div className="text-[13px] sm:text-[14px] font-medium text-[#64748B] leading-tight mt-0.5">
              properties listed
            </div>
          </div>
        </div>

        {/* Stat 3: 10k+ Builders & Brokers */}
        <div className="flex items-center gap-3.5 sm:gap-4 lg:px-6">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(37,99,235,0.08)] border border-[#E0E7FF] shrink-0">
            {/* Hand Holding House / Keys SVG */}
            <svg className="w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L4 10V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V10L12 4Z" stroke="#1E293B" strokeWidth="2"/>
              <path d="M10 20V13H14V20" fill="#2563EB"/>
              <circle cx="17" cy="8" r="2.5" fill="#2563EB"/>
            </svg>
          </div>
          <div>
            <div className="text-[22px] sm:text-[24px] font-extrabold text-[#2563EB] leading-tight font-jakarta tracking-tight">
              10k+
            </div>
            <div className="text-[13px] sm:text-[14px] font-medium text-[#64748B] leading-tight mt-0.5">
              Builders &amp; Brokers
            </div>
          </div>
        </div>

        {/* Stat 4: 4.8/5 Seller Rating */}
        <div className="flex items-center gap-3.5 sm:gap-4 lg:px-6">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(37,99,235,0.08)] border border-[#E0E7FF] shrink-0">
            {/* User with 3 Stars SVG */}
            <svg className="w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none">
              <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="#1E293B"/>
              <path d="M6 18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 19.5L8.5 18L9 19.5H10.5L9.25 20.3L9.75 21.8L8.5 20.9L7.25 21.8L7.75 20.3L6.5 19.5H8Z" fill="#2563EB"/>
              <path d="M12 19.5L12.5 18L13 19.5H14.5L13.25 20.3L13.75 21.8L12.5 20.9L11.25 21.8L11.75 20.3L10.5 19.5H12Z" fill="#2563EB"/>
              <path d="M16 19.5L16.5 18L17 19.5H18.5L17.25 20.3L17.75 21.8L16.5 20.9L15.25 21.8L15.75 20.3L14.5 19.5H16Z" fill="#2563EB"/>
            </svg>
          </div>
          <div>
            <div className="text-[22px] sm:text-[24px] font-extrabold text-[#2563EB] leading-tight font-jakarta tracking-tight">
              4.8/5
            </div>
            <div className="text-[13px] sm:text-[14px] font-medium text-[#64748B] leading-tight mt-0.5">
              Seller Rating
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
