"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface NearByBuilder {
  id: string;
  name: string;
  agent: string;
  location: string;
  experience: string;
  listings: string;
  slogan: string;
  logoSrc: string;
}

export const BuildersNearBy = () => {
  const builders: NearByBuilder[] = [
    {
      id: "nb-1",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "nb-2",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "nb-3",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "nb-4",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "nb-5",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
    {
      id: "nb-6",
      name: "DLF Builder",
      agent: "Amit Sharma",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Building Better Live Tomorrow",
      logoSrc: "/builders/logo_dlf_clean.png",
    },
  ];

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 font-jakarta">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-[17px] font-extrabold text-[#0B132B] tracking-tight">
            Builder <span className="text-[#1865F2]">Near By</span>
          </h2>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2-Row x 3-Column Grid of Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {builders.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[16px] border border-slate-100 p-4 flex items-center gap-4 shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Left Soft Gray Container with DLF Circular Logo Badge & Top-Right Check */}
            <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] shrink-0 bg-[#F4F6F8] rounded-[14px] flex items-center justify-center p-2">
              <div className="relative w-[80px] h-[80px] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xs">
                  <Image
                    src={item.logoSrc}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                {/* Top-Right Green Verified Checkmark */}
                <div className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white shadow-2xs z-10">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="flex-1 min-w-0 space-y-0.5 text-left">
              <h3 className="text-sm sm:text-[15px] font-black text-[#1865F2] tracking-tight truncate">
                {item.name}
              </h3>
              <p className="text-[12px] font-bold text-slate-800 truncate">
                {item.agent}
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate">
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

              <p className="text-[9px] text-slate-500 font-medium italic truncate pt-1">
                {item.slogan}
              </p>

              <div className="pt-2">
                <Link
                  href="/builder"
                  className="px-5 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-[11px] font-bold rounded-lg transition-colors shadow-2xs cursor-pointer inline-block text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
