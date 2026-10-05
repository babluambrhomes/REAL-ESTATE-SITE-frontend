"use client";

import React from "react";

export const PostPropertyWorkFlow = () => {
  return (
    <section className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 bg-white font-jakarta select-none overflow-hidden">
      
      {/* Background Blueprint Grid Lines (Exact Figma Grid) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />

      <div className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-[650px] mx-auto mb-14 sm:mb-18">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#1E293B] tracking-tight flex items-center justify-center gap-2.5">
            <span>How Does</span>
            <span className="text-[#2563EB] font-extrabold text-[36px] sm:text-[46px] lg:text-[52px]">Roofin</span>
            <span>work?</span>
          </h2>
          <p className="text-[15px] sm:text-[16.5px] text-[#475569] mt-1.5 font-medium">
            Fallow the simple <span className="font-bold text-[#2563EB]">5 steps</span> to sell any property
          </p>
        </div>

        {/* 5-Step Interconnected Pathway Visual (Desktop/Tablet Canvas) */}
        <div className="hidden lg:block relative max-w-[1200px] mx-auto h-[1060px]">
          
          {/* Dual Parallel SVG Tubes (Vector 371 Solid 9px & Vector 370 Dashed 3.5px Shadow-offset) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 1060"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. VECTOR 371: Solid Outer Blue Tube (9px Stroke, #2563EB) */}
            <path
              d="M 130 0 
                 V 338 
                 A 42 42 0 0 0 172 380 
                 H 368 
                 A 42 42 0 0 0 410 338 
                 V 142 
                 A 42 42 0 0 1 452 100 
                 H 648 
                 A 42 42 0 0 1 690 142 
                 V 338 
                 A 42 42 0 0 1 648 380 
                 H 452 
                 A 42 42 0 0 0 410 422 
                 V 653 
                 A 42 42 0 0 0 452 695 
                 H 648 
                 A 42 42 0 0 0 690 653 
                 V 457 
                 A 42 42 0 0 1 732 415 
                 H 928 
                 A 42 42 0 0 1 970 457 
                 V 653 
                 A 42 42 0 0 1 928 695 
                 H 732 
                 A 42 42 0 0 0 690 737 
                 V 968 
                 A 42 42 0 0 0 732 1010 
                 H 1180"
              stroke="#2563EB"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. VECTOR 370: Dashed Shadow-Projection Line (3.5px Stroke, #2563EB, Dashes 20 20, Offset dx=+14, dy=+12) */}
            <path
              d="M 130 0 
                 V 338 
                 A 42 42 0 0 0 172 380 
                 H 368 
                 A 42 42 0 0 0 410 338 
                 V 142 
                 A 42 42 0 0 1 452 100 
                 H 648 
                 A 42 42 0 0 1 690 142 
                 V 338 
                 A 42 42 0 0 1 648 380 
                 H 452 
                 A 42 42 0 0 0 410 422 
                 V 653 
                 A 42 42 0 0 0 452 695 
                 H 648 
                 A 42 42 0 0 0 690 653 
                 V 457 
                 A 42 42 0 0 1 732 415 
                 H 928 
                 A 42 42 0 0 1 970 457 
                 V 653 
                 A 42 42 0 0 1 928 695 
                 H 732 
                 A 42 42 0 0 0 690 737 
                 V 968 
                 A 42 42 0 0 0 732 1010 
                 H 1180"
              transform="translate(14, 12)"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeDasharray="20 20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ─────────────────────────────────────────────────────────────
              CARD 01: Verified Account (Top Left - Prominent Square)
             ───────────────────────────────────────────────────────────── */}
          <div 
            className="absolute z-10"
            style={{ left: "165px", top: "135px", width: "210px", height: "210px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[24px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-6 text-center border border-[#93C5FD]/75 shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:-translate-y-1.5 transition-all duration-300">
              <h3 className="text-[19px] font-extrabold text-[#2563EB] leading-tight">
                Verified <br /> Account
              </h3>
              <p className="text-[13px] text-[#1E293B] font-semibold mt-3 leading-[1.4]">
                Quick mobile verification to create your account
              </p>
            </div>
          </div>

          {/* Step 01 Badge Centered on Bottom Path Line (X: 270, Y: 380) */}
          <div 
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: "270px", top: "380px" }}
          >
            <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full border-[1.5px] border-[#10B981] bg-white shadow-sm">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[15.5px]">
                01
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 02: Post Property (Top Right - Prominent Square)
             ───────────────────────────────────────────────────────────── */}
          <div 
            className="absolute z-10"
            style={{ left: "445px", top: "135px", width: "210px", height: "210px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[24px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-6 text-center border border-[#93C5FD]/75 shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:-translate-y-1.5 transition-all duration-300">
              <h3 className="text-[19px] font-extrabold text-[#2563EB] leading-tight">
                Post Property
              </h3>
              <p className="text-[13px] text-[#1E293B] font-semibold mt-3 leading-[1.4]">
                Add property details, photos, videos &amp; price
              </p>
            </div>
          </div>

          {/* Step 02 Badge Centered on Top Path Line (X: 550, Y: 100) */}
          <div 
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: "550px", top: "100px" }}
          >
            <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full border-[1.5px] border-[#10B981] bg-white shadow-sm">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[15.5px]">
                02
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 03: Get Verified Leads (Middle Left - Prominent Square)
             ───────────────────────────────────────────────────────────── */}
          <div 
            className="absolute z-10"
            style={{ left: "445px", top: "450px", width: "210px", height: "210px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[24px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-6 text-center border border-[#93C5FD]/75 shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:-translate-y-1.5 transition-all duration-300">
              <h3 className="text-[19px] font-extrabold text-[#2563EB] leading-tight">
                Get Verified <br /> Leads
              </h3>
              <p className="text-[13px] text-[#1E293B] font-semibold mt-3 leading-[1.4]">
                Receive genuine call &amp; inquiries from buyers
              </p>
            </div>
          </div>

          {/* Step 03 Badge Centered on Left Path Line (X: 410, Y: 555) */}
          <div 
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: "410px", top: "555px" }}
          >
            <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full border-[1.5px] border-[#10B981] bg-white shadow-sm">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[15.5px]">
                03
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 04: Manage Dashboard (Middle Right - Prominent Square)
             ───────────────────────────────────────────────────────────── */}
          <div 
            className="absolute z-10"
            style={{ left: "725px", top: "450px", width: "210px", height: "210px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[24px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-6 text-center border border-[#93C5FD]/75 shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:-translate-y-1.5 transition-all duration-300">
              <h3 className="text-[19px] font-extrabold text-[#2563EB] leading-tight">
                Manage <br /> Dashboard
              </h3>
              <p className="text-[13px] text-[#1E293B] font-semibold mt-3 leading-[1.4]">
                Track own profile, respones &amp; property performance
              </p>
            </div>
          </div>

          {/* Step 04 Badge Centered on Top Path Line (X: 830, Y: 415) */}
          <div 
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: "830px", top: "415px" }}
          >
            <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full border-[1.5px] border-[#10B981] bg-white shadow-sm">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[15.5px]">
                04
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 05: Close Deals (Bottom Right - Prominent Square)
             ───────────────────────────────────────────────────────────── */}
          <div 
            className="absolute z-10"
            style={{ left: "725px", top: "765px", width: "210px", height: "210px" }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[24px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-6 text-center border border-[#93C5FD]/75 shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:-translate-y-1.5 transition-all duration-300">
              <h3 className="text-[19px] font-extrabold text-[#2563EB] leading-tight">
                Close Deals
              </h3>
              <p className="text-[13px] text-[#1E293B] font-semibold mt-3 leading-[1.4]">
                Receive genuine call &amp; inquiries from buyers
              </p>
            </div>
          </div>

          {/* Step 05 Badge Centered on Left Path Line (X: 690, Y: 870) */}
          <div 
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: "690px", top: "870px" }}
          >
            <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full border-[1.5px] border-[#10B981] bg-white shadow-sm">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[15.5px]">
                05
              </div>
            </div>
          </div>

        </div>

        {/* Responsive Mobile / Tablet Layout */}
        <div className="lg:hidden space-y-8 max-w-sm mx-auto">
          {[
            { step: "01", title: "Verified Account", desc: "Quick mobile verification to create your account" },
            { step: "02", title: "Post Property", desc: "Add property details, photos, videos & price" },
            { step: "03", title: "Get Verified Leads", desc: "Receive genuine call & inquiries from buyers" },
            { step: "04", title: "Manage Dashboard", desc: "Track own profile, respones & property performance" },
            { step: "05", title: "Close Deals", desc: "Receive genuine call & inquiries from buyers" },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="relative rounded-[20px] bg-gradient-to-b from-[#F5F9FF] via-[#EBF3FE] to-[#DFEDFE] p-5 text-center border border-[#93C5FD]/60 shadow-[0_6px_20px_rgba(37,99,235,0.08)]"
            >
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981] text-white font-extrabold text-[13px] border-2 border-white shadow-sm">
                {item.step}
              </div>
              <h3 className="text-[16px] font-extrabold text-[#2563EB] pt-1">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#1E293B] font-semibold mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
