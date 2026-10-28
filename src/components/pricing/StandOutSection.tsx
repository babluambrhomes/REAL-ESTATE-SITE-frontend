"use client";

import Image from "next/image";
import { Sparkles, ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react";

export const StandOutSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24 font-poppins">
      {/* Exact Fine Contour Mesh Vector Lines (Figma Background Asset) */}
      <div className="absolute -bottom-10 left-0 w-[480px] h-[480px] pointer-events-none opacity-20 mix-blend-multiply z-0">
        <Image
          src="/images/premium/contour_mesh.png"
          alt="Contour mesh background lines"
          fill
          className="object-contain object-left-bottom invert"
          sizes="480px"
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Diagonal Accent Bars */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-[#0B132B] tracking-tight leading-tight">
                Don&apos;t Just List. <br />
                <span className="bg-gradient-to-r from-[#1865F2] to-[#06B6D4] bg-clip-text text-transparent">
                  Stand Out.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-[17px] font-medium text-slate-600 max-w-md leading-relaxed">
                Thousands may list. Premium businesses get noticed.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-lg">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100/80 space-y-1.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#1865F2] text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-[#0B132B]">Priority Algorithmic Boost</h4>
                <p className="text-xs text-slate-500 font-medium">Your listings rank at the very top of search feeds & map views.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 space-y-1.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-[#0B132B]">Verified Seller Badge</h4>
                <p className="text-xs text-slate-500 font-medium">Instant credibility and genuine high-intent homebuyer inquiries.</p>
              </div>
            </div>

            {/* Figma Exact Diagonal Accent Strokes (Rectangle 8184 & 8185 group) */}
            <div className="pt-6 flex items-center gap-3">
              <div className="w-12 h-2 bg-[#06B6D4] rounded-full transform -rotate-45 shadow-2xs" />
              <div className="w-16 h-2 bg-[#1865F2] rounded-full transform -rotate-45 shadow-2xs" />
              <div className="w-10 h-2 bg-[#3B82F6] rounded-full transform -rotate-45 shadow-2xs" />
            </div>
          </div>

          {/* Right Column: Overlapping Stepped Geometry Cards (Figma Rectangles 8181, 8182, 8183) */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[400px] sm:min-h-[480px]">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-blue-400/20 via-cyan-300/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Stepped Frame 1 (Top Right - Figma Rectangle 8183) */}
            <div className="absolute top-2 right-4 sm:right-8 w-60 sm:w-72 h-52 sm:h-64 rounded-[32px] border-4 border-[#34D399] bg-white/90 backdrop-blur-md shadow-2xl p-6 flex flex-col justify-between transform hover:translate-y-[-4px] transition-transform duration-300 z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Spotlight</span>
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-[#0B132B]">10x Leads</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Faster conversions for builders & top verified agents.</p>
              </div>
            </div>

            {/* Stepped Frame 2 (Bottom Left Overlapping - Primary Featured Card - Figma Rectangle 8181) */}
            <div className="relative w-68 sm:w-80 h-60 sm:h-72 rounded-[36px] border-4 border-[#1865F2] bg-white shadow-[0_24px_60px_rgba(24,101,242,0.22)] p-7 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 z-20">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1865F2] text-xs font-black uppercase tracking-wider">
                  Exclusive
                </span>
                <ArrowUpRight className="w-6 h-6 text-[#1865F2]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B132B]">
                  Roofin Prime
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Showcase projects with 3D tours, featured banners & verified broker leads.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#1865F2]">
                <span>Get Started Now</span>
                <span className="text-base">→</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
