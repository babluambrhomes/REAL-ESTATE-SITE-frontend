"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReadyToMoveItem {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
}

const READY_TO_MOVE_ITEMS: ReadyToMoveItem[] = [
  {
    id: 1,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 7,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 8,
    title: "Green Villa 2",
    location: "Sector 16B, Greater Noida",
    price: "₹ 1 - 1.58 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=85",
  },
];

export const ListingsReadyToMove = () => {
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
      const cardWidth = 220;
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full my-6">
      {/* Header Matching Figma 1:1 */}
      <div className="mb-4">
        <h3 className="text-[22px] font-bold tracking-tight text-[#0B132B]">
          Ready To Move
        </h3>
        <p className="mt-0.5 text-[13px] text-[#64748B]">
          Move In Without Waiting For Construction.
        </p>
      </div>

      {/* Carousel Container with Left/Right Buttons */}
      <div className="relative group">
        {/* Left Arrow Button with Inner White Border Matching Figma 1:1 */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={`absolute -left-3 sm:-left-4 top-[38%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#1865F2] hover:bg-blue-700 active:scale-95 text-white shadow-[0_4px_16px_rgba(24,101,242,0.35)] transition-all cursor-pointer p-[3px] ${
            canScrollLeft ? "opacity-100 scale-100" : "opacity-90 hover:opacity-100"
          }`}
        >
          <div className="w-full h-full rounded-[8px] border-[1.5px] border-white flex items-center justify-center">
            <ChevronLeft className="h-5 w-5 text-white stroke-[3]" />
          </div>
        </button>

        {/* Scrollable Items Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {READY_TO_MOVE_ITEMS.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 w-[200px] sm:w-[225px] md:w-[240px] cursor-pointer group/card"
            >
              {/* Image Container with Exact Blue Border Frame matching Figma */}
              <div className="relative aspect-[3/4] w-full rounded-2xl border-[2px] border-[#2563EB] bg-white p-1.5 shadow-sm transition-all duration-300 group-hover/card:shadow-md group-hover/card:scale-[1.01]">
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 200px, 240px"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
              </div>

              {/* Text info below matching Figma */}
              <div className="mt-3 text-center">
                <h4 className="text-[15.5px] font-semibold text-[#0B132B] truncate leading-tight">
                  {item.title}
                </h4>
                <p className="text-[12px] text-[#64748B] font-medium truncate mt-1 leading-tight">
                  {item.location}
                </p>
                <p className="text-[14px] font-semibold text-[#0B132B] mt-1.5 leading-tight">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button with Inner White Border Matching Figma 1:1 */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className={`absolute -right-3 sm:-right-4 top-[38%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#1865F2] hover:bg-blue-700 active:scale-95 text-white shadow-[0_4px_16px_rgba(24,101,242,0.35)] transition-all cursor-pointer p-[3px] ${
            canScrollRight ? "opacity-100 scale-100" : "opacity-90 hover:opacity-100"
          }`}
        >
          <div className="w-full h-full rounded-[8px] border-[1.5px] border-white flex items-center justify-center">
            <ChevronRight className="h-5 w-5 text-white stroke-[3]" />
          </div>
        </button>
      </div>
    </div>
  );
};
