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
import { Header } from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <SearchBox />
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
        // subtitle="Discover our curated selection of featured properties"
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
