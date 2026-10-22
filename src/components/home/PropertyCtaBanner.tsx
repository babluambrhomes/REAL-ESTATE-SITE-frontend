"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const PropertyCtaBanner = () => {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-6 sm:py-8">
      {/* 1:1 Figma Full High-Res Banner Container (aspect-[1024/147] for 100% full uncropped image) */}
      <div className="relative w-full aspect-[1024/148] min-h-[145px] overflow-hidden rounded-[14px] sm:rounded-[18px] shadow-md border border-[#2563EB]/25 bg-[#0062E3]">
        {/* Full Banner Asset */}
        <Image
          src="/images/blogs/property_cta_banner.png"
          alt="Find the Perfect Property for Your Future"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-center select-none"
          unoptimized
        />

        {/* Left Content Overlay (Exact Figma Alignment & Sizing) */}
        <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12 max-w-[62%] sm:max-w-[56%] md:max-w-[50%] select-none">
          <h2 className="text-[17px] sm:text-[20px] md:text-[23px] lg:text-[26px] font-extrabold tracking-tight text-white leading-tight drop-shadow-xs">
            Find the Perfect Property for Your Future
          </h2>

          <p className="mt-1 sm:mt-1.5 text-[9.5px] sm:text-[11px] md:text-[12px] text-white/95 font-medium leading-snug max-w-[420px]">
            Explore verified properties, compare top projects, and make informed decisions with expert guidance.
          </p>

          <div className="mt-2.5 sm:mt-3.5">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 rounded-[6px] bg-white hover:bg-blue-50/70 active:scale-98 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-bold text-[#2563EB] shadow-xs transition-all cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#2563EB]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
