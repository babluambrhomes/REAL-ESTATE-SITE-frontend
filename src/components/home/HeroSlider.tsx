"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image:
      "/layout/banner.png",
    title: "Find Your Dream Home",
    subtitle: "Explore luxury properties in the most desirable locations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    title: "Luxury Living Redefined",
    subtitle: "Modern designs crafted for comfort and elegance.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80",
    title: "Premium Locations",
    subtitle: "Prime addresses surrounded by nature and convenience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
    title: "Invest In Your Future",
    subtitle: "High-growth opportunities with guaranteed returns.",
  },
];

export const HeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="h-[70vh] min-h-[420px] w-full "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <div className="absolute bottom-12  right-16 z-10">
        <div className="mx-auto flex flex-col w-full items-center justify-end gap-2 ">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className="group flex items-center"
            >
              <span
                className={`h-3 w-3 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-primary"
                    : "bg-white group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
