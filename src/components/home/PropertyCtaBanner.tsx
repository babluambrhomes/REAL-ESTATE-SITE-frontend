"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const PropertyCtaBanner = () => {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-6">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#0062E3] via-[#007DFE] to-[#00A3FF] p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Top-Left Warm Yellow Accent Ribbon */}
        <div className="absolute top-0 left-0 h-16 w-32 bg-[#F9A825]/90 rounded-br-[40px] blur-[1px] -z-0 opacity-80 pointer-events-none" />

        {/* Left Content */}
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-white leading-tight">
            Find the Perfect Property for Your Future
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-lg">
            Explore verified properties, compare top projects, and make informed decisions with expert guidance.
          </p>

          <div className="mt-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-bold text-[#0062E3] shadow-md hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
            >
              Explore Properties
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Right Graphic Section */}
        <div className="relative z-10 flex items-center justify-center lg:justify-end shrink-0 w-full lg:w-auto">
          <div className="relative h-44 w-72 sm:h-52 sm:w-96 flex items-end justify-center">
            {/* Arched Architectural Portal */}
            <div className="absolute left-4 bottom-0 h-40 w-40 sm:h-48 sm:w-48 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-white/40 bg-blue-900/30 shadow-2xl backdrop-blur-xs">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                alt="Modern Architecture"
                fill
                sizes="250px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0062E3]/80 via-transparent to-transparent" />
            </div>

            {/* Glowing Accent Ring */}
            <div className="absolute left-1 bottom-0 h-44 w-44 sm:h-52 sm:w-52 rounded-full border border-cyan-300/40 pointer-events-none -z-1" />

            {/* Suited Agent */}
            <div className="absolute right-6 bottom-0 h-44 w-36 sm:h-52 sm:w-44 overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                alt="Expert Advisor"
                fill
                sizes="200px"
                className="object-contain object-bottom drop-shadow-2xl"
                unoptimized
              />
            </div>

            {/* Thought / Speech Bubble (Cloud style) */}
            <div className="absolute top-1 right-2 z-20 rounded-2xl bg-white px-3 py-1.5 text-[10px] font-black text-slate-900 shadow-xl border border-blue-100 flex flex-col items-center">
              <span className="tracking-tight">Don&apos;t WAIT FOR...</span>
              <span className="text-[9px] text-[#0062E3] font-bold">Invest Today!</span>
              {/* Cloud tail dots */}
              <div className="absolute -bottom-2 right-4 flex flex-col items-center gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-xs" />
                <span className="h-1 w-1 rounded-full bg-white shadow-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Background Waves / Shapes */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
      </div>
    </section>
  );
};
