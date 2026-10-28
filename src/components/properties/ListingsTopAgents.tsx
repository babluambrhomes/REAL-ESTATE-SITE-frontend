"use client";

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
    image: "/agents/top-agent-clean-1.png",
  },
  {
    id: 2,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "/agents/top-agent-clean-2.png",
  },
  {
    id: 3,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "/agents/top-agent-clean-3.png",
  },
  {
    id: 4,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "/agents/top-agent-clean-4.png",
  },
  {
    id: 5,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "/agents/top-agent-clean-5.png",
  },
  {
    id: 6,
    name: "Jitendra Singh",
    role: "Luxury property expert",
    rating: "4.6",
    reviews: "76 Reviews",
    experience: "5 years experience",
    deals: "10 close",
    image: "/agents/top-agent-clean-6.png",
  },
];

export const ListingsTopAgents = () => {
  return (
    <section className="mt-2 mb-8 w-full">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-[22px] font-black text-[#0B132B] uppercase tracking-normal">
          TOP AGENTS
        </h3>
        <p className="mt-0.5 text-[13px] sm:text-sm text-[#475569] font-normal">
          Discover The Experts Behind Successful Property Deals.
        </p>
      </div>

      {/* 6 Agents Row - Clean 6-col grid on md/lg/xl, scroll on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-4.5 w-full">
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="group relative flex flex-col items-center transition-transform duration-200 hover:-translate-y-1 w-full"
          >
            {/* Photo Card Container with relative positioning */}
            <div className="relative w-full aspect-[1/1] max-w-[195px]">
              {/* Photo inside rounded container */}
              <div className="relative w-full h-full overflow-hidden rounded-[18px] sm:rounded-[20px] bg-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 640px) 165px, (max-width: 768px) 180px, 190px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                  unoptimized
                />
              </div>

              {/* Exact Verified Green Badge from user asset (fitted with checkmark) */}
              <div className="absolute -top-1.5 -right-1.5 z-20 h-5.5 w-5.5 sm:h-6 sm:w-6 pointer-events-none drop-shadow-xs">
                <Image
                  src="/agents/verified-badge.png"
                  alt="Verified"
                  width={24}
                  height={24}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Info below photo */}
            <div className="mt-2.5 w-full text-center flex flex-col items-center">
              {/* Role */}
              <p className="text-[12px] font-medium text-[#1865F2] leading-tight truncate w-full">
                {agent.role}
              </p>

              {/* Rating row: 2 stars + 4.6 + (76 Reviews) */}
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px]">
                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                  <Star className="h-3 w-3 fill-[#F59E0B] stroke-[#F59E0B]" />
                  <Star className="h-3 w-3 fill-[#F59E0B] stroke-[#F59E0B]" />
                </div>
                <span className="font-medium text-[#0F172A] ml-0.5">{agent.rating}</span>
                <span className="text-[10px] sm:text-[10.5px] text-[#64748B]">
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
