"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { useAppSelector } from "@/store/hooks";
import { LazySection } from "@/components/common/LazySection";

// Statically imported for immediate above-the-fold first paint
import { HeroSlider } from "@/components/home/HeroSlider";
import { SearchBox } from "@/components/home/SearchBox";
import { HomeChip } from "@/components/home/HomeChip";
import { ExclusiveNewLaunches } from "@/components/home/ExclusiveNewLaunches";

// Lazy-loaded dynamic imports for below-the-fold sections
const FeaturedProperties = dynamic(
  () => import("@/components/home/FeaturedProperties").then((mod) => mod.FeaturedProperties),
  { ssr: false }
);
const CompoundProperties = dynamic(
  () => import("@/components/home/CompoundProperties").then((mod) => mod.CompoundProperties),
  { ssr: false }
);
const ExploreLifestyle = dynamic(
  () => import("@/components/home/ExploreLifestyle").then((mod) => mod.ExploreLifestyle),
  { ssr: false }
);
const TopCities = dynamic(
  () => import("@/components/home/TopCities").then((mod) => mod.TopCities),
  { ssr: false }
);
const TopAgents = dynamic(
  () => import("@/components/home/TopAgents").then((mod) => mod.TopAgents),
  { ssr: false }
);
const VideoSlider = dynamic(
  () => import("@/components/home/VideoSlider").then((mod) => mod.VideoSlider),
  { ssr: false }
);
const GroupDealBanner = dynamic(
  () => import("@/components/home/GroupDealBanner").then((mod) => mod.GroupDealBanner),
  { ssr: false }
);
const HandpickedProperties = dynamic(
  () => import("@/components/home/HandpickedProperties").then((mod) => mod.HandpickedProperties),
  { ssr: false }
);
const HappyClients = dynamic(
  () => import("@/components/home/HappyClients").then((mod) => mod.HappyClients),
  { ssr: false }
);
const BlogSection = dynamic(
  () => import("@/components/home/BlogSection").then((mod) => mod.BlogSection),
  { ssr: false }
);
const PropertyCtaBanner = dynamic(
  () => import("@/components/home/PropertyCtaBanner").then((mod) => mod.PropertyCtaBanner),
  { ssr: false }
);

export default function Home() {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [showSearchHeader, setShowSearchHeader] = useState(false);
  const location_query = useAppSelector((state) => state.location.coordinates);

  useEffect(() => {
    let ticking = false;

    const checkPosition = () => {
      if (!searchBoxRef.current) return;
      const rect = searchBoxRef.current.getBoundingClientRect();
      const shouldShow = rect.bottom <= 0;
      setShowSearchHeader((prev) => (prev !== shouldShow ? shouldShow : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkPosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    checkPosition();

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
        {/* 1. Hero Section (Immediate) */}
        <HeroSlider />

        {/* 2 & 3. Abstract Background Wrapper covering Category Chips & Exclusive New Launches (Immediate) */}
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

        {/* 5. Fast Selling Properties (Lazy Loaded on Scroll) */}
        <LazySection minHeight="420px" skeletonType="cards">
          <FeaturedProperties title1="Fast Selling" title2="Properties" />
        </LazySection>

        {/* 6. Properties Section (Lazy Loaded on Scroll) */}
        <LazySection minHeight="440px" skeletonType="grid">
          <CompoundProperties />
        </LazySection>

        {/* 7. Explore by Lifestyle (Lazy Loaded on Scroll) */}
        <LazySection minHeight="380px" skeletonType="cards">
          <ExploreLifestyle />
        </LazySection>

        {/* 8. Top Cities in Delhi NCR (Lazy Loaded on Scroll) */}
        <LazySection minHeight="360px" skeletonType="cards">
          <TopCities />
        </LazySection>

        {/* 9. Latest View (Lazy Loaded on Scroll) */}
        <LazySection minHeight="420px" skeletonType="cards">
          <FeaturedProperties title1="Latest" title2="View" />
        </LazySection>

        {/* 10. Meet Our Trusted Agents & Builder (Lazy Loaded on Scroll) */}
        <LazySection minHeight="400px" skeletonType="cards">
          <TopAgents />
        </LazySection>

        {/* 11. Explore Projects Through Video (Lazy Loaded on Scroll) */}
        <LazySection minHeight="380px" skeletonType="cards">
          <VideoSlider />
        </LazySection>

        {/* 12. Exclusive Group Deal Banner (Lazy Loaded on Scroll) */}
        <LazySection minHeight="260px" skeletonType="banner">
          <GroupDealBanner />
        </LazySection>

        {/* 13. Handpicked by Roofin (Lazy Loaded on Scroll) */}
        <LazySection minHeight="420px" skeletonType="cards">
          <HandpickedProperties />
        </LazySection>

        {/* 14. Happy Clients (Lazy Loaded on Scroll) */}
        <LazySection minHeight="380px" skeletonType="cards">
          <HappyClients />
        </LazySection>

        {/* 15. Latest Blogs (Lazy Loaded on Scroll) */}
        <LazySection minHeight="400px" skeletonType="cards">
          <BlogSection />
        </LazySection>

        {/* 16. Property CTA Banner (Lazy Loaded on Scroll) */}
        <LazySection minHeight="240px" skeletonType="banner">
          <PropertyCtaBanner />
        </LazySection>
      </main>
    </>
  );
}
