"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogCard, type BlogItem } from "@/components/card/BlogCard";

import "swiper/css";

const CATEGORY_TABS = [
  "Investment",
  "Market Trends",
  "Buying Guide",
  "Selling Tips",
];

const BLOGS: BlogItem[] = [
  {
    id: 1,
    type: "invest",
    title: "Invest in Real Estate",
    subtitle: "How Smart Property Investments Build Long-Term Wealth",
    date: "24 jun 2026",
    description: "Explore expert insights and investment strategies to maximize returns in the real estate market.",
  },
  {
    id: 2,
    type: "commercial",
    title: "Should You Invest in Residential or Commercial Property?",
    date: "24 jun 2026",
    description: "Explore expert insights and investment strategies to maximize returns in the real estate market.",
  },
  {
    id: 3,
    type: "invest",
    title: "Invest in Real Estate",
    subtitle: "How Smart Property Investments Build Long-Term Wealth",
    date: "24 jun 2026",
    description: "Explore expert insights and investment strategies to maximize returns in the real estate market.",
  },
  {
    id: 4,
    type: "commercial",
    title: "Should You Invest in Residential or Commercial Property?",
    date: "24 jun 2026",
    description: "Explore expert insights and investment strategies to maximize returns in the real estate market.",
  },
];

export const BlogSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState("Investment");

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-8 sm:py-10">
      {/* Header Section (1:1 Figma Design) */}
      <div className="border-l-4 border-[#2563EB] pl-3.5 sm:pl-4">
        <p className="text-[13px] sm:text-[14.5px] md:text-[15px] font-medium text-slate-700 leading-snug">
          Stay updated with the latest property trends, investment tips, and expert market insights.
        </p>
      </div>

      {/* Category Pills (1:1 Figma Match) */}
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
        {CATEGORY_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 sm:px-6 py-2 text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0088FF] text-white shadow-sm"
                  : "border border-[#BBD7FF] bg-[#F3F8FF] text-[#2563EB] hover:bg-blue-100/60"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 2-Card Blog Carousel with Figma-Positioned Arrow Buttons */}
      <div className="relative mt-7 sm:mt-8">
        {/* Left Floating Arrow - Vertically Centered with Top Banner */}
        <button
          type="button"
          aria-label="Previous Blog"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-3 sm:-left-4 md:-left-5 top-[110px] sm:top-[120px] md:top-[128px] -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#2563EB] shadow-md hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* Right Floating Arrow - Vertically Centered with Top Banner */}
        <button
          type="button"
          aria-label="Next Blog"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-3 sm:-right-4 md:-right-5 top-[110px] sm:top-[120px] md:top-[128px] -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#2563EB] shadow-md hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-2"
        >
          {BLOGS.map((blog, idx) => (
            <SwiperSlide key={`${blog.id}-${idx}`} className="!h-auto">
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
