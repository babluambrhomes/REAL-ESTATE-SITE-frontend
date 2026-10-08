"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface CompareHeroProps {
  onAddProperty: () => void;
}

export const CompareHero = ({ onAddProperty }: CompareHeroProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const experts = [
    { name: "Rohan", img: "/customers/customer_man_phone.jpg" },
    { name: "Mohit", img: "/customers/customer_man_laptop.jpg" },
    { name: "Tarun", img: "/customers/customer_handshake.jpg" },
  ];

  return (
    <section 
      className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 overflow-hidden font-jakarta"
      style={{
        background: "linear-gradient(180deg, #F1F7FF 0%, #FFFFFF 100%)",
      }}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Description, ADD PROPERTY & Experts */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4">
              <h1 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#0B132B] tracking-tight leading-[1.2]">
                Compare Home In India :  At Roofin
              </h1>

              <p className="text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed max-w-[620px]">
                Buying A Home Is One Of The Biggest Decisions You&apos;ll Ever Make. With Roofin,
                Comparing Properties Becomes Simpler, Smarter, And More Transparent. Explore
                Homes Side By Side,  Compare Prices, Carpet Areas, Amenities, Locations, And
                Project Details—All In One Place.{" "}
                {!showFullText ? (
                  <button
                    type="button"
                    onClick={() => setShowFullText(true)}
                    className="text-[#1877F2] font-semibold hover:underline cursor-pointer inline-block"
                  >
                    ... See All
                  </button>
                ) : (
                  <span className="text-slate-600">
                    {" "}Evaluate potential ROI, check builder reputation, and find the perfect match tailored precisely to your family&apos;s lifestyle and budget.
                  </span>
                )}
              </p>
            </div>

            {/* ADD PROPERTY Blue Button matching Figma */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onAddProperty}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#1865F2] hover:bg-[#1254D0] text-white font-bold text-[14.5px] shadow-[0_8px_20px_rgba(24,101,242,0.3)] active:scale-[0.98] transition-all cursor-pointer tracking-wider uppercase"
              >
                ADD PROPERTY
              </button>
            </div>

            {/* Still Confuse Talk To Our Expert */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-2.5">
                {experts.map((exp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-[#EBF3FE] border border-[#BFDBFE]/60 rounded-xl px-3 py-1.5 shadow-2xs hover:bg-[#DCEBFE] transition-colors cursor-pointer"
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white">
                      <Image
                        src={exp.img}
                        alt={exp.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00D084] rounded-full border border-white flex items-center justify-center">
                        <Check className="w-1.5 h-1.5 text-white stroke-[3.5]" />
                      </span>
                    </div>
                    <span className="text-[13.5px] font-semibold text-slate-800">
                      {exp.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-[13.5px] font-semibold text-slate-800 tracking-tight">
                <span>Still Confuse Talk To Our Expert</span>
              </div>
            </div>

          </div>

          {/* Right Column: Built purely in code with individual cards, SVG rings, and 3D spheres */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[460px] h-[340px] sm:h-[380px] flex items-center justify-center">
              
              {/* Background 100% Proper Concentric Circular Rings in SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 460 380"
                fill="none"
              >
                {/* 100% Perfect Outer Circle */}
                <circle
                  cx="230"
                  cy="180"
                  r="160"
                  stroke="#1D68F2"
                  strokeWidth="1.8"
                  opacity="0.9"
                />
                {/* 100% Perfect Inner Circle (Parallel Close Spacing) */}
                <circle
                  cx="230"
                  cy="180"
                  r="148"
                  stroke="#3B82F6"
                  strokeWidth="1.4"
                  opacity="0.65"
                />
              </svg>

              {/* 3D Glossy Sky-Blue Sphere 1 (Top Right on Circle Perimeter) */}
              <div 
                className="absolute top-4 right-10 sm:right-14 w-7 h-7 rounded-full shadow-[0_6px_16px_rgba(24,101,242,0.45)] z-0"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #E0F2FE 0%, #38BDF8 35%, #0284C7 70%, #0369A1 100%)",
                }}
              />

              {/* 3D Glossy Sky-Blue Sphere 2 (Bottom Left on Circle Perimeter) */}
              <div 
                className="absolute bottom-6 left-10 sm:left-14 w-6 h-6 rounded-full shadow-[0_5px_14px_rgba(24,101,242,0.4)] z-30"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #E0F2FE 0%, #38BDF8 35%, #0284C7 70%, #0369A1 100%)",
                }}
              />

              {/* Card 1 (Back Left: AMBR ASPIRE Clean Pure Photo) */}
              <div className="absolute left-2 sm:left-4 top-2 sm:top-3 w-[190px] sm:w-[220px] h-[255px] sm:h-[285px] rounded-[22px] overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.16)] border-2 border-white bg-slate-900 z-10">
                <Image
                  src="/compare/card1_ambr_aspire_pure.png"
                  alt="AMBR ASPIRE"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Card 2 (Front Right: Night High-Rise Tower Clean Pure Photo) */}
              <div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-3 w-[190px] sm:w-[220px] h-[255px] sm:h-[285px] rounded-[22px] overflow-hidden shadow-[0_22px_45px_rgba(0,0,0,0.24)] border-2 border-white bg-slate-900 z-20">
                <Image
                  src="/compare/card2_night_tower_pure.png"
                  alt="Luxury Night Tower"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
