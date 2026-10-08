"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check, Heart } from "lucide-react";

interface SpecializationAgentItem {
  id: string;
  name: string;
  designation: string;
  location: string;
  experience: string;
  listings: string;
  slogan: string;
  photoSrc: string;
}

export const SpecializationAgents = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const items: SpecializationAgentItem[] = [
    {
      id: "sa-1",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
    },
    {
      id: "sa-2",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
    },
    {
      id: "sa-3",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
    },
    {
      id: "sa-4",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
    },
    {
      id: "sa-5",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
    },
    {
      id: "sa-6",
      name: "Amit Sharma",
      designation: "Director Sales",
      location: "Noida • Delhi NCR",
      experience: "8 Years",
      listings: "120 Listing",
      slogan: "Specialist In Residential Properties And New Launches",
      photoSrc: "/agents/specialization_agent_photo.png",
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
            Specialization <span className="text-[#1865F2]">Agent</span>
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
            className="w-[185px] sm:w-[195px] shrink-0 bg-white rounded-[16px] border border-slate-100 p-2.5 flex flex-col justify-between shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Agent Photo with Heart Button */}
            <div className="w-full h-28 relative rounded-[12px] overflow-hidden mb-2 bg-slate-100">
              <Image
                src={item.photoSrc}
                alt={item.name}
                fill
                className="object-cover"
                sizes="185px"
              />

              {/* Top-Right Heart Wishlist Button */}
              <button
                type="button"
                aria-label="Wishlist"
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors shadow-2xs cursor-pointer z-10"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Agent Details */}
            <div className="space-y-0.5 text-left px-0.5">
              <div className="flex items-center gap-1">
                <h3 className="text-xs sm:text-[13px] font-black text-[#0B132B] truncate">
                  {item.name}
                </h3>
                <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2 h-2 stroke-[3.5]" />
                </div>
              </div>

              <p className="text-[11px] font-bold text-slate-700 truncate">
                {item.designation}
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

              <p className="text-[9px] text-slate-500 font-medium truncate pt-1">
                {item.slogan}
              </p>
            </div>

            {/* View Profile Button (Solid Blue) */}
            <Link
              href="/broker"
              className="w-full mt-2.5 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-2xs text-center"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};
