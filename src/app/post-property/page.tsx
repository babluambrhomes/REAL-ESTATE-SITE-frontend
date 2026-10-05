import type { Metadata } from "next";
import { PostPropertyTopAnnouncement } from "@/components/post-property/PostPropertyTopAnnouncement";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { PostPropertyHero } from "@/components/post-property/PostPropertyHero";
import { PostPropertyWorkFlow } from "@/components/post-property/PostPropertyWorkFlow";
import { PostPropertyWhySell } from "@/components/post-property/PostPropertyWhySell";
import { PostPropertyDashboardBanner } from "@/components/post-property/PostPropertyDashboardBanner";
import { PostPropertyHub } from "@/components/post-property/PostPropertyHub";
import { PostPropertyFAQ } from "@/components/post-property/PostPropertyFAQ";

export const metadata: Metadata = {
  title: "Post Property Free - Sell & Rent Properties with Roofin",
  description:
    "Post your property for free on Roofin. Connect with verified buyers and tenants, manage leads with dedicated dashboard, and sell faster.",
};

export default function PostPropertyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Notification / Announcement Banner */}
      <PostPropertyTopAnnouncement />

      {/* Top Search Header */}
      <SearchHeader hasAnnouncement={true} />

      {/* Hero with Interactive Quick Form & Stats */}
      <PostPropertyHero />

      {/* How Does Roofin work 5-step Flow */}
      <PostPropertyWorkFlow />

      {/* Why Sell with Roofin (Cards, Donut Chart & Help Grid) */}
      <PostPropertyWhySell />

      {/* Powerful Dashboard Showcase for Smart Seller */}
      <PostPropertyDashboardBanner />

      {/* Buy, Sell & Rent All in One Place Hub */}
      <PostPropertyHub />

      {/* Frequently Asked Questions */}
      <PostPropertyFAQ />
    </main>
  );
}
