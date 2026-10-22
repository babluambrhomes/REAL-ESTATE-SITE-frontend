"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BlogItem {
  id: number;
  type: "invest" | "commercial" | "guide";
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  href?: string;
}

export const BlogCard = ({
  type,
  title,
  subtitle,
  date,
  description,
  href = "/blogs",
}: BlogItem) => {
  return (
    <div className="flex flex-col w-full group">
      {/* Top Banner Graphic (1:1 Exact Figma Image & Layout) */}
      <div className="relative w-full h-[220px] sm:h-[240px] md:h-[255px] overflow-hidden rounded-[20px] shadow-sm">
        {type === "invest" ? (
          <>
            {/* High-res Figma Asset */}
            <Image
              src="/images/blogs/blog_banner_invest.png"
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              priority
              unoptimized
            />

            {/* Overlaid Typography & Brand on Left */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 max-w-[62%] sm:max-w-[58%] select-none">
              <div>
                {/* Roofin Logo with Yellow Accent */}
                <div className="flex items-center">
                  <span className="text-[20px] sm:text-[23px] font-black tracking-tight text-white font-sans">
                    Roofin
                  </span>
                  <span className="h-2 w-2 bg-[#F59E0B] rounded-xs -mt-2.5 ml-0.5" />
                </div>

                {/* Main Headline */}
                <h3 className="mt-2 text-[18px] sm:text-[22px] font-black leading-tight text-white drop-shadow-xs">
                  {title}
                </h3>

                {/* Subtitle */}
                {subtitle && (
                  <p className="mt-1 text-[11px] sm:text-[12.5px] text-white/95 font-medium leading-snug line-clamp-2">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Date Badge */}
              <div>
                <span className="inline-block rounded-[5px] bg-[#001D4A]/55 backdrop-blur-xs px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white">
                  {date}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* High-res Figma Asset */}
            <Image
              src="/images/blogs/blog_banner_commercial.png"
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              priority
              unoptimized
            />

            {/* Overlaid Typography & Date */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 max-w-[65%] sm:max-w-[60%] select-none">
              <div>
                <h3 className="text-[17px] sm:text-[21px] font-black leading-snug text-white drop-shadow-xs">
                  {title}
                </h3>
              </div>

              {/* Date Badge */}
              <div>
                <span className="inline-block rounded-[5px] bg-[#001D4A]/55 backdrop-blur-xs px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white">
                  {date}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Title & Description Below Image */}
      <h4 className="mt-4 text-[16px] sm:text-[17.5px] font-bold text-[#000000] leading-snug line-clamp-2">
        {description}
      </h4>

      {/* Read More Pill Button (1:1 Figma Match) */}
      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full border border-[#2563EB] bg-white hover:bg-blue-50/70 px-7 py-2.5 text-[14.5px] sm:text-[15px] font-bold text-[#2563EB] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          <span>Read more</span>
        </Link>
      </div>
    </div>
  );
};
