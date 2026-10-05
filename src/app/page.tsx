"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BlogSection } from "@/components/home/BlogSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { HappyClients } from "@/components/home/HappyClients";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeChip } from "@/components/home/HomeChip";
import { SearchBox } from "@/components/home/SearchBox";
import { TopAgents } from "@/components/home/TopAgents";
import { VideoSlider } from "@/components/home/VideoSlider";
import { ExclusiveNewLaunches } from "@/components/home/ExclusiveNewLaunches";
import { CompoundProperties } from "@/components/home/CompoundProperties";
import { ExploreLifestyle } from "@/components/home/ExploreLifestyle";
import { TopCities } from "@/components/home/TopCities";
import { GroupDealBanner } from "@/components/home/GroupDealBanner";
import { HandpickedProperties } from "@/components/home/HandpickedProperties";
import { PropertyCtaBanner } from "@/components/home/PropertyCtaBanner";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [showSearchHeader, setShowSearchHeader] = useState(false);
  const location_query = useAppSelector((state) => state.location.coordinates);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBoxRef.current) return;
      const rect = searchBoxRef.current.getBoundingClientRect();
      setShowSearchHeader(rect.bottom <= 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Floating Simple Header */}
      <div
        className={`transition-opacity duration-300 ${
          showSearchHeader ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <SimpleHeader />
      </div>

      {/* Scrolled Search Header */}
      <div
        className={`transition-opacity duration-300 ${
          showSearchHeader ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <SearchHeader />
      </div>

      <main className="min-h-screen bg-[#fafbfc]">
        {/* 1. Hero Section */}
        <HeroSlider />

        {/* 2. Abstract Background Wrapper covering Category Chips & Exclusive New Launches */}
        <div className="relative w-full z-20">
          {/* Abstract Wave Mesh Background Image (Soft faded) */}
          <div className="absolute inset-x-0 top-20 sm:top-24 bottom-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="/layout/abstract_bg.jpg"
              alt="Abstract background"
              fill
              priority
              className="object-cover object-top opacity-25"
            />
            {/* Soft gradient overlay for subtle aesthetic fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />
          </div>

          {/* Floating Search Box (Floats Half Over Hero Banner) */}
          <SearchBox ref={searchBoxRef} />

          {/* Category Chips */}
          <HomeChip />

          {/* Exclusive New Launches */}
          <ExclusiveNewLaunches />
        </div>

        {/* 5. Fast Selling Properties */}
        <FeaturedProperties title1="Fast Selling" title2="Properties" />

        {/* 6. Properties Section */}
        <CompoundProperties />

        {/* 7. Explore by Lifestyle */}
        <ExploreLifestyle />

        {/* 8. Top Cities in Delhi NCR */}
        <TopCities />

        {/* 9. Latest View */}
        <FeaturedProperties title1="Latest" title2="View" />

        {/* 10. Meet Our Trusted Agents & Builder */}
        <TopAgents />

        {/* 11. Explore Projects Through Video */}
        <VideoSlider />

        {/* 12. Exclusive Group Deal Banner */}
        <GroupDealBanner />

        {/* 13. Handpicked by Roofin */}
        <HandpickedProperties />

        {/* 14. Happy Clients */}
        <HappyClients />

        {/* 15. Latest Blogs */}
        <BlogSection />

        {/* 16. Property CTA Banner (Find the Perfect Property for Your Future) */}
        <PropertyCtaBanner />
      </main>
    </>
  );
}
