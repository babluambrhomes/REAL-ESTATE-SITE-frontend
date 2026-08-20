'use client'

import { useEffect, useRef, useState } from 'react'
import { BlogSection } from "@/components/home/BlogSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { HappyClients } from "@/components/home/HappyClients";
import { Heading } from "@/components/home/Heading";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeChip } from "@/components/home/HomeChip";
import { SearchBox } from "@/components/home/SearchBox";
import { TopAgents } from "@/components/home/TopAgents";
import { VideoSlider } from "@/components/home/VideoSlider";
import { Footer } from "@/components/layout/Footer";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SearchHeader } from "@/components/layout/SearchHeader";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const [showSearchHeader, setShowSearchHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBoxRef.current) return
      const rect = searchBoxRef.current.getBoundingClientRect()
      setShowSearchHeader(rect.bottom <= 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
    
  }, [])

  return (
    <>
      <div className={`transition-opacity duration-300 ${showSearchHeader ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SimpleHeader />
      </div>
      <div className={`transition-opacity duration-300 ${showSearchHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <SearchHeader />
      </div>

      <main>
        <HeroSlider />
        <SearchBox ref={searchBoxRef} />
        <HomeChip />
        <Link href='' className="w-full inline-block px-6 py-12 sm:px-10">
          <Image src="/banner/roofin-banner.png" sizes="100vw" alt="roofing-banner" width={100} height={100} className="w-full h-full object-contain" />
        </Link>
        <Heading
          title1="Featured"
          title2="Properties"
          subtitle="Discover our curated selection of featured properties"
        />
        <FeaturedProperties />
        <Heading
          title1="Latest"
          title2="View"
        />
        <FeaturedProperties />
        <Heading
          title1="Top"
          title2="Agents"
          subtitle="Connect with our trusted real estate experts"
        />
        <TopAgents />
        <Heading
          title1="Explore Projects"
          title2="Through Video"
          subtitle="Watch walkthroughs and project tours"
        />
        <VideoSlider />
        <Heading
          title1="Happy"
          title2="Clients"
          subtitle="What our customers say about us"
        />
        <HappyClients />
        <Heading
          title1="Latest"
          title2="Blogs"
          subtitle="Insights and tips from our real estate experts"
        />
        <BlogSection />
      </main>
      
      <Footer />
    </>
  );
}
