"use client";

import { HardHat, MapPin, TrendingUp, Target } from "lucide-react";

export const CompareWhySection = () => {
  const cards = [
    {
      title: "Compare Across Builders",
      desc: "Compare projects from different builders side by side.",
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1865F2] flex items-center justify-center">
          <HardHat className="w-5 h-5" />
        </div>
      ),
      isActive: false,
    },
    {
      title: "Evaluate Location",
      desc: "Compare connectivity, nearby places and neighbourhood advantages.",
      icon: (
        <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
      ),
      isActive: true, // In Figma screenshot, this card has solid blue #1865F2 background
    },
    {
      title: "Make Better Investments",
      desc: "Compare prices, trends and future growth potential.",
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1865F2] flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
      ),
      isActive: false,
    },
    {
      title: "Find Your Perfect Fit",
      desc: "Find the property that best matches your needs and budget.",
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1865F2] flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
      ),
      isActive: false,
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 font-jakarta">
      <div className="space-y-3 mb-8">
        <span className="inline-block px-3 py-1 rounded-md bg-[#EFF6FF] text-[#1865F2] font-semibold text-[12px] tracking-wide">
          Why Compare On Roofin
        </span>

        <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#0B132B] tracking-tight leading-tight">
          See The Biggest Picture
        </h2>

        <p className="text-[14px] sm:text-[15.5px] text-slate-500 font-normal">
          More Than Just Listings. A Comparison Experience Designe For Homebuyers
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-[20px] p-6 transition-all duration-300 transform hover:-translate-y-1 ${
              card.isActive
                ? "bg-[#1865F2] text-white shadow-[0_12px_30px_rgba(24,101,242,0.35)]"
                : "bg-white text-slate-800 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            <div className="mb-4">{card.icon}</div>
            <h3
              className={`text-[17px] font-bold mb-2 leading-tight ${
                card.isActive ? "text-white" : "text-[#0B132B]"
              }`}
            >
              {card.title}
            </h3>
            <p
              className={`text-[13px] leading-relaxed ${
                card.isActive ? "text-blue-100" : "text-slate-500"
              }`}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
