"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AgentNearByItem {
  id: string;
  company: string;
  agent: string;
  photoSrc: string;
}

export const AgentNearBy = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const agents: AgentNearByItem[] = [
    {
      id: "anb-1",
      company: "E-BUILDER",
      agent: "Smiriti Singh",
      photoSrc: "/agents/nearby/nearby_agent_1.png",
    },
    {
      id: "anb-2",
      company: "E-BUILDER",
      agent: "Smiriti Singh",
      photoSrc: "/agents/nearby/nearby_agent_2.png",
    },
    {
      id: "anb-3",
      company: "E-BUILDER",
      agent: "Smiriti Singh",
      photoSrc: "/agents/nearby/nearby_agent_3.png",
    },
    {
      id: "anb-4",
      company: "E-BUILDER",
      agent: "Smiriti Singh",
      photoSrc: "/agents/nearby/nearby_agent_4.png",
    },
    {
      id: "anb-5",
      company: "E-BUILDER",
      agent: "Smiriti Singh",
      photoSrc: "/agents/nearby/nearby_agent_5.png",
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
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 font-jakarta">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-[17px] font-extrabold text-[#0B132B] tracking-tight">
            Agent <span className="text-[#1865F2]">Near By</span>
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

      {/* Cards Slider (5 Cards Row) */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {agents.map((item) => (
          <div
            key={item.id}
            className="w-[185px] sm:w-[195px] shrink-0 bg-white rounded-[18px] border border-slate-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_26px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
          >
            {/* Top Portrait Photo */}
            <div className="w-full h-44 relative bg-slate-100">
              <Image
                src={item.photoSrc}
                alt={item.agent}
                fill
                className="object-cover object-top"
                sizes="195px"
              />
            </div>

            {/* Bottom Strip with e-Builder Branding */}
            <div className="p-3 bg-white flex items-center gap-2 border-t border-slate-50">
              <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center text-slate-950 font-black text-[9px] shrink-0">
                eB
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[11px] font-black text-slate-900 tracking-tight leading-none truncate">
                  {item.company}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                  {item.agent}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
