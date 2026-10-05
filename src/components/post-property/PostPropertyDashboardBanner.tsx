"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const PostPropertyDashboardBanner = () => {
  return (
    <section className="py-12 sm:py-16 bg-white font-jakarta select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Background Canvas (#F5F9FE, Radius: 10px, overflow-hidden so elements stay strictly inside border) */}
        <div className="relative rounded-[10px] bg-[#F5F9FE] p-6 sm:p-10 lg:p-14 overflow-hidden">
          
          {/* Top 3D Ice-Blue Spiral Coil (Inside div, shifted right, -19.66deg angle) */}
          <div
            className="absolute top-2 sm:top-3 lg:top-4 left-12 sm:left-20 lg:left-28 w-[95px] h-[95px] sm:w-[115px] sm:h-[115px] lg:w-[130px] lg:h-[130px] select-none pointer-events-none z-0"
            style={{ transform: "rotate(-19.66deg)" }}
          >
            <Image
              src="/post-property/spiral_iceblue_perfect.png"
              alt="3D Ice Blue Spiral Graphic"
              fill
              sizes="(max-width: 768px) 95px, 130px"
              className="object-contain drop-shadow-[0_8px_16px_rgba(37,99,235,0.08)]"
            />
          </div>

          {/* Bottom 3D Ice-Blue Starburst (Inside div, shifted right, behind button) */}
          <div className="absolute bottom-0 left-6 sm:left-10 lg:left-16 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[230px] lg:h-[230px] select-none pointer-events-none z-0">
            <Image
              src="/post-property/starburst_iceblue_perfect.png"
              alt="3D Ice Blue Starburst Graphic"
              fill
              sizes="(max-width: 768px) 160px, 230px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(37,99,235,0.08)]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* ─────────────────────────────────────────────────────────────
                LEFT COLUMN: HEADLINE, DESCRIPTION & CTA BUTTON (ON TOP OF 3D ELEMENTS)
               ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-5 relative flex flex-col justify-center py-6 sm:py-8 lg:py-10 z-10">
              
              {/* Center Content */}
              <div className="relative z-20 space-y-4 max-w-sm">
                <h2 className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold text-[#2563EB] leading-[1.18] tracking-tight">
                  Powerful dashboard <br />
                  for smart seller
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#1E293B] leading-relaxed font-medium">
                  Manage your properties, track leads, analyze performance and grow your business with roofin
                </p>

                <div className="pt-2 relative z-20">
                  <Link
                    href="/login"
                    className="relative z-20 inline-block px-8 py-3 rounded-[10px] border-[1.5px] border-[#2563EB] bg-white text-[#2563EB] font-bold text-[15px] hover:bg-[#2563EB] hover:text-white transition-all duration-200 shadow-2xs active:scale-95"
                  >
                    Explore Dashboard
                  </Link>
                </div>
              </div>

            </div>

            {/* ─────────────────────────────────────────────────────────────
                RIGHT COLUMN: 100% EXACT HIGH-RES SELLER DASHBOARD MOCKUP
               ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7 flex items-center justify-center relative z-10">
              <div className="relative w-full rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.09)] border border-slate-200/80 transform hover:scale-[1.008] transition-transform duration-300">
                <Image
                  src="/post-property/dashboard_mockup_full.png"
                  alt="Roofin Smart Seller Dashboard"
                  width={1400}
                  height={960}
                  priority
                  className="w-full h-auto object-cover select-none"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
