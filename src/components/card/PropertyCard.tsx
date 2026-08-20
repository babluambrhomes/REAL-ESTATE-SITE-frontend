"use client";

import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  MapPin,
  PhoneCall,
  Share2,
  NotebookText,
  BadgePercent,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cn, formatPropertyChip } from "@/lib/utils";
import type { Property } from "@/types";

export const PropertyCard = ({
  images,
  verifiedText,
  chips,
  title,
  phone,
  location,
  price,
  originalPrice,
  description = "",
  layout = "vertical",
  infoChips,
  nearby = [],
}: Property) => {
  const [liked, setLiked] = useState(false);
  const swiperRef = useRef<SwiperType>(null);

  if (layout === "horizontal") {
    return (
      <div className="relative">
        <span className="absolute -left-2 top-6 z-30 flex items-center gap-1 uppercase rounded-sm bg-black px-2.5 py-2 text-xs font-normal text-white">
          <Zap className="h-3.5 w-3.5" />
          {verifiedText}

        </span>
        <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl sm:flex-row">
          <div className="relative rounded-3xl  h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-72 md:w-80">
            <Image
              src={images[0]}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
              <span></span>
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Save"
                  onClick={() => setLiked((prev) => !prev)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      liked ? "fill-red-500 text-red-500" : "text-primary"
                    )}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Share"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                >
                  <Share2 className="h-4 w-4 text-primary" />
                </button>
                <button
                  type="button"
                  aria-label="Note"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                >
                  <NotebookText className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center text-white justify-evenly gap-2 bg-primary px-5 py-2 text-xs font-normal   sm:text-sm">
              <span>July 2026</span>
              <span className="h-4 w-px bg-white/40" />
              <span>Rera Certificate</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-center pb-2 gap-1.5">

              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-primary/10 text-primary text-xs font-normal px-2 py-.5 border-primary border-[1px]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className='pl-2 border-l-2 border-primary'>
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="text-lg line-clamp-1 font-bold line-h text-gray-900">
                    {title}
                  </h3>
                  <p className=" flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    {location}
                  </p>
                </div>
                <a
                  href={`tel:${phone}`}
                  aria-label="Call"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110"
                >
                  <PhoneCall className="h-4 w-4" />
                </a>
              </div>

            </div>
            <div className="mt-4 rounded-xl border border-gray-200 p-3 bg-primary/10">
              <div className="grid grid-cols-3 divide-x divide-primary/50  ">
                {infoChips?.map((item) => (
                  <div key={item.label} className="px-1 flex text-center items-center justify-center gap-2 first:pl-0 last:pr-0">
                    <Image src={item.Icon} alt={item.label} width={20} height={20} sizes="100vw" className=" w-5 h-6" />
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold text-primary">{item.value}</p>
                      <span className="block text-[10px] text-gray-500">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 col-span-1">
                <div className="relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                    alt="Dealer Image"
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full border-2 border-secondary object-cover"
                  />

                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-1 uppercase text-base  font-normal text-gray-900">
                    Goyal ASSAR
                  </h3>
                  <span className="mt-1 bg-gradient-to-l from-primary to-secondary rounded-sm inline-flex items-center gap-1 rounded-smgrad px-2.5 py-0.5 text-xs font-normal text-white ">
                    Featured Dealer
                  </span>
                </div>
              </div>
              <div className="sm:pl-4 sm:border-l sm:border-gray-200 col-span-2">
                <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  Nearby:
                </p>
                <ul className="flex flex-wrap gap-2">
                  {nearby.map(({ label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 rounded-sm px-3 py-.5 text-[10px] border border-primary/70 bg-primary/20 font-normal text-primary"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-gray-600 line-clamp-1 py-1 px-3 rounded-full border-[2px] border-gray-200">
                Comes with 4 bedrooms, 4 bedrooms, 4 balconies with modular
                kitchen, spacious living and dining area, premium finishing
                throughout.
              </p>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3 sm:mt-3 pt-3 border-t border-gray-200">
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">{price}</span>
                  {originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {originalPrice}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <BadgePercent className="h-8 w-8 shrink-0 text-secondary" />
                  <div className="leading-none">
                    <h4 className="font-semibold text-sm text-secondary">
                      Up to 33L off
                    </h4>
                    <span className="text-xs text-gray-500">
                      Get up to 13% discount
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "vertical") {
    return (
      <div className="group overflow-hidden rounded-2xl p-2 bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-52 rounded-xl w-full overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <span className="flex items-center gap-1 uppercase rounded-full bg-secondary px-2.5 py-1 text-xs font-normal text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>
                {verifiedText}
              </span>
            </span>

            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                aria-label="Save"
                onClick={() => setLiked((prev) => !prev)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    liked ? "fill-red-500 text-red-500" : "text-primary"
                  )}
                />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
              >
                <Share2 className="h-4 w-4 text-primary" />
              </button>
              <button
                type="button"
                aria-label="Note"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
              >
                <NotebookText className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="py-.5 bg-primary/15 px-3 text-[12px] text-primary border-gray-300 rounded-4xl border inline-block">
            {formatPropertyChip(chips)}
          </div>

          <div className="mt-1 flex items-center justify-between gap-1">
            <h3 className="text-lg line-clamp-1 font-bold text-gray-900">{title}</h3>
            <a
              href={`tel:${phone}`}
              aria-label="Call"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110"
            >
              <PhoneCall className="h-4 w-4" />
            </a>
          </div>

          <p className=" flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {location}
          </p>

          <div className="mt-3 rounded-xl border border-gray-200 p-3">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {infoChips?.map((item) => (
                <div key={item.label} className="px-1 flex text-center items-center justify-center gap-2 first:pl-0 last:pr-0">
                  <Image src={item.Icon} alt={item.label} width={20} height={20} sizes="100vw" className=" w-5 h-6" />
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-semibold text-primary">{item.value}</p>
                    <span className="block text-[10px] text-gray-500">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-bold text-primary">{price}</span>
                {originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <BadgePercent className="h-8 w-8 shrink-0 text-secondary" />
                <div className="leading-none">
                  <h4 className="font-semibold text-sm text-secondary">Up to 33L off</h4>
                  <span className="text-xs text-gray-500">Get up to 13% discount</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 rounded-lg bg-primary  px-4 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "mapcard") {
    return (
      <div className=" overflow-hidden w-[220px] rounded-md bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-28 w-full overflow-hidden">
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{ clickable: true }}
            className="h-full w-full mapcard-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="relative h-full w-full">
                <Image
                  src={img}
                  alt={`${title} - ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 "
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft className="h-3 w-3 text-gray-800" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight className="h-3 w-3 text-gray-800" />
          </button>
        </div>

        <div className="p-2 flex flex-col gap-0 ">

          <div >
            <span className="py-.5 pt-0 bg-primary/15 px-2 text-[10px] text-primary border-gray-300 rounded-4xl border">{formatPropertyChip(chips)} </span>
          </div>
          <div>
            <h3 className="text-[14px] line-clamp-1 font-medium text-gray-900">{title}</h3>
            <div className=" flex items-center gap-1 ">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="text-[11px] line-clamp-1 text-gray-500">{location}</span>
            </div>
          </div>

          <div className="mt-2">
            <button
              type="button"
              className="flex w-full justify-center items-center gap-1 rounded-sm bg-primary px-2 py-1 text-xs font-normal text-white transition-transform"
            >
              <span className="text-[10px]">View Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }


};
