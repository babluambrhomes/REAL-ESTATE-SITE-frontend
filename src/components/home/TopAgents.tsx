"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { AgentCard } from "@/components/card/AgentCard";

import "swiper/css";

const agents = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    name: "Rahul Sharma",
    designation: "Senior Property Consultant",
    followers: 1200,
    views: 3500,
    videos: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Priya Verma",
    designation: "Residential Sales Expert",
    followers: 980,
    views: 2800,
    videos: 18,
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    name: "Amit Gupta",
    designation: "Commercial Realty Advisor",
    followers: 1500,
    views: 4200,
    videos: 31,
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    name: "Sneha Kapoor",
    designation: "Luxury Home Specialist",
    followers: 1750,
    views: 5100,
    videos: 42,
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    name: "Vikram Singh",
    designation: "Investment Property Advisor",
    followers: 860,
    views: 2400,
    videos: 15,
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Neha Malhotra",
    designation: "NRI Property Consultant",
    followers: 2100,
    views: 6800,
    videos: 55,
  },
];

export const TopAgents = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">
      <div className="relative mt-6">
        <Swiper
          modules={[]}
          loop
          speed={600}
          spaceBetween={20}
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-2"
        >
          {agents.map((agent) => (
            <SwiperSlide key={agent.name} className="!h-auto">
              <AgentCard {...agent} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <button
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
        </button> */}
      </div>
    </section>
  );
};
