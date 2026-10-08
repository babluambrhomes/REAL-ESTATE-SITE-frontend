"use client";

import Image from "next/image";
import { Plus, Phone, MessageCircle, Calendar, Check, MapPin, Award } from "lucide-react";

interface BuilderProfileHeaderProps {
  name?: string;
  subtitle?: string;
  founded?: string;
  projectsCount?: string;
  locations?: string;
  coverSrc?: string;
}

export const BuilderProfileHeader = ({
  name = "ReverseEXP Pvt.Ltd",
  subtitle = "Trusted Real Estate Developer",
  founded = "Founded 2012",
  projectsCount = "25+ Project Delivered",
  locations = "Noida , Greater Noida, Gurgaon",
  coverSrc = "/images/properties/modern-white-penthouse.jpg",
}: BuilderProfileHeaderProps) => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 font-jakarta">
      
      {/* 1. Cover Banner */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-[24px] overflow-hidden border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-slate-900">
        <Image
          src={coverSrc}
          alt="Builder Cover"
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="(max-width: 1360px) 100vw, 1360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Add Cover Page Button */}
        <button
          type="button"
          className="absolute right-4 sm:right-6 bottom-4 px-3.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#1865F2]" />
          <span>Add Cover page</span>
        </button>
      </div>

      {/* 2. White Floating Builder Identity Card */}
      <div className="relative -mt-10 sm:-mt-12 bg-white rounded-[24px] border border-slate-200/90 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center lg:items-center justify-between gap-5">
        
        {/* Left: Logo & Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 text-center sm:text-left w-full lg:w-auto">
          
          {/* Exact Logo Box from Figma */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] bg-[#F4F9FF] border-2 border-[#1865F2]/20 flex flex-col items-center justify-center p-2 shadow-2xs">
              {/* Teal House Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#00D1FF] flex items-center justify-center text-white mb-1 shadow-2xs">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-[12px] font-black text-[#0B132B] tracking-tight leading-none">
                Reverse<span className="text-[#00D1FF]">EXP</span><span className="text-[9px] text-slate-400 font-bold">.com</span>
              </span>
            </div>

            {/* Bottom-right verified 4-star crosshair badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white">
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </div>
            </div>
          </div>

          {/* Builder Details */}
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B132B] tracking-tight">
                {name}
              </h1>
              <div className="w-5 h-5 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3.5]" />
              </div>
            </div>

            <p className="text-xs sm:text-[13px] font-semibold text-slate-500">
              {subtitle}
            </p>

            {/* Badges row with icons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-[11px] font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3 h-3 text-[#1865F2]" />
                {founded}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Award className="w-3 h-3 text-[#1865F2]" />
                {projectsCount}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3 h-3 text-[#1865F2]" />
                {locations}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-center lg:items-end gap-2.5 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Contact Builder */}
            <button
              type="button"
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs sm:text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(24,101,242,0.3)] transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Builder</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,211,102,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Schedule Visit */}
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2 bg-[#F0F6FF] hover:bg-[#E2EFFF] text-[#1865F2] border border-[#BFDBFE] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Visit</span>
          </button>
        </div>

      </div>

    </div>
  );
};
