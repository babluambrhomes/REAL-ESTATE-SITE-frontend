"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { homeCategories, type HomeCategory } from "@/data/homeCategories";

export const HomeChip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. First 4 categories stay fixed on the left:
  // Agent, Post Property, Builder, Interior
  const fixedCategories = homeCategories.slice(0, 4);

  // 2. Remaining categories scroll continuously:
  // Villa, Office Space, Floor, Farm House, Rented Apt.., Land, PG/Co-Living
  const scrollingCategories = homeCategories.slice(4);

  // Seamless Infinite Auto-Scroll Logic for the remaining categories
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.65; // Ultra-smooth 60fps drift speed

    const step = () => {
      if (!isHovered && el) {
        // el has 4 identical cycles, so one complete cycle width is scrollWidth / 4
        const cycleWidth = el.scrollWidth / 4;
        if (cycleWidth > 0) {
          el.scrollLeft += speed;
          // When scrolled through one full cycle, reset seamlessly
          if (el.scrollLeft >= cycleWidth) {
            el.scrollLeft -= cycleWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const renderCard = (category: HomeCategory, key: string) => (
    <Link
      key={key}
      href={category.href}
      className="group flex flex-col items-center w-[88px] sm:w-[94px] md:w-[100px] shrink-0 text-center cursor-pointer"
    >
      {/* Dual-layer Category Card: Compact height (Outer radius 30px | Inner radius 20px) */}
      <div className="flex h-[84px] w-[88px] sm:h-[90px] sm:w-[94px] md:h-[94px] md:w-[100px] items-center justify-center rounded-[30px] border border-white/90 bg-white p-[6px] sm:p-[7px] shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(24,101,242,0.12)]">
        <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-[#F0F8FF] p-1 overflow-hidden">
          <Image
            src={category.image}
            alt={category.title}
            width={64}
            height={64}
            className="h-[46px] w-[46px] sm:h-[50px] sm:w-[50px] md:h-[54px] md:w-[54px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Title */}
      <p className="mt-2 whitespace-nowrap text-[12px] sm:text-[12.5px] font-normal tracking-tight text-[#111827] transition-colors group-hover:text-[#1865F2]">
        {category.title}
      </p>
    </Link>
  );

  const renderDivider = (key: string) => (
    <div
      key={key}
      className="flex items-center justify-center h-[84px] sm:h-[90px] md:h-[94px] px-1 shrink-0 self-start"
    >
      <Image
        src="/categories/Group 1686559162.svg"
        alt="Divider"
        width={24}
        height={94}
        className="h-[80px] sm:h-[86px] md:h-[90px] w-auto object-contain"
      />
    </div>
  );

  // 4 cycles to ensure infinite smooth seamless looping
  const cycles = [0, 1, 2, 3];

  return (
    <section className="relative mx-auto w-full max-w-[1460px] px-3 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4">
      <div className="flex w-full items-start justify-start overflow-hidden">
        {/* 1. Left Fixed Section: Agent, Post Property, Builder, Interior + Fixed Divider */}
        <div className="flex shrink-0 items-start gap-2.5 sm:gap-3.5 md:gap-4 pt-3 pb-3 pr-2.5 sm:pr-3.5 md:pr-4 select-none z-10">
          {fixedCategories.map((category) => renderCard(category, `fixed-${category.title}`))}
          {renderDivider("fixed-divider-left")}
        </div>

        {/* 2. Middle Scrolling Section: Villa, Office Space, Floor, Farm House, Rented Apt.., Land, PG/Co-Living */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-1 min-w-0 items-start justify-start overflow-x-auto pt-3 pb-3 scrollbar-hide no-scrollbar [&::-webkit-scrollbar]:hidden select-none"
        >
          {cycles.map((cycleIndex) => (
            <div
              key={cycleIndex}
              className="flex shrink-0 items-start gap-2.5 sm:gap-3.5 md:gap-4 pr-2.5 sm:pr-3.5 md:pr-4"
            >
              {scrollingCategories.map((category) =>
                renderCard(category, `scroll-${cycleIndex}-${category.title}`)
              )}
            </div>
          ))}
        </div>

        {/* 3. Right Fixed Divider: Anchored at the last position */}
        <div className="flex shrink-0 items-start pt-3 pb-3 pl-1 sm:pl-2 select-none z-10">
          {renderDivider("fixed-divider-right")}
        </div>
      </div>
    </section>
  );
};