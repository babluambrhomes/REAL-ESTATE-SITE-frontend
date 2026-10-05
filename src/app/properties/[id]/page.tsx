"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PropertyDetailTopBar } from "@/components/property-detail/PropertyDetailTopBar";
import { PropertyDetailHero } from "@/components/property-detail/PropertyDetailHero";
import { PropertyDetailBuilderAndDealer } from "@/components/property-detail/PropertyDetailBuilderAndDealer";
import { PropertyDetailAboutAndAmenities } from "@/components/property-detail/PropertyDetailAboutAndAmenities";
import { PropertyDetailFloorPlanAndHighlights } from "@/components/property-detail/PropertyDetailFloorPlanAndHighlights";
import { PropertyDetailWhyRoofinAndBankOffers } from "@/components/property-detail/PropertyDetailWhyRoofinAndBankOffers";
import { PropertyDetailFAQAndSuggestions } from "@/components/property-detail/PropertyDetailFAQAndSuggestions";
import { properties } from "@/data/properties";
import { Property } from "@/types";

export default function PropertyDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Lookup property by id or fallback to first property
  const propertyIndex = typeof params?.id === "string" ? parseInt(params.id) : 0;
  const property: Property =
    !isNaN(propertyIndex) && properties[propertyIndex]
      ? properties[propertyIndex]
      : properties[0];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(tabId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFD] pb-16">
      {/* 1. Top Notice, SearchHeader, Sub Tabs & Breadcrumb */}
      <PropertyDetailTopBar
        propertyTitle={property.title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 2. Main Page Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        {/* Hero Gallery & Property Info Specs (Screenshot 1) */}
        <PropertyDetailHero
          property={property}
          onOpenGallery={() => alert("Photo Gallery Modal")}
          onOpenVideo={() => alert("Video Tour Modal")}
        />

        {/* Builder Profile & Dealer Enquiry Form (Screenshot 2) */}
        <PropertyDetailBuilderAndDealer />

        {/* About Property, Furnishing Grid & Society (Screenshot 3 & 4) */}
        <PropertyDetailAboutAndAmenities />

        {/* Floor Plan & Location Advantages (Screenshot 4 & 5) */}
        <PropertyDetailFloorPlanAndHighlights />

        {/* Why Roofin, Bank Offers & Price Trend Graph (Screenshot 5) */}
        <PropertyDetailWhyRoofinAndBankOffers />

        {/* FAQs, Suggestion 3-Card Grid & Have Questions Banner (Screenshot 6) */}
        <PropertyDetailFAQAndSuggestions />
      </div>
    </main>
  );
}
