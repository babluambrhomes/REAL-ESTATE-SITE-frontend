"use client";

import { useState } from "react";
import {
  Check,
  Phone,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export const PropertyDetailBuilderAndDealer = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "I am interested in this property.",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Enquiry sent successfully to the dealer!");
  };

  return (
    <div className="w-full my-6 rounded-2xl border border-[#D5E5FD] bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(24,101,242,0.04)] flex flex-col gap-5">
      {/* ----------------- 1. GM MULTIVENTURES BUILDER CARD ----------------- */}
      <div className="w-full rounded-xl border border-[#D8E6FC] bg-[#F4F8FE] p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Left Builder Info & Stats */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full lg:w-auto">
          {/* Builder Circular Logo matching screenshot */}
          <div className="h-[76px] w-[76px] rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center p-2 shadow-sm shrink-0 text-center">
            {/* Geometric Skyline Logo */}
            <svg viewBox="0 0 48 48" className="h-7 w-7 text-[#0B132B]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 42h36" stroke="#0B132B" strokeWidth="3" />
              {/* Left Skyscraper */}
              <path d="M12 42V18l8-6v30" fill="#0B132B" stroke="#0B132B" strokeWidth="2" />
              {/* Right taller Skyscraper */}
              <path d="M22 42V8l14 8v26" fill="#0B132B" stroke="#0B132B" strokeWidth="2" />
              {/* Cutout windows / diagonal line */}
              <path d="M16 22l4-3v23h-4z" fill="#FFFFFF" stroke="none" />
              <path d="M26 14l6 4v24h-6z" fill="#FFFFFF" stroke="none" />
            </svg>
            <span className="text-[6.5px] font-black text-[#0B132B] tracking-tight uppercase leading-none mt-1">
              GM MULTIVENTURES
            </span>
            <span className="text-[4px] font-bold text-[#D97706] tracking-tighter uppercase leading-none mt-0.5 scale-90">
              YOUR KEY TO SMART REAL ESTATE DECISIONS
            </span>
          </div>

          <div className="text-center sm:text-left flex flex-col justify-center">
            <h3 className="text-[17px] font-bold text-[#0B132B] uppercase tracking-tight">
              GM MULTIVENTURES
            </h3>
            <p className="text-[12.5px] text-[#64748B] mt-0.5 font-normal leading-tight">
              Gm multiventures Group is one of India&apos;s leading real state in greater noida
            </p>

            {/* 4 Stats Columns with vertical separators */}
            <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-3">
              <div className="flex flex-col items-start text-left">
                <span className="font-bold text-[#1865F2] text-[16px] leading-tight">271+</span>
                <span className="text-[#64748B] text-[11.5px] font-normal leading-tight">Projects</span>
              </div>
              <div className="h-7 w-[1px] bg-[#CBD5E1]" />
              <div className="flex flex-col items-start text-left">
                <span className="font-bold text-[#1865F2] text-[16px] leading-tight">10k</span>
                <span className="text-[#64748B] text-[11.5px] font-normal leading-tight">Fallowers</span>
              </div>
              <div className="h-7 w-[1px] bg-[#CBD5E1]" />
              <div className="flex flex-col items-start text-left">
                <span className="font-bold text-[#1865F2] text-[16px] leading-tight">50k</span>
                <span className="text-[#64748B] text-[11.5px] font-normal leading-tight">Views</span>
              </div>
              <div className="h-7 w-[1px] bg-[#CBD5E1]" />
              <div className="flex flex-col items-start text-left">
                <span className="font-bold text-[#1865F2] text-[16px] leading-tight">2k</span>
                <span className="text-[#64748B] text-[11.5px] font-normal leading-tight">Videos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Button */}
        <button className="px-4 py-2 rounded-lg border border-[#1865F2] text-[#1865F2] hover:bg-blue-50 text-[12.5px] font-semibold transition-colors whitespace-nowrap shadow-2xs cursor-pointer flex items-center gap-1 shrink-0 bg-white">
          <span>View Builder Project Details</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* ----------------- 2. DEALER PROFILE & SEND ENQUIRY ROW (2 COLUMNS) ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Jitendra Singh Profile Box (Span 7) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-start justify-between shadow-2xs">
          {/* Stylized Illustrated Avatar Matching Reference */}
          <div className="flex flex-col items-center shrink-0 mx-auto sm:mx-0">
            <div className="relative h-40 w-36 sm:h-44 sm:w-40 rounded-xl border border-[#D5E5FD] bg-[#F2F7FE] flex items-end justify-center overflow-hidden shadow-2xs">
              <svg viewBox="0 0 160 180" className="w-full h-full object-cover">
                {/* Background light gradient */}
                <rect width="160" height="180" fill="#F4F8FE" />
                
                {/* Hair - Dark/Black styled hair */}
                <path
                  d="M44 78 C38 45, 62 26, 80 26 C98 26, 122 45, 116 78 C116 78, 114 62, 102 52 C90 42, 70 42, 58 52 C46 62, 44 78, 44 78 Z"
                  fill="#1E293B"
                />
                
                {/* Neck & Ears */}
                <rect x="70" y="80" width="20" height="28" rx="4" fill="#FBCFB0" />
                <circle cx="48" cy="74" r="7" fill="#FBCFB0" />
                <circle cx="112" cy="74" r="7" fill="#FBCFB0" />
                
                {/* Face */}
                <path
                  d="M50 64 C50 48, 110 48, 110 64 C110 88, 98 102, 80 102 C62 102, 50 88, 50 64 Z"
                  fill="#FCD5B5"
                />

                {/* Hair fringe on forehead */}
                <path
                  d="M50 56 C62 44, 76 46, 80 50 C84 46, 98 44, 110 56 C105 48, 92 38, 80 38 C68 38, 55 48, 50 56 Z"
                  fill="#1E293B"
                />
                <path
                  d="M62 48 L72 58 L78 50 L84 60 L92 48"
                  fill="#1E293B"
                />

                {/* Inner Shirt Collar (V-neck white) */}
                <polygon points="66,100 94,100 80,126" fill="#FFFFFF" />

                {/* Brown Suit Jacket Shoulders */}
                <path
                  d="M18 180 C18 124, 52 108, 68 108 L80 134 L92 108 C108 108, 142 124, 142 180 Z"
                  fill="#45271A"
                />

                {/* Lapels */}
                <polygon points="68,108 78,136 60,180 34,180" fill="#381E13" />
                <polygon points="92,108 82,136 100,180 126,180" fill="#381E13" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-[#64748B] mt-2.5 text-center whitespace-nowrap">
              Properties Listed:{" "}
              <span className="text-[#1865F2] font-bold text-[14px]">35</span>
            </p>
          </div>

          {/* Dealer Information Details */}
          <div className="flex-1 min-w-0 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-[20px] sm:text-[22px] font-extrabold text-[#1865F2] uppercase tracking-tight">
                JITENDRA SINGH
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-[#A7F3D0] text-[#059669] font-bold text-[11.5px] flex items-center gap-1 shadow-2xs">
                <Check size={13} className="stroke-[3]" />
                <span>Verified</span>
              </span>
            </div>

            <p className="text-[14px] font-medium text-[#64748B]">
              Director Sales
            </p>

            <div className="pt-1.5 text-[12.5px] text-[#475569] space-y-1.5 leading-snug">
              <div>
                <p className="text-[#0B132B] font-bold text-[13px]">Localities:</p>
                <p className="text-[#64748B] text-[12.5px] mt-0.5">
                  Sector 128 Noida, Sector 120 Noida, Sector 119 Noida
                </p>
              </div>

              <div className="pt-1">
                <p className="text-[#0B132B] font-bold text-[13px]">About Terraces :</p>
                <p className="text-[#64748B] text-[12.5px] mt-0.5">
                  Deals In All Exclusive Properties Across Noida.
                </p>
              </div>

              <div className="pt-1">
                <p className="text-[#0B132B] font-bold text-[13px]">Address :</p>
                <p className="text-[#64748B] text-[12.5px] mt-0.5">
                  401, RG RESIDENCY, NOIDA SEC-120, Greater Noida
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Enquiry to Dealer Box (Span 5) */}
        <div className="lg:col-span-5 rounded-xl border border-[#DCE8FA] bg-[#F4F8FE] p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <h4 className="text-[18px] font-bold text-[#1865F2] tracking-tight">
            Send Enquiry to Dealer
          </h4>

          <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
            {/* Name Input */}
            <input
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-200 text-[12.5px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2]"
            />

            {/* Phone Input with Country Code Dropdown */}
            <div className="flex items-center rounded-md bg-white border border-slate-200 overflow-hidden focus-within:border-[#1865F2]">
              <div className="px-2.5 py-2 bg-white border-r border-slate-200 text-[11.5px] font-medium text-slate-600 flex items-center gap-1 shrink-0">
                <span>IND (+91)</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-[12.5px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Message Textarea */}
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-200 text-[12.5px] text-[#0B132B] focus:outline-none focus:border-[#1865F2]"
            />

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="dealer-terms"
                type="checkbox"
                checked={formData.agreed}
                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                required
                className="h-3.5 w-3.5 rounded cursor-pointer accent-[#1865F2]"
              />
              <label htmlFor="dealer-terms" className="text-[10px] text-slate-500 cursor-pointer select-none">
                I agree to the <span className="text-[#1865F2] hover:underline">Terms &amp; Conditions</span> and{" "}
                <span className="text-[#1865F2] hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-[#1865F2] hover:bg-blue-700 text-white text-[12px] font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
            >
              SEND EMAILS &amp; SMS
            </button>
          </form>
        </div>
      </div>

      {/* ----------------- 3. ACTION BUTTONS (CALL NOW, SCHEDULE VISIT, WHATSAPP) ----------------- */}
      <div className="space-y-3 pt-1">
        {/* Full-Width Gradient Call Now Button Matching Reference Image */}
        <button
          onClick={() => window.open("tel:+919876543210")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1865F2] via-[#0092CC] to-[#00C2FF] hover:opacity-95 text-white text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
        >
          <Phone size={18} className="fill-white" />
          <span>Call Now</span>
        </button>

        {/* 2-Column Secondary Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Schedule Site Visit */}
          <button className="py-2.5 px-4 rounded-xl border border-[#1865F2] text-[#1865F2] bg-white hover:bg-[#E8F1FD]/50 text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer">
            <Calendar size={16} className="text-[#1865F2]" />
            <span>Schedule Site Visit</span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
            className="py-2.5 px-4 rounded-xl border border-[#22C55E] text-[#16A34A] bg-white hover:bg-[#22C55E]/10 text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            <MessageCircle size={17} className="text-[#22C55E]" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

