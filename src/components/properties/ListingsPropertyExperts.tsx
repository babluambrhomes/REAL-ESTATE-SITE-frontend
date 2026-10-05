"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyExpert {
  id: number;
  name: string;
  role: string;
  image: string;
}

const PROPERTY_EXPERTS: PropertyExpert[] = [
  {
    id: 1,
    name: "JITENDRA SINGH",
    role: "Director Sales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 2,
    name: "PRIYA SHARMA",
    role: "Director Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 3,
    name: "AMIT VERMA",
    role: "Senior Consultant",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 4,
    name: "RAHUL MEHTA",
    role: "Commercial Head",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 5,
    name: "VIKRAM MALHOTRA",
    role: "Director Sales",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 6,
    name: "ANANYA SEN",
    role: "Luxury Portfolio Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 7,
    name: "ROHIT KAPOOR",
    role: "Director Sales",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: 8,
    name: "NEHA CHOPRA",
    role: "Senior Partner",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=85",
  },
];

export const ListingsPropertyExperts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect every 2.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const scrollAmount = 180; // Approximate card width + gap
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        // Smooth loop back to beginning
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2600);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -220 : 220;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div 
      className="w-full my-6 relative group/container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Header Matching Figma 1:1 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[22px] font-bold tracking-tight text-[#0B132B]">
            Property Experts
          </h3>
          <p className="mt-0.5 text-[13px] text-[#64748B]">
            Know The Area. Know The Deal.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleManualScroll("left")}
            aria-label="Previous Experts"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#1865F2] hover:border-[#1865F2] hover:shadow-sm flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            aria-label="Next Experts"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#1865F2] hover:border-[#1865F2] hover:shadow-sm flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Circular Experts Auto-Sliding Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2 pt-1 scroll-smooth"
      >
        {PROPERTY_EXPERTS.map((expert, idx) => (
          <div
            key={`${expert.id}-${idx}`}
            className="flex flex-col items-center shrink-0 cursor-pointer group w-[130px] sm:w-[140px]"
          >
            {/* Circular Avatar */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border border-slate-200/90 bg-slate-100 shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                sizes="130px"
                className="object-cover"
              />
            </div>

            {/* Name & Role */}
            <h4 className="text-[13px] font-bold text-[#0B132B] uppercase tracking-wide mt-2.5 text-center truncate w-full group-hover:text-[#1865F2] transition-colors">
              {expert.name}
            </h4>
            <p className="text-[12px] text-[#64748B] font-medium text-center mt-0.5 truncate w-full">
              {expert.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
