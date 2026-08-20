"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heading } from "./Heading";
import { PropertyCard } from "@/components/card/PropertyCard";

import "swiper/css";
import { properties } from "@/data/properties";


export const FeaturedProperties = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">
      <div className="relative mt-6">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={600}
          spaceBetween={10}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4.2 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-2"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.title} className="!h-auto">
              <PropertyCard {...property} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full   bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full   bg-white text-primary shadow-md transition-colors hover:bg-primary hover:text-white sm:-right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
