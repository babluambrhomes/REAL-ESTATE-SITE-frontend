"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface AgentItem {
  id: string;
  name: string;
  listings: string;
  experience: string;
  photoSrc: string;
}

export const TopRatedAgents = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const agents: AgentItem[] = [
    {
      id: "ag-1",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_1.png",
    },
    {
      id: "ag-2",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_2.png",
    },
    {
      id: "ag-3",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_3.png",
    },
    {
      id: "ag-4",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_4.png",
    },
    {
      id: "ag-5",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_5.png",
    },
    {
      id: "ag-6",
      name: "JITENDRA SINGH",
      listings: "120 Listing",
      experience: "8 Years",
      photoSrc: "/agents/agent_photo_2.png",
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
            Top Rated <span className="text-[#1865F2]">Agent</span>
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

      {/* Horizontal Scrollable Agent Cards Grid */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
      >
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="w-[165px] sm:w-[175px] shrink-0 bg-white rounded-[16px] border border-slate-100 p-2.5 flex flex-col items-center text-center shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Square Portrait Photo with Top-Right Verified Green Checkmark */}
            <div className="relative mb-2.5 w-full aspect-square rounded-[12px] overflow-hidden bg-slate-100">
              <Image
                src={agent.photoSrc}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="175px"
              />
              
              {/* Sharp Top-Right Green Verified Checkmark */}
              <div className="absolute top-1.5 right-1.5 w-[19px] h-[19px] rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white shadow-2xs z-10">
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </div>
            </div>

            {/* Agent Name */}
            <h3 className="text-xs sm:text-[12.5px] font-black text-[#0B132B] truncate w-full tracking-tight">
              {agent.name}
            </h3>

            {/* Listing & Experience with Green Dot */}
            <p className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1.5 mt-1 mb-2.5">
              <span>{agent.listings}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shrink-0" />
              <span>{agent.experience}</span>
            </p>

            {/* View Profile Button (solid blue) */}
            <Link
              href="/broker"
              className="w-full py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-2xs text-center"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};
