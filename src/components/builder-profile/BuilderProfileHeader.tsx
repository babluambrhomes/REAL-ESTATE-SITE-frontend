"use client";

import Image from "next/image";
import { Plus, Phone, MessageCircle, Calendar, Check, MapPin, Award } from "lucide-react";
import toast from "react-hot-toast";

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
  coverSrc = "/builders/builder_cover_modern_building.jpg",
}: BuilderProfileHeaderProps) => {
  const handleScrollToForm = () => {
    const el = document.getElementById("builder-lead-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(
        `Hello ${name}, I am interested in your projects listed on Roofin.`
      )}`,
      "_blank"
    );
  };

  const handleContact = () => {
    window.location.href = "tel:+919876543210";
    toast.success(`Calling ${name}...`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 font-poppins">
      {/* 1. Cover Banner */}
      <div className="relative w-full h-[190px] sm:h-[230px] md:h-[270px] rounded-[24px] overflow-hidden border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-slate-900">
        <Image
          src={coverSrc}
          alt="Builder Cover"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1360px) 100vw, 1360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

        {/* + Add Cover Page Button */}
        <button
          type="button"
          onClick={() =>
            toast.success("Cover image upload is available in your Builder Dashboard.")
          }
          className="absolute right-4 sm:right-6 bottom-4 px-3.5 py-1.5 rounded-lg bg-sky-500/90 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all cursor-pointer border border-sky-400/40"
        >
          <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
          <span>Add Cover page</span>
        </button>
      </div>

      {/* 2. White Floating Builder Identity Card (Figma 1:1) */}
      <div className="relative -mt-6 sm:-mt-8 bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row items-center justify-between gap-5">
        
        {/* Left: Logo & Builder Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left w-full lg:w-auto">
          
          {/* Logo Box Overlapping Upwards */}
          <div className="relative shrink-0 -mt-12 sm:-mt-14">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] bg-white border-2 border-[#00D1FF] flex flex-col items-center justify-center p-3 shadow-[0_8px_25px_rgba(0,209,255,0.15)] relative">
              {/* Teal House Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#00D1FF] flex items-center justify-center text-white mb-1.5 shadow-xs">
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
              <span className="text-[12.5px] font-black text-[#0B132B] tracking-tight leading-none">
                Reverse<span className="text-[#00D1FF]">EXP</span><span className="text-[9.5px] text-slate-400 font-medium">.com</span>
              </span>
            </div>

            {/* Blue Target / Verified Badge at bottom-right of logo */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#1865F2] flex items-center justify-center text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <circle cx="12" cy="12" r="7" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
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

            <p className="text-xs sm:text-[13px] font-medium text-slate-500">
              {subtitle}
            </p>

            {/* Badges line with subtle gray dot separators */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-medium text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3 h-3 text-[#1865F2]" />
                {founded}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Award className="w-3 h-3 text-[#1865F2]" />
                {projectsCount}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3 h-3 text-[#1865F2]" />
                {locations}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions (Contact Builder, WhatsApp, Schedule Visit) */}
        <div className="flex flex-col items-center lg:items-end gap-2.5 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Contact Builder */}
            <button
              type="button"
              onClick={handleContact}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs sm:text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(24,101,242,0.3)] transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Builder</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,211,102,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Schedule Visit (Centered below) */}
          <button
            type="button"
            onClick={handleScrollToForm}
            className="w-full px-6 py-2 bg-[#F0F6FF] hover:bg-[#E2EFFF] text-[#1865F2] border border-[#BFDBFE] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1865F2]" />
            <span>Schedule Visit</span>
          </button>
        </div>

      </div>

    </div>
  );
};
