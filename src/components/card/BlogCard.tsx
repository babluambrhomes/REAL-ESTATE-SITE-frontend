"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BlogItem {
  id: number;
  type: "invest" | "commercial" | "guide";
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  href?: string;
}

export const BlogCard = ({
  type,
  title,
  subtitle,
  date,
  description,
  href = "/blogs",
}: BlogItem) => {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-[26px] border-[1.5px] border-[#DCE8FE] bg-white p-4 shadow-[0_18px_36px_-6px_rgba(24,101,242,0.2),0_-8px_24px_-4px_rgba(24,101,242,0.12),0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_-6px_rgba(24,101,242,0.3),0_-12px_28px_-4px_rgba(24,101,242,0.18)] hover:border-[#93C5FD] transition-all duration-300">
      {/* Top Banner Graphic (Exact Figma Replica) */}
      {type === "invest" ? (
        <div className="relative h-60 w-full overflow-hidden rounded-[20px] bg-gradient-to-r from-[#0062E3] via-[#0070F3] to-[#0099FF] p-5 text-white flex justify-between">
          {/* Left Content */}
          <div className="relative z-10 max-w-[58%] flex flex-col justify-between">
            <div>
              {/* Roofin Brand */}
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-white">
                  Roof<span className="text-[#FBBF24]">in</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />
              </div>

              {/* Main Headline */}
              <h3 className="mt-2 text-lg sm:text-xl font-black leading-tight text-white">
                {title}
              </h3>

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-1.5 text-xs text-blue-100 font-semibold leading-snug">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Date Badge */}
            <div className="mt-3">
              <span className="inline-block rounded-full bg-slate-900/80 px-3 py-0.5 text-[10px] font-bold text-white shadow-xs">
                {date}
              </span>
            </div>
          </div>

          {/* Right Arched Architecture Image */}
          <div className="relative w-[38%] h-full flex items-end justify-center">
            <div className="relative h-44 w-36 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-amber-400 shadow-xl bg-blue-950">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80"
                alt="Luxury Real Estate"
                fill
                sizes="200px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-60 w-full overflow-hidden rounded-[20px] bg-[#0070F3] p-5 text-white flex justify-between bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:12px_12px]">
          {/* Left Content */}
          <div className="relative z-10 max-w-[55%] flex flex-col justify-between">
            <div>
              {/* Headline */}
              <h3 className="text-base sm:text-lg font-black leading-snug text-white">
                {title}
              </h3>

              {/* Roofin Logo */}
              <div className="mt-2 flex items-center gap-1">
                <span className="text-lg font-black tracking-tight text-white">
                  Roof<span className="text-[#FBBF24]">in</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />
              </div>
            </div>

            {/* Date Badge */}
            <div className="mt-3">
              <span className="inline-block rounded-full bg-slate-900/80 px-3 py-0.5 text-[10px] font-bold text-white shadow-xs">
                {date}
              </span>
            </div>
          </div>

          {/* Right Thinking Man & Connected Property Nodes */}
          <div className="relative w-[45%] h-full flex items-end justify-center">
            {/* Red Question Marks */}
            <span className="absolute top-1 left-2 text-red-500 font-black text-xl animate-bounce">
              ?
            </span>
            <span className="absolute top-4 right-2 text-red-500 font-black text-lg">
              ?
            </span>

            {/* Connected Node 1: Building Thumbnail */}
            <div className="absolute top-2 left-0 h-10 w-10 rounded-lg overflow-hidden border border-white/60 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80"
                alt="Commercial"
                fill
                sizes="50px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Connected Node 2: Interior Thumbnail */}
            <div className="absolute bottom-6 left-1 h-10 w-10 rounded-lg overflow-hidden border border-white/60 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                alt="Residential"
                fill
                sizes="50px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Connected Node 3: House Thumbnail */}
            <div className="absolute top-8 right-12 h-9 w-9 rounded-lg overflow-hidden border border-white/60 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80"
                alt="Villa"
                fill
                sizes="50px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Thinking Man in Checked Shirt */}
            <div className="relative h-44 w-32 overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                alt="Thinking Investor"
                fill
                sizes="150px"
                className="object-cover object-top rounded-t-full rounded-b-xl border border-white/40 shadow-xl"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      {/* Description & Read More Button (Matches Figma) */}
      <div className="pt-4 flex flex-col justify-between flex-1">
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {description}
        </p>

        <div className="mt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0062E3] bg-white px-5 py-2 text-xs font-bold text-[#0062E3] shadow-xs hover:bg-blue-50 transition-all hover:scale-105"
          >
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
