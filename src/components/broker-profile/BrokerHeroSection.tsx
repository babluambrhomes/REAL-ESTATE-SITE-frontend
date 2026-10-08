"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Star,
  MapPin,
  PhoneCall,
  Phone,
  Users,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const BrokerHeroSection = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const highlights = [
    {
      id: "hl-1",
      iconSrc: "/broker/Frame (12).png",
      value: "12 Min",
      label: "Response Time",
    },
    {
      id: "hl-2",
      iconSrc: "/broker/Frame (13).png",
      value: "10K+",
      label: "Happy Clients",
    },
    {
      id: "hl-3",
      iconSrc: "/broker/Frame (14).png",
      value: "10+",
      label: "Property sold",
    },
    {
      id: "hl-4",
      iconSrc: "/broker/Frame (15).png",
      value: "Free",
      label: "Site visit",
    },
    {
      id: "hl-5",
      iconSrc: "/broker/Frame (16).png",
      value: "Availability",
      label: "Mon -Sun ( 10am Pm)",
    },
    {
      id: "hl-6",
      iconSrc: "/broker/Frame (17).png",
      value: "Office Address",
      label: "A-56, SECTOR 63, NOIDA-201301",
    },
    {
      id: "hl-7",
      iconSrc: "/broker/Frame (18).png",
      value: "Listing",
      label: "700+",
    },
    {
      id: "hl-8",
      iconSrc: "/broker/Frame (19).png",
      value: "Market Knowladge",
      label: "700+",
    },
  ];

  return (
    <div className="w-full font-jakarta">
      {/* Pure White Profile Card Main Container with Rounded 28px Corners */}
      <div className="relative bg-white rounded-[28px] border border-[#D8E6FC] shadow-[0_12px_40px_rgba(24,101,242,0.06)] p-6 sm:p-8 pt-8">
        
        {/* Top Half: 2-Column Split (Profile Details on Left | Stats & Trust Score on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (7 of 12 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7">
            
            {/* Broker Avatar (Half in Full-Bleed Top Gradient Background, Half in this White Card) */}
            <div className="relative -mt-24 sm:-mt-32 shrink-0 z-20">
              <div className="relative w-[155px] h-[155px] sm:w-[185px] sm:h-[185px] rounded-[28px] overflow-hidden p-1 bg-white shadow-[0_8px_30px_rgba(0,209,255,0.28)] border-[3.5px] border-[#00D1FF]">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-100">
                  <Image
                    src="/broker/broker.png"
                    alt="Jitender Singh"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="185px"
                  />
                </div>
              </div>

              {/* Sparkle Star Badge at Bottom Right */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,209,255,0.4)] border-2 border-[#00D1FF] flex items-center justify-center text-[#00D1FF] z-20">
                <Sparkles className="w-5 h-5 fill-[#00D1FF] text-[#00D1FF]" />
              </div>
            </div>

            {/* Middle Info & Details */}
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-[28px] font-black text-[#0B132B] tracking-tight">
                  Jitender singh
                </h1>
                {/* Verified Blue Badge */}
                <div className="w-5 h-5 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-500">
                Senior Property Consultant
              </p>

              {/* Action Buttons: Fallow, Share, More */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 pb-2">
                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(24,101,242,0.3)] ${
                    isFollowing
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "bg-[#1865F2] hover:bg-[#1250C4] text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{isFollowing ? "Fallowing" : "Fallow"}</span>
                </button>

                <button
                  type="button"
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span>Share</span>
                </button>

                <button
                  type="button"
                  aria-label="More Options"
                  className="w-10 h-9 bg-white hover:bg-slate-50 text-slate-600 border border-slate-300/80 rounded-xl flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* 12+ Years Experience & Reviews */}
              <div className="pt-2 space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>12+ Years of Experience</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="font-extrabold text-[#1865F2] text-xs">4.5/5</span>
                  <span className="text-slate-400 text-[11px] font-medium">(320 Verified Reviews)</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-700 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#1865F2]" />
                  <span>Operating in: <span className="font-semibold text-slate-600">Noida, Greater Noida, Ghaziabad</span></span>
                </div>

                {/* Primary CTA Buttons: Contact Broker & Request Callback */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#00C49F] via-[#00B4D8] to-[#0284C7] hover:from-[#00B4D8] hover:to-[#0284C7] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-[0_4px_14px_rgba(0,196,159,0.35)] transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Broker</span>
                  </button>

                  <button
                    type="button"
                    className="px-6 py-2.5 bg-white hover:bg-blue-50/60 text-[#1865F2] border border-[#1865F2] text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Request Callback</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column (5 of 12 cols on desktop) with Vertical Divider on Left */}
          <div className="lg:col-span-5 lg:border-l lg:border-slate-200/90 lg:pl-8 flex flex-col gap-4 w-full">
            
            {/* Top Bar: ROOFIN VERIFIED BROCKER badge + 4 Stats Columns */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="px-3.5 py-1.5 rounded-lg bg-[#EAF2FF] border border-[#C6DCFD] text-[#1865F2] text-[10.5px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1865F2]" />
                  <span>ROOFIN VERIFIED BROCKER</span>
                </div>
              </div>

              {/* 4 Stats Columns */}
              <div className="grid grid-cols-4 gap-2 text-center pt-1">
                <div>
                  <p className="text-xs font-bold text-slate-700">Fallowers</p>
                  <p className="text-lg sm:text-xl font-black text-[#1865F2] mt-0.5">2,985</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Views</p>
                  <p className="text-lg sm:text-xl font-black text-[#1865F2] mt-0.5">132</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Listing</p>
                  <p className="text-lg sm:text-xl font-black text-[#1865F2] mt-0.5">500</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Videos</p>
                  <p className="text-lg sm:text-xl font-black text-[#1865F2] mt-0.5">20</p>
                </div>
              </div>
            </div>

            {/* ROOFIN DEALER TRUST SCORE Card Box */}
            <div className="bg-white rounded-[18px] border border-slate-200/90 p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              {/* Header Title */}
              <h3 className="text-[12px] sm:text-[12.5px] font-black text-[#1865F2] tracking-wide uppercase">
                ROOFIN DEALER TRUST SCORE
              </h3>

              {/* Score Number + EXCELLENT Status */}
              <div className="flex items-baseline justify-between mt-1 mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-[34px] font-black text-[#1865F2] tracking-tight leading-none">
                    9.4
                  </span>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-400">
                    /10
                  </span>
                </div>
                <span className="text-[10.5px] font-black text-[#10B981] tracking-widest uppercase">
                  EXCELLENT
                </span>
              </div>

              {/* Solid Green Progress Line */}
              <div className="w-full h-1 bg-[#10B981] rounded-full my-3.5" />

              {/* 6 Verification Points (3 columns x 2 rows) */}
              <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-2.5 text-[11px] font-extrabold text-[#0B132B]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">RERA Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Photo Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Address Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">KYC Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Email Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Top Performer 2026</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};


