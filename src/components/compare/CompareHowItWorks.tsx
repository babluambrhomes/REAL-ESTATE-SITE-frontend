"use client";

import Image from "next/image";
import { Phone, Check, ArrowRight, ShieldCheck, Heart, Share2, Image as ImageIcon } from "lucide-react";

interface CompareHowItWorksProps {
  onStartComparing: () => void;
}

export const CompareHowItWorks = ({ onStartComparing }: CompareHowItWorksProps) => {
  const steps = [
    {
      num: 1,
      title: "Add Properties",
      desc: "Click To Add Property Which You Like",
    },
    {
      num: 2,
      title: "Select Properties",
      desc: "Click On Compare From My Any Property Card.",
    },
    {
      num: 3,
      title: "View Side By Side",
      desc: "See Key Differences Across Important Factors",
    },
    {
      num: 4,
      title: "Make Your Decision",
      desc: "Save, Share Or Contact The Builder/ Agent Directly",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 font-jakarta">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left: Heading, 4 Steps, Button */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-md bg-[#EFF6FF] text-[#1865F2] font-semibold text-[12px] tracking-wide">
              How It Work
            </span>

            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#0B132B] tracking-tight leading-tight">
              From Shortlisted To The Right Choice.
            </h2>

            <p className="text-[14px] sm:text-[15.5px] text-slate-500 font-normal">
              Compare Properties In Just A Few Simple Steps.
            </p>
          </div>

          {/* 4 Steps Grid (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  {step.num}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[15px] font-bold text-[#0B132B]">
                    {step.title}
                  </h4>
                  <p className="text-[12.5px] text-slate-500 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Start Comparing Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={onStartComparing}
              className="px-7 py-3 rounded-xl bg-[#1865F2] hover:bg-blue-600 active:scale-95 text-white font-bold text-[14px] shadow-[0_6px_20px_rgba(24,101,242,0.35)] transition-all cursor-pointer"
            >
              Start Comparing
            </button>
          </div>

        </div>

        {/* Right: Layered UI Card Visuals with glowing cyan border */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[480px] h-[360px] sm:h-[400px] flex items-center justify-center">
            
            {/* Background Faded Tilted Mobile Card (Left) */}
            <div className="absolute left-2 sm:left-6 top-8 w-[240px] sm:w-[260px] rounded-[24px] bg-white border border-slate-200 shadow-lg p-3 transform -rotate-12 opacity-40 blur-[1px] pointer-events-none">
              <div className="w-full h-24 rounded-xl bg-slate-200 mb-2" />
              <div className="h-3 w-2/3 bg-slate-200 rounded mb-1" />
              <div className="h-2.5 w-1/2 bg-slate-100 rounded" />
            </div>

            {/* Background Faded Tilted Mobile Card (Right) */}
            <div className="absolute right-0 sm:right-4 top-10 w-[240px] sm:w-[260px] rounded-[24px] bg-white border border-slate-200 shadow-lg p-3 transform rotate-12 opacity-40 blur-[1px] pointer-events-none">
              <div className="w-full h-24 rounded-xl bg-slate-200 mb-2" />
              <div className="h-3 w-2/3 bg-slate-200 rounded mb-1" />
              <div className="h-2.5 w-1/2 bg-slate-100 rounded" />
            </div>

            {/* Main Featured Highlighted Card (Center) with Cyan/Blue Neon Glowing Border */}
            <div className="relative z-20 w-[280px] sm:w-[310px] bg-white rounded-[22px] p-3 shadow-[0_20px_50px_rgba(24,101,242,0.22)] border-[2.5px] border-[#00E5FF] ring-4 ring-[#1865F2]/20 transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Image Preview with Verified Deal Badge & Actions */}
              <div className="relative w-full h-[135px] rounded-[16px] overflow-hidden mb-2.5">
                <Image
                  src="/images/properties/villa-popular-figma.jpg"
                  alt="NBCC Aspire Silicon City"
                  fill
                  className="object-cover"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#00D084] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFIED DEAL</span>
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-2xs">
                    <Heart className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-2xs">
                    <Share2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-[#1865F2] font-semibold bg-[#EFF6FF] px-2 py-0.5 rounded">
                    2, 3 &amp; 4 BHK Apartments
                  </span>
                  <h4 className="text-[14px] font-bold text-[#0B132B] mt-1 leading-tight flex items-center justify-between">
                    <span>NBCC Aspire Silicon City</span>
                    <span className="w-6 h-6 rounded-full bg-[#1865F2] text-white flex items-center justify-center">
                      <Phone className="w-3 h-3" />
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>📍</span> Sector 76, Noida
                  </p>
                </div>

                {/* Info Chips */}
                <div className="grid grid-cols-3 gap-1 pt-0.5 text-center">
                  <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1">
                    <div className="text-[9.5px] font-bold text-slate-800">3,200-4,500</div>
                    <div className="text-[8px] text-slate-400">Sq. Ft</div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1">
                    <div className="text-[9.5px] font-bold text-slate-800">60%</div>
                    <div className="text-[8px] text-slate-400">Amenities</div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-1">
                    <div className="text-[9.5px] font-bold text-emerald-600">Ready</div>
                    <div className="text-[8px] text-slate-400">To Move</div>
                  </div>
                </div>

                {/* Price & CTA Button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[14.5px] font-extrabold text-[#0B132B]">₹1.25* Cr</span>
                      <span className="text-[9.5px] text-slate-400 line-through">₹1.58 Cr</span>
                    </div>
                    <span className="text-[9px] text-[#00D084] font-semibold">
                      🏷️ Up to 33L off
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onStartComparing}
                    className="px-3 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-600 text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
