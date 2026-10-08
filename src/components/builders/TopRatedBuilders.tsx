"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface BuilderItem {
  id: string;
  name: string;
  listings: string;
  experience: string;
  logoSrc: string;
}

export const TopRatedBuilders = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const builders: BuilderItem[] = [
    {
      id: "b-1",
      name: "DLF BUILDER",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "b-2",
      name: "ACE GROUP",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_ace_clean.png",
    },
    {
      id: "b-3",
      name: "PURI CONST...",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_puri_clean.png",
    },
    {
      id: "b-4",
      name: "GAURSONS INDIA",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_gaurs_clean.png",
    },
    {
      id: "b-5",
      name: "OMAXE GROUP",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_omaxe_clean.png",
    },
    {
      id: "b-6",
      name: "AVEROXCONS...",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_averox_clean.png",
    },
    {
      id: "b-7",
      name: "URBAN CONST...",
      listings: "120 Listing",
      experience: "8 Years",
      logoSrc: "/builders/logo_urban_clean.png",
    },
  ];


  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 font-jakarta">
      
      {/* Header with Title & Arrow Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-[17px] font-extrabold text-[#0B132B] tracking-tight">
            Top Rated <span className="text-[#1865F2]">BUILDER</span>
          </h2>
        </div>

        {/* Carousel Arrow Buttons */}
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

      {/* Horizontal Scrollable Builder Cards Grid */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
      >
        {builders.map((builder) => (
          <div
            key={builder.id}
            className="w-[160px] sm:w-[170px] shrink-0 bg-white rounded-[16px] border border-slate-100 p-3.5 flex flex-col items-center text-center shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Exact Circular Logo Badge with Top-Right Verified Green Checkmark */}
            <div className="relative mb-2.5 w-[90px] h-[90px] shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xs">
                <Image
                  src={builder.logoSrc}
                  alt={builder.name}
                  fill
                  className="object-contain"
                  sizes="90px"
                />
              </div>

              {/* Sharp Top-Right Green Verified Checkmark */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white shadow-2xs z-10">
                <Check className="w-3 h-3 stroke-[3.5]" />
              </div>
            </div>

            {/* Builder Name */}
            <h3 className="text-xs sm:text-[12.5px] font-black text-[#0B132B] truncate w-full tracking-tight">
              {builder.name}
            </h3>

            {/* Listing & Experience with Green Dot */}
            <p className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1.5 mt-1 mb-3">
              <span>{builder.listings}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shrink-0" />
              <span>{builder.experience}</span>
            </p>

            {/* View Profile Button (solid black pill) */}
            <Link
              href="/builder"
              className="w-full py-2 bg-[#0B132B] hover:bg-black text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-2xs text-center block"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};
