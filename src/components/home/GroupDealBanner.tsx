"use client";

import Image from "next/image";
import Link from "next/link";

export const GroupDealBanner = () => {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[20px] shadow-2xl transition-transform duration-300 hover:scale-[1.005]">
        {/* Full 1:1 High-Fidelity Figma Banner Render */}
        <div className="relative w-full aspect-[1748/582] min-h-[220px] sm:min-h-[340px] lg:min-h-[440px]">
          <Image
            src="/banner/exclusive-group-deal-banner.png"
            alt="Exclusive Group Deal For Only 20 Units - Roofin"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Interactive Click Overlays */}
        {/* 1. Direct Clickable CTA Button Hotspot on 'I'M INTERESTED' */}
        <Link
          href="/properties"
          aria-label="I'm Interested in Exclusive Group Deal"
          className="absolute left-[3.2%] bottom-[8.5%] w-[19%] h-[15%] rounded-[14px] cursor-pointer hover:bg-white/10 transition-colors z-20"
        />

        {/* 2. Direct Clickable Hotspot on Spec Card */}
        <Link
          href="/properties"
          aria-label="View Aspire Silicon City property"
          className="absolute left-[26%] top-[34%] w-[20%] h-[24%] rounded-[14px] cursor-pointer hover:bg-white/10 transition-colors z-20"
        />

        {/* 3. Full Banner Click Fallback */}
        <Link
          href="/properties"
          aria-label="Exclusive Group Deal"
          className="absolute inset-0 z-10"
        />
      </div>
    </section>
  );
};
