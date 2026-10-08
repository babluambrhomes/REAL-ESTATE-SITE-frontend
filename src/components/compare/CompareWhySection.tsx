"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

export const CompareWhySection = () => {
  const [activeIdx, setActiveIdx] = useState<number>(1); // Default to "Evaluate Location"

  const cards = [
    {
      title: "Compare Across Builders",
      desc: "Compare projects from different builders side by side.",
      type: "image",
      iconSrc: "/compare/icons/why_builder.png",
    },
    {
      title: "Evaluate Location",
      desc: "Compare connectivity, nearby places and neighbourhood advantages.",
      type: "pin",
    },
    {
      title: "Make Better Investments",
      desc: "Compare prices, trends and future growth potential.",
      type: "image",
      iconSrc: "/compare/icons/why_investment.png",
    },
    {
      title: "Find Your Perfect Fit",
      desc: "Find the property that best matches your needs and budget.",
      type: "image",
      iconSrc: "/compare/icons/why_fit.png",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 font-jakarta">
      <div className="space-y-2 mb-8">
        <span className="inline-block px-3.5 py-1 rounded-md bg-[#EFF6FF] text-[#1865F2] font-semibold text-[12px] tracking-wide">
          Why Compare On Roofin
        </span>

        <h2 className="text-[28px] sm:text-[34px] lg:text-[36px] font-bold text-[#0B132B] tracking-tight leading-tight">
          See The Biggest Picture
        </h2>

        <p className="text-[14px] sm:text-[15px] text-slate-500 font-normal">
          More Than Just Listings. A Comparison Experience Designe For Homebuyers
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`rounded-[10px] p-6 sm:p-7 min-h-[175px] cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between ${
                isActive
                  ? "bg-[#1B64F2] text-white shadow-[0_20px_45px_-8px_rgba(27,100,242,0.48)] -translate-y-1 ring-1 ring-blue-400/30"
                  : "bg-white text-slate-800 border border-slate-100 shadow-[0_16px_36px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              }`}
            >
              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0">
                  {card.type === "pin" ? (
                    <div
                      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#1B64F2] shadow-sm"
                          : "bg-[#EFF6FF] text-[#1865F2]"
                      }`}
                    >
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>
                  ) : (
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <Image
                        src={card.iconSrc!}
                        alt={card.title}
                        width={30}
                        height={30}
                        className={`object-contain transition-all duration-300 ${
                          isActive ? "brightness-0 invert" : ""
                        }`}
                      />
                    </div>
                  )}
                </div>

                <h3
                  className={`text-[15.5px] sm:text-[16px] font-bold leading-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#0B132B]"
                  }`}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className={`text-[12.5px] sm:text-[13px] leading-relaxed transition-colors duration-300 ${
                  isActive ? "text-white/95 font-normal" : "text-slate-500 font-normal"
                }`}
              >
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};


