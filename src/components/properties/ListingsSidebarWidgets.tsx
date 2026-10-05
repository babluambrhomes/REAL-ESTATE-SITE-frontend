"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  X,
  Building2,
  Gift,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Real Price Trends Data matching Figma 1:1
const priceTrendData = [
  { month: "May 23", price: 5400 },
  { month: "Aug 23", price: 6200 },
  { month: "Nov 23", price: 6850 },
  { month: "Feb 23", price: 7600 },
  { month: "Mar 23", price: 8450 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-blue-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-xs">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-[13px] font-bold text-[#1865F2] leading-tight">
          ₹ {payload[0].value.toLocaleString("en-IN")}
          <span className="text-[10px] font-medium text-slate-400 ml-1">/sq.ft.</span>
        </p>
      </div>
    );
  }
  return null;
};

export const ListingsSidebarWidgets = () => {
  const [mounted, setMounted] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Video Tour Widget Matching Figma 1:1 */}
      <div className="rounded-[32px] border border-slate-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h4 className="text-[15px] font-bold text-[#0B132B]">Video Tour</h4>
          {isPlayingVideo && (
            <button
              type="button"
              onClick={() => setIsPlayingVideo(false)}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </button>
          )}
        </div>

        <div className="group relative aspect-[495/430] w-full overflow-hidden rounded-[20px] bg-slate-950 shadow-inner">
          {isPlayingVideo ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/DSQ6j3a8H5Y?autoplay=1&rel=0&modestbranding=1"
              title="Property Video Tour"
              className="h-full w-full object-cover border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="relative h-full w-full cursor-pointer"
            >
              <Image
                src="/video-tour-thumbnail.png"
                alt="Video Tour - Luxury Living Room"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
          )}
        </div>

        {/* Text below image */}
        <p className="mt-3.5 mb-3 text-[11.5px] font-normal text-[#334155] text-left leading-snug">
          Explore The Property With Our Expert Guided Video Tour
        </p>

        {/* Button below */}
        <button
          type="button"
          onClick={() => setIsPlayingVideo((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1865F2] bg-white hover:bg-blue-50/70 py-2.5 text-xs font-semibold text-[#1865F2] transition-colors cursor-pointer"
        >
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1865F2] text-white">
            <Play className="h-2 w-2 fill-white text-white ml-0.5" />
          </div>
          <span>{isPlayingVideo ? "Stop Video Tour" : "Watch Video Tour"}</span>
        </button>
      </div>

      {/* 2. Price Trends Widget with Interactive Recharts Graph */}
      <div className="rounded-[32px] border border-slate-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h4 className="text-[15px] font-bold text-[#0B132B] mb-2.5">Price Trends</h4>

        {/* Top Header Row with Price & Percentage Growth */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[19px] font-black text-[#0B132B]">₹ 8,450</span>
            <span className="text-[11.5px] font-medium text-[#64748B]">/ sq.Ft.</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[12px] font-bold text-[#00BA7A] flex items-center">
              ▲ 9.2%
            </span>
            <span className="text-[9.5px] font-normal text-[#94A3B8]">Last 12 Months</span>
          </div>
        </div>

        {/* Interactive Graph matching Figma */}
        <div className="mt-3 h-36 w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={priceTrendData}
                margin={{ top: 8, right: 10, left: -26, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="priceTrendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1865F2" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#1865F2" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="3 3" />
                <YAxis
                  domain={[5000, 9000]}
                  ticks={[5000, 6000, 7000, 8000, 9000]}
                  tickFormatter={(val) => `${val / 1000}K`}
                  stroke="#94A3B8"
                  tick={{ fontSize: 9.5, fill: "#94A3B8", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tick={{ fontSize: 9.5, fill: "#94A3B8", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#1865F2"
                  strokeWidth={2}
                  fill="url(#priceTrendGradient)"
                  dot={{ r: 3, fill: "#FFFFFF", stroke: "#1865F2", strokeWidth: 1.8 }}
                  activeDot={{ r: 4.5, fill: "#1865F2", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full animate-pulse bg-slate-100 rounded-xl" />
          )}
        </div>

        <button
          type="button"
          className="mt-3.5 w-full rounded-xl border border-[#1865F2] bg-white hover:bg-blue-50/70 py-2.5 text-xs font-semibold text-[#1865F2] transition-colors cursor-pointer text-center"
        >
          View Full Analysis
        </button>
      </div>

      {/* 3. Today's Offers Widget with Header Bar */}
      <div className="rounded-[32px] border border-slate-200/90 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="bg-[#F4F7FB] px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <span className="text-base leading-none">🎁</span>
          <h4 className="text-[14.5px] font-bold text-[#0B132B]">Today&apos;s Offers</h4>
        </div>

        <div className="p-5 pt-4">
          <div className="space-y-2.5">
            {[
              "Free Site Visit",
              "Free Legal Assistance",
              "No Brokerage",
              "Bank Loan Support",
              "Limited Time Builder Offer",
              "Free Vastu Consultation",
              "Free Interior Design Consultation",
            ].map((offer, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00BA7A] text-white">
                  <svg className="h-2.5 w-2.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-[#1E293B]">{offer}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#FF385C] bg-white hover:bg-rose-50/60 py-2.5 text-xs font-semibold text-[#FF385C] transition-colors cursor-pointer"
          >
            <Gift className="h-3.5 w-3.5 text-[#FF385C]" />
            <span>Claim Offer Now</span>
          </button>
        </div>
      </div>

      {/* 4. EMI Calculator Widget */}
      <div className="rounded-[32px] border border-slate-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h4 className="text-[15px] font-bold text-[#0B132B] mb-2.5">EMI Calculator</h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-[#64748B] font-medium">Loan Amount</span>
            <span className="font-bold text-[#0B132B]">₹ 1,00,00,000</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-[#64748B] font-medium">Interest Rate</span>
            <span className="font-bold text-[#0B132B]">8.5 %</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span className="text-[#64748B] font-medium">Tenure</span>
            <span className="font-bold text-[#0B132B]">20 Years</span>
          </div>
        </div>

        <div className="mt-3.5 flex flex-col">
          <span className="text-[11px] text-[#64748B] font-medium">Estimated EMI</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[26px] font-bold text-[#00BA7A] leading-tight">
              ₹86,200
            </span>
            <span className="text-[11px] font-normal text-[#64748B]">/month*</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-3.5 w-full rounded-xl border border-[#1865F2] bg-white hover:bg-blue-50/70 py-2.5 text-xs font-semibold text-[#1865F2] transition-colors cursor-pointer text-center"
        >
          Calculate EMI
        </button>
      </div>

      {/* 5. Book Site Visit Widget Matching Reference */}
      <div className="rounded-[32px] border border-slate-200/90 bg-[#F4F7FB] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h4 className="text-[15px] font-bold text-[#0B132B]">Book Site Visit</h4>
        <p className="text-[11px] text-[#64748B] mt-0.5 mb-3.5 leading-snug">
          Schedule A Visit And Explore Your Future Home.
        </p>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-md border border-slate-200/80 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#1865F2] focus:outline-none shadow-2xs"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full rounded-md border border-slate-200/80 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#1865F2] focus:outline-none shadow-2xs"
          />
        </div>

        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#1865F2] hover:bg-blue-700 py-2.5 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer"
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Book Free Visit</span>
        </button>
      </div>

      {/* 6. Preferred Agent Widget 1 - RADHIKHA SINGH */}
      <div className="relative rounded-[32px] border border-slate-200/90 bg-[#F4F7FB] p-4.5 pt-0 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Top Blue Pill Tab */}
        <div className="flex justify-center">
          <span className="bg-[#1865F2] text-white text-[9.5px] font-bold uppercase tracking-wider px-7 py-1 rounded-b-xl shadow-xs">
            PREFERRED AGENT
          </span>
        </div>

        {/* Photo Container with GNM Group Overlay */}
        <div className="mt-3.5 relative w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-slate-100 shadow-sm">
          <Image
            src="/agents/radhikha-singh.png"
            alt="Radhikha Singh - Preferred Agent"
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            priority
            className="object-cover object-top"
          />
          {/* Blue Gradient Banner at bottom of image matching reference */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1865F2] via-[#1865F2]/85 to-transparent pt-8 pb-2 px-3 text-center">
            <p className="text-[12.5px] font-extrabold text-white tracking-wide leading-tight drop-shadow-xs">
              GNM GROUP
            </p>
            <p className="text-[9.5px] font-medium text-white/95 leading-tight mt-0.5">
              Operating Since 2003
            </p>
          </div>
        </div>

        {/* Agent Name */}
        <div className="mt-3 text-center">
          <p className="text-[13.5px] font-extrabold text-[#1865F2] uppercase tracking-wide">
            RADHIKHA SINGH
          </p>
          <div className="w-[90%] mx-auto h-px bg-slate-200/80 my-2.5" />
        </div>

        {/* About Agent Bullets */}
        <div className="space-y-2 px-1">
          <p className="text-[10px] font-black uppercase text-[#0B132B] tracking-wider mb-2">
            ABOUT AGENT
          </p>
          {[
            "Has Maximum Property Options",
            "Is The Top Agent Of The Locality",
            "Is Trusted By All Users",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#00BA7A] text-white">
                <svg className="h-2 w-2 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11.5px] font-medium text-[#1E293B]">{item}</span>
            </div>
          ))}
        </div>

        {/* View Profile Button */}
        <button
          type="button"
          className="mt-3.5 flex w-full items-center justify-center rounded-xl border border-[#FF385C] bg-white hover:bg-rose-50/60 py-2.5 text-[12px] font-semibold text-[#FF385C] transition-all cursor-pointer shadow-2xs"
        >
          View Profile
        </button>
      </div>

      {/* 7. Preferred Agent Widget 2 - AMAN SINGH */}
      <div className="relative rounded-[32px] border border-slate-200/90 bg-[#F4F7FB] p-4.5 pt-0 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Top Blue Pill Tab */}
        <div className="flex justify-center">
          <span className="bg-[#1865F2] text-white text-[9.5px] font-bold uppercase tracking-wider px-7 py-1 rounded-b-xl shadow-xs">
            PREFERRED AGENT
          </span>
        </div>

        {/* Photo Container with GNM Group Overlay */}
        <div className="mt-3.5 relative w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-slate-100 shadow-sm">
          <Image
            src="/agents/aman-singh.png"
            alt="Aman Singh - Preferred Agent"
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-cover object-top"
          />
          {/* Blue Gradient Banner at bottom of image matching reference */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1865F2] via-[#1865F2]/85 to-transparent pt-8 pb-2 px-3 text-center">
            <p className="text-[12.5px] font-extrabold text-white tracking-wide leading-tight drop-shadow-xs">
              GNM GROUP
            </p>
            <p className="text-[9.5px] font-medium text-white/95 leading-tight mt-0.5">
              Operating Since 2003
            </p>
          </div>
        </div>

        {/* Agent Name */}
        <div className="mt-3 text-center">
          <p className="text-[13.5px] font-extrabold text-[#1865F2] uppercase tracking-wide">
            AMAN SINGH
          </p>
          <div className="w-[90%] mx-auto h-px bg-slate-200/80 my-2.5" />
        </div>

        {/* About Agent Bullets */}
        <div className="space-y-2 px-1">
          <p className="text-[10px] font-black uppercase text-[#0B132B] tracking-wider mb-2">
            ABOUT AGENT
          </p>
          {[
            "Has Maximum Property Options",
            "Is The Top Agent Of The Locality",
            "Is Trusted By All Users",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#00BA7A] text-white">
                <svg className="h-2 w-2 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11.5px] font-medium text-[#1E293B]">{item}</span>
            </div>
          ))}
        </div>

        {/* View Profile Button */}
        <button
          type="button"
          className="mt-3.5 flex w-full items-center justify-center rounded-xl border border-[#FF385C] bg-white hover:bg-rose-50/60 py-2.5 text-[12px] font-semibold text-[#FF385C] transition-all cursor-pointer shadow-2xs"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
