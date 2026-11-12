"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export interface PriceDroppedItem {
  id: number | string;
  slug?: string;
  title: string;
  location: string;
  oldPrice: string;
  newPrice: string;
  saveAmount: string;
  image: string;
}

export const LEFT_COLUMN_ITEMS: PriceDroppedItem[] = [
  {
    id: "the-terraces-at-max-estate",
    slug: "the-terraces-at-max-estate",
    title: "The Terraces at Max Estate",
    location: "Sector 103, Noida Ext",
    oldPrice: "₹1.35 Cr",
    newPrice: "₹1.25 Cr",
    saveAmount: "₹10L",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "ats-pristine-150",
    slug: "ats-pristine-150",
    title: "ATS Pristine Tower B",
    location: "Sector 150, Noida",
    oldPrice: "₹1.80 Cr",
    newPrice: "₹1.65 Cr",
    saveAmount: "₹15L",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "nbcc-aspire-silicon",
    slug: "nbcc-aspire-silicon",
    title: "NBCC Aspire Silicon City",
    location: "Sector 76, Central Noida",
    oldPrice: "₹1.42 Cr",
    newPrice: "₹1.28 Cr",
    saveAmount: "₹14L",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "stellar-one-kp",
    slug: "stellar-one-kp",
    title: "Stellar One Luxury Suites",
    location: "Knowledge Park, Gr. Noida",
    oldPrice: "₹92 Lakh",
    newPrice: "₹82.5 Lakh",
    saveAmount: "₹9.5L",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=85",
  },
];

export const RIGHT_COLUMN_ITEMS: PriceDroppedItem[] = [
  {
    id: "ats-knightsbridge-exp",
    slug: "ats-knightsbridge-exp",
    title: "ATS Knightsbridge Grand",
    location: "Sector 124, Noida Expressway",
    oldPrice: "₹2.70 Cr",
    newPrice: "₹2.45 Cr",
    saveAmount: "₹25L",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "purvanchal-royal-city",
    slug: "purvanchal-royal-city",
    title: "Purvanchal Royal City",
    location: "Chi V, Greater Noida",
    oldPrice: "₹1.50 Cr",
    newPrice: "₹1.35 Cr",
    saveAmount: "₹15L",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "gaur-yamuna-city",
    slug: "gaur-yamuna-city",
    title: "Gaur Yamuna Lakeview",
    location: "Yamuna Expressway, Gr. Noida",
    oldPrice: "₹75 Lakh",
    newPrice: "₹65.4 Lakh",
    saveAmount: "₹9.6L",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "m3m-capital-dwarka",
    slug: "m3m-capital-dwarka",
    title: "M3M Capital Golf Residences",
    location: "Sector 113, Dwarka Expressway",
    oldPrice: "₹2.10 Cr",
    newPrice: "₹1.88 Cr",
    saveAmount: "₹22L",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=85",
  },
];

export const ALL_PRICE_DROPPED_ITEMS: PriceDroppedItem[] = [
  ...LEFT_COLUMN_ITEMS,
  ...RIGHT_COLUMN_ITEMS,
];

export const ListingsPriceDropped = () => {
  return (
    <div className="w-full my-8">
      {/* Header Matching Figma 1:1 */}
      <div className="mb-5">
        <h3 className="text-[24px] sm:text-[26px] font-bold tracking-tight text-[#0B132B]">
          Price Dropped
        </h3>
        <p className="mt-1 text-[13.5px] sm:text-[14px] text-[#64748B]">
          Properties Where Sellers Have Reduced Their Asking Price
        </p>
      </div>

      {/* 2-Column Cards Grid matching Figma 1:1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column Box */}
        <div className="rounded-[22px] border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 sm:space-y-5">
          {LEFT_COLUMN_ITEMS.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={`/properties/${item.slug || item.id}`}
              className="flex items-center justify-between gap-3 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Thumbnail Image */}
                <div className="relative h-[60px] w-[78px] sm:h-[64px] sm:w-[82px] shrink-0 overflow-hidden rounded-[10px] bg-slate-100 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="90px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Property Info */}
                <div className="min-w-0">
                  <h4 className="text-[13.5px] sm:text-[14px] font-bold text-[#0B132B] truncate group-hover:text-[#1865F2] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="flex items-center gap-1 text-[11.5px] text-[#64748B] mt-0.5 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#1865F2]" />
                    <span className="truncate">{item.location}</span>
                  </p>
                  <p className="text-[12.5px] mt-0.5">
                    <span className="line-through text-[#64748B] font-normal text-[12px]">{item.oldPrice}</span>
                    <span className="text-[#64748B] font-medium mx-1.5">→</span>
                    <span className="font-bold text-[#0B132B]">{item.newPrice}</span>
                  </p>
                </div>
              </div>

              {/* Save Badge */}
              <div className="shrink-0 rounded-[6px] border border-[#00BA7A]/30 bg-[#E8F8F0] px-2.5 py-1 text-center min-w-[50px]">
                <span className="block text-[10px] font-medium text-[#00BA7A] leading-none">
                  Save
                </span>
                <span className="block text-[11px] font-bold text-[#00BA7A] leading-tight mt-0.5">
                  {item.saveAmount}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Column Box */}
        <div className="rounded-[22px] border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 sm:space-y-5">
          {RIGHT_COLUMN_ITEMS.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={`/properties/${item.slug || item.id}`}
              className="flex items-center justify-between gap-3 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Thumbnail Image */}
                <div className="relative h-[60px] w-[78px] sm:h-[64px] sm:w-[82px] shrink-0 overflow-hidden rounded-[10px] bg-slate-100 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="90px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Property Info */}
                <div className="min-w-0">
                  <h4 className="text-[13.5px] sm:text-[14px] font-bold text-[#0B132B] truncate group-hover:text-[#1865F2] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="flex items-center gap-1 text-[11.5px] text-[#64748B] mt-0.5 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#1865F2]" />
                    <span className="truncate">{item.location}</span>
                  </p>
                  <p className="text-[12.5px] mt-0.5">
                    <span className="line-through text-[#64748B] font-normal text-[12px]">{item.oldPrice}</span>
                    <span className="text-[#64748B] font-medium mx-1.5">→</span>
                    <span className="font-bold text-[#0B132B]">{item.newPrice}</span>
                  </p>
                </div>
              </div>

              {/* Save Badge */}
              <div className="shrink-0 rounded-[6px] border border-[#00BA7A]/30 bg-[#E8F8F0] px-2.5 py-1 text-center min-w-[50px]">
                <span className="block text-[10px] font-medium text-[#00BA7A] leading-none">
                  Save
                </span>
                <span className="block text-[11px] font-bold text-[#00BA7A] leading-tight mt-0.5">
                  {item.saveAmount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
