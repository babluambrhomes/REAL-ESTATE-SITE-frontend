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
  KeyRound,
  FileCheck,
  HardHat,
  Ruler,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  image: string;
 
  verifiedText: string;
  chips: string[];
  title: string;
  phone: string;
  location: string;
  price: string;
  originalPrice?: string;
  discount?: string;
};

export const PropertyCard = ({
  image,
  
  verifiedText,
  chips,
  title,
  phone,
  location,
  price,
  originalPrice,
}: PropertyCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl p-2 bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 rounded-xl w-full overflow-hidden">
        <Image
          src={image}
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
        <div className="flex flex-wrap items-center gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-primary/10 text-primary text-xs font-normal px-2 py-.5  border-primary border-[1px]"
            >
              {chip}
            </span>
          ))}
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
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {[
              { value: "Ready", label: "To Move", Icon: KeyRound },
              { value: "Rera", label: "Register", Icon: FileCheck },
              { value: "60%", label: "Completion", Icon: HardHat },
              { value: "300-400", label: "Sq.Ft.", Icon: Ruler },
            ].map((item) => (
              <div key={item.label} className="px-1 flex text-center justify-center gap-2 first:pl-0 last:pr-0">
                <item.Icon className="h-5 w-5 shrink-0 text-secondary" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-bold text-primary">{item.value}</p>
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
};
