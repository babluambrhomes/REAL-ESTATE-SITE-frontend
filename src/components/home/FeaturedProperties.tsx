"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { PropertyCard } from "@/components/card/PropertyCard";
import type { Property } from "@/types";

import "swiper/css";



import { fastSellingProperties } from "@/data/properties";

interface FeaturedPropertiesProps {
  title1?: string;
  title2?: string;
  viewAllHref?: string;
}

export const FeaturedProperties = ({
  title1 = "Fast Selling",
  title2 = "Properties",
  viewAllHref = "/properties",
}: FeaturedPropertiesProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const safeProperties = useMemo(() => {
    return fastSellingProperties;
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-10">
      {/* Section Header matching Figma: | Fast Selling Properties ... view all < > */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-6 sm:h-7 w-1.5 rounded-full bg-[#05A579] shrink-0" />
          <h2 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-normal text-[#2563EB] leading-tight">
            {title1} <span>{title2}</span>
          </h2>
        </div>

        {/* Top Right: Exact [ view all < ] ( > ) seamlessly joined matching screenshot */}
        <div className="flex items-center gap-2">
          {/* Left Pill containing "view all" text + circular "<" button */}
          <div className="inline-flex items-center">
            <Link
              href={viewAllHref}
              className="flex h-8 items-center rounded-l-full border-y border-l border-[#D3E3FD] bg-white pl-3.5 sm:pl-4 pr-5 sm:pr-6 text-xs sm:text-[13.5px] font-medium text-[#1865F2] hover:underline cursor-pointer tracking-normal transition-colors"
            >
              view all
            </Link>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="-ml-4 relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#D3E3FD] bg-white text-slate-500 transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Right standalone circular ">" button */}
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D3E3FD] bg-white text-slate-500 shadow-xs transition-colors hover:border-[#1865F2] hover:text-[#1865F2] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Property Cards Carousel: 3 full cards visible on laptop/desktop screens */}
      <div className="relative group/carousel">
        <Swiper
          modules={[Autoplay]}
          loop={safeProperties.length > 3}
          speed={600}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!pb-9 !pt-3 !px-2.5 -mx-2.5"
        >
          {safeProperties.map((property, idx) => (
            <SwiperSlide
              key={`${property.id || property.title}-${idx}`}
              className="!h-auto shrink-0"
            >
              <PropertyCard {...property} layout="vertical" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* FLOATING LEFT NAV ARROW ON CAROUSEL EDGE */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous"
          className="absolute -left-2.5 sm:-left-3.5 top-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* FLOATING RIGHT NAV ARROW ON CAROUSEL EDGE */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next"
          className="absolute -right-2.5 sm:-right-3.5 top-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-md transition-all hover:bg-[#1865F2] hover:text-white hover:border-[#1865F2] cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </section>
  );
};
