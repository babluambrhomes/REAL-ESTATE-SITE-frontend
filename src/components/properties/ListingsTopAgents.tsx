"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const AGENTS = [
  {
    id: 1,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 2,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 3,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 4,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 5,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 6,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 7,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 8,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 9,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 10,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 11,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=90",
  },
  {
    id: 12,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=90",
  },
];

export const ListingsTopAgents = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  // Smooth Auto-Scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.75; // Steady smooth auto-scroll speed

    const step = () => {
      if (!isPausedRef.current && el) {
        el.scrollLeft += speed;
        // Seamless infinite loop: when scrolled past first full set, reset to 0
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Duplicate items for continuous seamless infinite loop
  const displayAgents = [...AGENTS, ...AGENTS];

  return (
    <section className="my-8 w-full">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-[22px] font-black text-[#0B132B] uppercase tracking-normal">
          TOP AGENTS
        </h3>
        <p className="mt-0.5 text-[13px] sm:text-sm text-[#475569] font-normal">
          Discover The Experts Behind Successful Property Deals.
        </p>
      </div>

      {/* Auto-Scrollable continuous container with hover/touch pause */}
      <div
        ref={scrollRef}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
        onTouchStart={() => {
          isPausedRef.current = true;
        }}
        onTouchEnd={() => {
          isPausedRef.current = false;
        }}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex items-start gap-5 sm:gap-6 md:gap-7 overflow-x-auto pb-4 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
      >
        {displayAgents.map((agent, index) => (
          <div
            key={`${agent.id}-${index}`}
            className="group relative flex flex-col items-center transition-transform duration-200 hover:-translate-y-1 w-[165px] sm:w-[180px] md:w-[190px] shrink-0"
          >
            {/* Photo Card Container with relative positioning */}
            <div className="relative w-full aspect-[1/1]">
              {/* Photo inside rounded container */}
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 640px) 165px, (max-width: 768px) 180px, 190px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 8}
                />

                {/* Bottom Dark Gradient Name Pill matching Figma */}
                <div className="absolute inset-x-0 bottom-0 pt-8 pb-2.5 px-2 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-end justify-center pointer-events-none">
                  <p className="text-[12.5px] sm:text-[13px] font-semibold text-white tracking-wide truncate max-w-[92%] drop-shadow-xs">
                    {agent.name}
                  </p>
                </div>
              </div>

              {/* Exact Verified Green Badge from user asset (fitted with checkmark) */}
              <div className="absolute -top-1.5 -right-1.5 z-20 h-6 w-6 sm:h-[26px] sm:w-[26px] pointer-events-none drop-shadow-xs">
                <Image
                  src="/agents/verified-badge.png"
                  alt="Verified"
                  width={26}
                  height={26}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Info below photo */}
            <div className="mt-2.5 w-full text-center flex flex-col items-center">
              {/* Role */}
              <p className="text-[12px] font-semibold text-[#1865F2] leading-tight truncate w-full">
                {agent.role}
              </p>

              {/* Rating row: 2 stars + 4.6 + (76 Reviews) */}
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px]">
                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] stroke-[#F59E0B]" />
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B] stroke-[#F59E0B]" />
                </div>
                <span className="font-semibold text-[#0F172A] ml-0.5">{agent.rating}</span>
                <span className="text-[10.5px] text-[#64748B]">
                  ({agent.reviews})
                </span>
              </div>

              {/* Badges: [ 5 years experience ] [ 10 close ] */}
              <div className="mt-2 flex items-center justify-center gap-1.5 flex-wrap">
                <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#64748B] whitespace-nowrap">
                  {agent.experience}
                </span>
                <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#64748B] whitespace-nowrap">
                  {agent.deals}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
