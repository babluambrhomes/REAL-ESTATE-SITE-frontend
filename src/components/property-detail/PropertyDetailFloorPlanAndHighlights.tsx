"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const FLOOR_PLAN_BULLETS = [
  "1 Living & Dining",
  "1 Modular Kitchen",
  "3 Bedrooms",
  "3 Bathrooms",
  "2 Balconies",
];

const KEY_HIGHLIGHTS = [
  "Prime Location With Excellent Connectivity",
  "Well- Ventilated Home With Ample Natural Light",
  "Modern Design With Premium Fittings",
  "Vastu Compliant Home",
  "Vastu Compliant Home",
  "Gated Community With 24*7 Security",
  "Close To Schools, Hospitals &Shopping Hubs",
];

const LOCATION_ADVANTAGES = [
  { label: "Metro Station", time: "10 Min", icon: "/location_advantage/metro_station.png" },
  { label: "Mall", time: "25 Min", icon: "/location_advantage/mall.png" },
  { label: "School", time: "8 Min", icon: "/location_advantage/school.png" },
  { label: "Airport", time: "35 Min", icon: "/location_advantage/airport.png" },
  { label: "Hospital", time: "6 Min", icon: "/location_advantage/hospital.png" },
  { label: "Bank", time: "4 Min", icon: "/location_advantage/bank.png" },
];

export const PropertyDetailFloorPlanAndHighlights = () => {
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);

  return (
    <div className="w-full my-6 flex flex-col gap-8">
      {/* ----------------- 1. FLOOR PLAN SECTION ----------------- */}
      <div id="floor-plan" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h3 className="text-[16px] font-extrabold text-[#1865F2] tracking-tight uppercase">
            FLOOR PLAN
          </h3>
        </div>

        {/* Floor Plan Container Cards matching Figma 1:1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Floor Plan Card (Span 7) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Isometric 3D Floor Plan Image (Span 6) */}
            <div className="sm:col-span-6 relative h-52 sm:h-64 w-full flex items-center justify-center p-1">
              <Image
                src="/3d_floor_plan.png"
                alt="3D Floor Plan Sample"
                fill
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Specs Column (Span 6) */}
            <div className="sm:col-span-6 space-y-3 pl-0 sm:pl-2">
              <div>
                <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0B132B] uppercase tracking-tight">
                  3 BHK – 1350 SQ.FT.
                </h4>
                <p className="text-[12.5px] text-[#64748B] mt-1.5 leading-relaxed font-normal">
                  Smartly designed layout with spacious rooms and efficient space utilization.
                </p>
              </div>

              <ul className="space-y-2.5 text-[13px] text-[#334155] font-normal pt-1">
                {FLOOR_PLAN_BULLETS.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00A896] ring-2 ring-[#00A896]/20 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 3D Walkthrough Card (Span 5) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#D5E5FD] bg-[#F4F8FE] p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
            <div className="relative h-40 sm:h-48 w-full rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/3d_floor_plan_small.png"
                alt="3D Walkthrough Preview"
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-3 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200/50 sm:border-t-0">
              <div className="flex-1">
                <h5 className="text-[14px] font-bold text-[#0B132B]">3D Walkthrough</h5>
                <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-snug font-normal">
                  Experience The Property Virtually Before You Visit.
                </p>
              </div>

              <div className="h-8 w-px bg-slate-300/60 mx-1 hidden sm:block shrink-0" />

              <button className="px-3.5 py-1.5 rounded-lg border border-[#1865F2] text-[#1865F2] bg-white hover:bg-[#1865F2] hover:text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>View 3D Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line below Floor Plan */}
      <div className="w-full border-t border-slate-200/80 my-1" />

      {/* ----------------- 2. KEY HIGHLIGHTS & LOCATION ADVANTAGE ----------------- */}
      <div id="key-highlights" className="space-y-4 scroll-mt-28">
        {/* Row Title */}
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h4 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
            KEY HIGHLIGHTS
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Box: KEY HIGHLIGHTS (Span 6) */}
          <div className="lg:col-span-6 rounded-2xl border border-[#D5E5FD] bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
            <ul className="space-y-3.5">
              {KEY_HIGHLIGHTS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[13.5px] text-[#475569] font-normal leading-snug">
                  <Check size={17} className="text-[#1865F2] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-2">
              <button
                onClick={() => setShowMoreHighlights(!showMoreHighlights)}
                className="w-full py-2.5 rounded-xl bg-[#F0F6FE] hover:bg-[#E2EFFF] text-[13px] font-semibold text-[#1865F2] transition-colors text-center cursor-pointer"
              >
                View More &gt;&gt;
              </button>
            </div>
          </div>

          {/* Right Box: LOCATION ADVANTAGE (Span 6) */}
          <div className="lg:col-span-6 rounded-2xl border border-[#D5E5FD] bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="pl-2.5 border-l-4 border-[#1865F2] mb-6">
                <h4 className="text-[20px] sm:text-[22px] font-bold text-[#00C49F] tracking-tight">
                  Location Advantage
                </h4>
              </div>

              {/* 6 Circular Icons Grid matching Figma 1:1 */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-6">
                {LOCATION_ADVANTAGES.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
                    {/* Direct Icon without extra background circle */}
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 flex items-center justify-center">
                      <Image
                        src={loc.icon}
                        alt={loc.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[14px] sm:text-[15px] font-medium text-[#0B132B] leading-tight">
                        {loc.label}
                      </p>
                      <p className="text-[16px] sm:text-[17px] font-bold text-[#0B132B] mt-0.5 leading-tight">
                        {loc.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-2">
              <button className="w-full py-2.5 rounded-xl bg-[#F0F6FE] hover:bg-[#E2EFFF] text-[#1865F2] text-[13px] font-semibold transition-all cursor-pointer text-center">
                View On Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



