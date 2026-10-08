"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";


interface SpecializationItem {
  id: string;
  brandTitle: string;
  brandSubtitle: string;
  builderName: string;
  agentName: string;
  location: string;
  experience: string;
  listings: string;
  slogan: string;
}

export const SpecializationBuilders = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const items: SpecializationItem[] = [
    {
      id: "sp-1",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
    },
    {
      id: "sp-2",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
    },
    {
      id: "sp-3",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
    },
    {
      id: "sp-4",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
    },
    {
      id: "sp-5",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
    },
    {
      id: "sp-6",
      brandTitle: "OMAXE",
      brandSubtitle: "Turning dreams into reality",
      builderName: "DLF BUILDER",
      agentName: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
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
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-[17px] font-extrabold text-[#0B132B] tracking-tight">
            Specialization <span className="text-[#1865F2]">Builder</span>
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

      {/* Horizontal Cards Slider */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[185px] sm:w-[195px] shrink-0 bg-white rounded-[16px] border border-slate-100 p-3.5 flex flex-col justify-between shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Exact OMAXE Logo Header Box from Figma */}
            <div className="w-full h-11 relative rounded-[10px] overflow-hidden mb-2.5 bg-white border border-slate-200/80">
              <Image
                src="/builders/omaxe_logo_exact.png"
                alt="OMAXE - Turning dreams into reality"
                fill
                className="object-contain p-1.5"
                sizes="180px"
              />
            </div>

            {/* Builder Details */}
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-1">
                <h3 className="text-xs sm:text-[12.5px] font-black text-[#0B132B] truncate">
                  {item.builderName}
                </h3>
                <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2 h-2 stroke-[3.5]" />
                </div>
              </div>

              <p className="text-[11px] font-bold text-slate-800 truncate">
                {item.agentName}
              </p>
              <p className="text-[9.5px] text-slate-400 font-medium truncate">
                {item.location}
              </p>

              {/* 2 Badges */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[9px]">
                  {item.experience}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[9px]">
                  {item.listings}
                </span>
              </div>

              <p className="text-[8.5px] text-slate-500 font-medium italic truncate pt-1">
                {item.slogan}
              </p>
            </div>

            {/* View Profile Button (Blue Outline) */}
            <Link
              href="/builder"
              className="w-full mt-2.5 py-1.5 bg-white hover:bg-blue-50 text-[#1865F2] border border-[#1865F2] text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-2xs text-center block"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>


    </section>
  );
};
