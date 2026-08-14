"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heading } from "./Heading";
import { VideoCard } from "@/components/card/VideoCard";

import "swiper/css";

const videos = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    title: "Luxury 3BHK Walkthrough",
    location: "Sector 150, Noida",
    duration: "4:32",
    videoId: "aqz-KE-bpKQ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600584524347-0d93d2dc85c9?auto=format&fit=crop&w=800&q=80",
    title: "Villa Tour with Pool",
    location: "DLF Phase 5, Gurgaon",
    duration: "6:15",
    videoId: "aqz-KE-bpKQ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
    title: "Metro Connectivity Review",
    location: "Vaishali, Ghaziabad",
    duration: "3:47",
    videoId: "aqz-KE-bpKQ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    title: "Premium Villa with Garden",
    location: "Greater Noida West",
    duration: "5:20",
    videoId: "aqz-KE-bpKQ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "Modern 2BHK Apartment Tour",
    location: "Golf Course Extension, Gurgaon",
    duration: "3:10",
    videoId: "aqz-KE-bpKQ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    title: "Skyline High-Rise Project",
    location: "Indirapuram, Ghaziabad",
    duration: "7:05",
    videoId: "aqz-KE-bpKQ",
  },
];

export const VideoSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mx-auto w-full px-6 pb-12 sm:px-10">
     

      <div className="relative mt-6">
        <Swiper
          // modules={[Autoplay]}
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
          {videos.map((video) => (
            <SwiperSlide key={video.title} className="!h-auto">
              <VideoCard {...video} />
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
