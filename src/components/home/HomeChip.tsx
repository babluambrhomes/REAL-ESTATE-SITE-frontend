"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { homeCategories } from "@/data/homeCategories";

export const HomeChip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Seamless Infinite Auto-Scroll Logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.65; // Ultra-smooth 60fps drift speed

    const step = () => {
      if (!isHovered && el) {
        el.scrollLeft += speed;
        // When scrolled half-way (through the first duplicate set), reset to 0 seamlessly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Duplicate list once to create an infinite seamless loop
  const duplicatedCategories = [...homeCategories, ...homeCategories];

  return (
    <section className="relative mx-auto w-full max-w-[1460px] px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-6">
      {/* Scrollable Container with complete scrollbar suppression */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex w-full items-start justify-start gap-2.5 sm:gap-3.5 md:gap-4 overflow-x-auto pt-3 pb-3 scrollbar-hide no-scrollbar [&::-webkit-scrollbar]:hidden select-none"
      >
        {duplicatedCategories.map((category, index) => {
          const isItem4 = (index % homeCategories.length) === 4;
          const isLastItem = (index % homeCategories.length) === homeCategories.length - 1;

          return (
            <React.Fragment key={`${category.title}-${index}`}>
              {/* Vertical Pill Divider between Item 4 (Interior) and Item 5 (Villa) */}
              {isItem4 && (
                <div className="flex items-center justify-center h-[112px] sm:h-[120px] md:h-[126px] px-1 shrink-0 self-start">
                  <Image
                    src="/categories/Group 1686559162.svg"
                    alt="Divider"
                    width={30}
                    height={126}
                    className="h-[108px] sm:h-[116px] md:h-[122px] w-auto object-contain"
                  />
                </div>
              )}

              <Link
                href={category.href}
                className="group flex flex-col items-center w-[102px] sm:w-[112px] md:w-[118px] shrink-0 text-center cursor-pointer"
              >
                {/* Dual-layer Category Card: Outer White Frame + Inner Soft Blue (#F0F8FF) Container */}
                <div className="flex h-[112px] w-[104px] sm:h-[120px] sm:w-[112px] md:h-[126px] md:w-[118px] items-center justify-center rounded-[28px] border border-white/90 bg-white p-2 sm:p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(24,101,242,0.12)]">
                  <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-[#F0F8FF] p-2.5 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={76}
                      height={76}
                      className="h-[64px] w-[64px] sm:h-[70px] sm:w-[70px] md:h-[76px] md:w-[76px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Title */}
                <p className="mt-3 whitespace-nowrap text-[13.5px] sm:text-[14.5px] font-normal tracking-tight text-[#111827] transition-colors group-hover:text-[#1865F2]">
                  {category.title}
                </p>
              </Link>

              {/* Vertical Pill Divider after last item (PG/Co-Living) */}
              {isLastItem && (
                <div className="flex items-center justify-center h-[112px] sm:h-[120px] md:h-[126px] px-1 shrink-0 self-start">
                  <Image
                    src="/categories/Group 1686559162.svg"
                    alt="Divider"
                    width={30}
                    height={126}
                    className="h-[108px] sm:h-[116px] md:h-[122px] w-auto object-contain"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};