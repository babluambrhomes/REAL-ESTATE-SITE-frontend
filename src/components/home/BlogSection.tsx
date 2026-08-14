"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heading } from "./Heading";
import { BlogCard } from "@/components/card/BlogCard";
import { cn } from "@/lib/utils";

import "swiper/css";

const tabs = ["All", "Buying", "Investment", "Home Loan", "Market News"];

const blogs = [
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    date: "Aug 02, 2026",
    title: "How to Choose the Right Location for Your Dream Home",
    category: "Buying",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    date: "Jul 28, 2026",
    title: "10 Essential Things to Check Before Buying an Under-Construction Property",
    category: "Buying",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    date: "Jul 20, 2026",
    title: "Rent vs Buy: What Makes More Sense in 2026?",
    category: "Market News",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560518883-16f2d9e05b80?auto=format&fit=crop&w=800&q=80",
    date: "Jul 12, 2026",
    title: "A Complete Guide to Real Estate Investment for Beginners",
    category: "Investment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    date: "Jul 05, 2026",
    title: "Home Loan Tips: How to Get the Best Interest Rate",
    category: "Home Loan",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    date: "Jun 26, 2026",
    title: "Why RERA Registration Matters for Every Property Buyer",
    category: "Buying",
  },
];

export const BlogSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filteredBlogs =
    activeTab === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeTab);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">
    

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full px-4 py-1 text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-primary text-white shadow-md"
                : "border border-primary/30  bg-primary/20 hover:text-white hover:bg-primary text-primary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <Swiper
          key={activeTab}
          // modules={[Autoplay]}
          loop
          speed={600}
          spaceBetween={20}
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-2"
        >
          {filteredBlogs.map((blog) => (
            <SwiperSlide key={blog.title} className="!h-auto">
              <BlogCard
                image={blog.image}
                date={blog.date}
                title={blog.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
