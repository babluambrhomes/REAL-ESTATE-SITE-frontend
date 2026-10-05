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
    title: "Prime Locations vs Emerging Hubs",
    subtitle: "Maximize rental yields in NCR's top micro-markets",
    date: "24 jun 2026",
    description: "Explore expert insights and investment strategies to maximize returns in the real estate market.",
  },
];

export const BlogSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState("Investment");

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 py-10">
      {/* Header Section (Matches Figma) */}
      <div className="border-l-4 border-[#0062E3] pl-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Unlocking the <span className="text-[#0062E3]">Future of Real Estate Articles</span>
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
          Stay updated with the latest property trends, investment tips, and expert market insights.
        </p>
      </div>

      {/* Category Pills (Matches Figma) */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {CATEGORY_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0062E3] text-white shadow-md"
                  : "border border-blue-200/80 bg-blue-50/50 text-[#0062E3] hover:bg-blue-100/60"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 2-Card Blog Carousel with Floating Arrow Buttons */}
      <div className="relative mt-8">
        {/* Left Floating Arrow */}
        <button
          type="button"
          aria-label="Previous Blog"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0062E3] shadow-lg hover:bg-blue-50 hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* Right Floating Arrow */}
        <button
          type="button"
          aria-label="Next Blog"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0062E3] shadow-lg hover:bg-blue-50 hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!px-1 !py-2"
        >
          {BLOGS.map((blog) => (
            <SwiperSlide key={blog.id} className="!h-auto">
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
