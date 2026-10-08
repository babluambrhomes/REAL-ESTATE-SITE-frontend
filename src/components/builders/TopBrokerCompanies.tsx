"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface BrokerCompany {
  id: string;
  name: string;
  tagline: string;
  location: string;
  bgColor: string;
  accentColor: string;
}

export const TopBrokerCompanies = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const companies: BrokerCompany[] = [
    {
      id: "bc-1",
      name: "ORBIT",
      tagline: "Estates and properties",
      location: "Delhi NCR",
      bgColor: "bg-slate-100 text-slate-900 border border-slate-200",
      accentColor: "#475569",
    },
    {
      id: "bc-2",
      name: "ORBIT",
      tagline: "Estates and properties",
      location: "Delhi NCR",
      bgColor: "bg-[#0B0F19] text-[#F59E0B]",
      accentColor: "#000000",
    },
    {
      id: "bc-3",
      name: "ORBIT",
      tagline: "Estates and properties",
      location: "Delhi NCR",
      bgColor: "bg-[#7F1D1D] text-[#FBBF24]",
      accentColor: "#991B1B",
    },
    {
      id: "bc-4",
      name: "ORBIT",
      tagline: "Estates and properties",
      location: "Delhi NCR",
      bgColor: "bg-[#1E40AF] text-[#93C5FD]",
      accentColor: "#1D4ED8",
    },
    {
      id: "bc-5",
      name: "ORBIT",
      tagline: "Estates and properties",
      location: "Delhi NCR",
      bgColor: "bg-[#B45309] text-[#FEF3C7]",
      accentColor: "#D97706",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-[17px] font-extrabold text-[#0B132B] tracking-tight">
            Top <span className="text-[#1865F2]">Broker Companies</span>
          </h2>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Slider */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {companies.map((comp) => (
          <div
            key={comp.id}
            className="w-[195px] sm:w-[215px] shrink-0 bg-white rounded-[16px] border border-slate-100 p-3.5 flex flex-col justify-between shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Logo Box */}
              <div
                className={`w-11 h-11 rounded-[10px] ${comp.bgColor} flex flex-col items-center justify-center shrink-0 shadow-2xs font-serif`}
              >
                <span className="font-black text-[11px] tracking-widest leading-none">ORBIT</span>
              </div>

              {/* Company Info */}
              <div className="min-w-0 text-left">
                <h3 className="text-xs sm:text-[13px] font-black text-[#0B132B] truncate tracking-tight">
                  {comp.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium truncate">
                  {comp.tagline}
                </p>
                <p className="text-[9.5px] text-slate-400 font-medium truncate">
                  {comp.location}
                </p>
              </div>
            </div>

            {/* View Company Link */}
            <button
              type="button"
              className="mt-3 text-[11px] font-bold text-[#1865F2] hover:text-[#1250C4] flex items-center gap-1 cursor-pointer transition-colors text-left"
            >
              <span>View Company</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
