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
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden bg-white font-jakarta">
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

            {/* ADD PROPERTY Blue Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onAddProperty}
                className="inline-flex items-center justify-center px-9 py-3.5 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#1462E0] text-white font-bold text-[14.5px] sm:text-[15px] shadow-[0_8px_22px_rgba(24,119,242,0.35)] hover:shadow-[0_10px_28px_rgba(24,119,242,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer tracking-wider uppercase"
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
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white">
                      <Image
                        src={exp.img}
                        alt={exp.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00D084] rounded-full border border-white flex items-center justify-center">
                        <Check className="w-2 h-2 text-white stroke-[3.5]" />
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

          {/* Right Column: 2 Overlapping Property Cards + Glowing Spheres & Orbital Arcs */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[480px] h-[340px] sm:h-[390px] flex items-center justify-center">
              
              {/* Background Circular Orbit Arcs */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none -z-5 -right-4"
                viewBox="0 0 420 360"
                fill="none"
              >
                <path
                  d="M 140 40 C 290 10, 410 110, 390 290"
                  stroke="#1877F2"
                  strokeWidth="2"
                  opacity="0.85"
                />
                <path
                  d="M 90 90 C 240 60, 370 160, 350 340"
                  stroke="#60A5FA"
                  strokeWidth="1.6"
                  opacity="0.65"
                />
              </svg>

              {/* Glowing Cyan/Blue 3D Spheres */}
              <div className="absolute top-4 right-6 w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D084] via-[#00E5FF] to-[#1877F2] shadow-[0_0_18px_rgba(0,229,255,0.7)]" />
              <div className="absolute bottom-6 left-10 w-6 h-6 rounded-full bg-gradient-to-tr from-[#1877F2] via-[#60A5FA] to-[#00E5FF] shadow-[0_0_16px_rgba(24,119,242,0.6)]" />

              {/* Card 1 (Back Left: Ambe Aspire Facade) */}
              <div className="absolute left-3 sm:left-6 top-3 sm:top-5 w-[185px] sm:w-[215px] h-[255px] sm:h-[285px] rounded-[22px] overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.16)] border-2 border-white bg-slate-900 z-10">
                <Image
                  src="/images/properties/villa-popular-figma.jpg"
                  alt="Ambe Aspire"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 2 (Front Right: High-Rise City Tower Night View with highway) */}
              <div className="absolute right-3 sm:right-6 bottom-3 sm:bottom-5 w-[185px] sm:w-[215px] h-[255px] sm:h-[285px] rounded-[22px] overflow-hidden shadow-[0_22px_45px_rgba(0,0,0,0.24)] border-2 border-white bg-slate-900 z-20">
                <Image
                  src="/images/properties/tower-popular-figma.jpg"
                  alt="Luxury Night Tower"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
