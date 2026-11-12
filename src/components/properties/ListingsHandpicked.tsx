"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export interface HandpickedItem {
  id: number | string;
  slug?: string;
  title: string;
  rating: string;
  location: string;
  price: string;
  image: string;
}

export const HANDPICKED_ITEMS: HandpickedItem[] = [
  {
    id: "green-villa-2-exclusive",
    slug: "green-villa-2-exclusive",
    title: "Green Villa 2 Exclusive",
    rating: "5.0 ★",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1.25 Cr",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "ats-picturesque-reprieves",
    slug: "ats-picturesque-reprieves",
    title: "ATS Picturesque Reprieves",
    rating: "4.9 ★",
    location: "Sector 152, Noida Expressway",
    price: "₹ 1.95 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "supertech-supernova-spira",
    slug: "supertech-supernova-spira",
    title: "Supertech Supernova Iconic",
    rating: "4.8 ★",
    location: "Sector 94, Noida",
    price: "₹ 2.80 Cr",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "jaypee-greens-pavilion",
    slug: "jaypee-greens-pavilion",
    title: "Jaypee Greens Pavilion Court",
    rating: "5.0 ★",
    location: "Wish Town, Sector 128, Noida",
    price: "₹ 3.10 Cr",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "county-107-noida",
    slug: "county-107-noida",
    title: "County 107 Ultra Luxury",
    rating: "4.9 ★",
    location: "Sector 107, Noida",
    price: "₹ 4.75 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "cleo-county-residences",
    slug: "cleo-county-residences",
    title: "Cleo County Residences",
    rating: "4.9 ★",
    location: "Sector 121, Noida",
    price: "₹ 1.60 Cr",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=85",
  },
];

export const ListingsHandpicked = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      return () => current.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 260;
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full my-6">
      {/* Header Matching Figma 1:1 */}
      <div className="mb-4">
        <h3 className="text-[22px] font-bold tracking-tight text-[#0B132B]">
          Handpicked For You
        </h3>
        <p className="mt-0.5 text-[13px] text-[#64748B]">
          Projects Worth Seeing Before You Decide.
        </p>
      </div>

      {/* Carousel Container with Left/Right Buttons */}
      <div className="relative group">
        {/* Left Arrow Button Matching Figma 1:1 */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={`absolute -left-3 sm:-left-4 top-[40%] -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white border-[1.5px] border-[#1865F2] hover:bg-blue-50 active:scale-95 text-[#1865F2] shadow-[0_2px_10px_rgba(24,101,242,0.18)] transition-all cursor-pointer ${
            canScrollLeft ? "opacity-100 scale-100" : "opacity-80 hover:opacity-100"
          }`}
        >
          <ChevronLeft className="h-5 w-5 text-[#1865F2] stroke-[2.5]" />
        </button>

        {/* Scrollable Items Row - Exactly 3 visible on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {HANDPICKED_ITEMS.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={`/properties/${item.slug || item.id}`}
              className="flex-shrink-0 w-[270px] sm:w-[295px] md:w-[320px] cursor-pointer group/card rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 block"
            >
              {/* Landscape Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 270px, 320px"
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
              </div>

              {/* 2-Column Info matching Figma */}
              <div className="mt-3 px-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] sm:text-[15.5px] font-medium text-[#0B132B] truncate group-hover/card:text-[#1865F2] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[13px] font-medium text-[#1865F2] shrink-0">
                    {item.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-[12px] text-[#64748B] font-normal truncate">
                    {item.location}
                  </p>
                  <p className="text-[13.5px] font-medium text-[#1865F2] shrink-0">
                    {item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button Matching Figma 1:1 */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className={`absolute -right-3 sm:-right-4 top-[40%] -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white border-[1.5px] border-[#1865F2] hover:bg-blue-50 active:scale-95 text-[#1865F2] shadow-[0_2px_10px_rgba(24,101,242,0.18)] transition-all cursor-pointer ${
            canScrollRight ? "opacity-100 scale-100" : "opacity-80 hover:opacity-100"
          }`}
        >
          <ChevronRight className="h-5 w-5 text-[#1865F2] stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
