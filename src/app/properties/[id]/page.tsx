"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { PropertyDetailTopBar } from "@/components/property-detail/PropertyDetailTopBar";
import { PropertyDetailHero } from "@/components/property-detail/PropertyDetailHero";
import { PropertyDetailBuilderAndDealer } from "@/components/property-detail/PropertyDetailBuilderAndDealer";
import { PropertyDetailAboutAndAmenities } from "@/components/property-detail/PropertyDetailAboutAndAmenities";
import { PropertyDetailFloorPlanAndHighlights } from "@/components/property-detail/PropertyDetailFloorPlanAndHighlights";
import { PropertyDetailWhyRoofinAndBankOffers } from "@/components/property-detail/PropertyDetailWhyRoofinAndBankOffers";
import { PropertyDetailFAQAndSuggestions } from "@/components/property-detail/PropertyDetailFAQAndSuggestions";
import { PropertyGalleryModal } from "@/components/property-detail/PropertyGalleryModal";
import { PropertyVideoModal } from "@/components/property-detail/PropertyVideoModal";
import { properties } from "@/data/properties";
import type { Property } from "@/types";
import { usePropertyDetailQuery } from "@/lib/features/property/propertyHooks";
import { mapApiPropertyToUi } from "@/lib/features/property/propertyAdapter";

export default function PropertyDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const paramId = typeof params?.id === "string" ? params.id : "";
  const numericId = parseInt(paramId);

  // Fetch live property details from backend API by slug or ID
  const { data: detailData, isLoading: isDetailLoading } = usePropertyDetailQuery(paramId);

  // Adapt live API data to UI Property model
  const apiAdaptedProperty = useMemo(() => {
    if (!detailData?.data) return null;
    return mapApiPropertyToUi(detailData.data);
  }, [detailData]);

  // Lookup property by live API, fallback to numeric id / static properties
  const property: Property =
    apiAdaptedProperty ||
    properties.find((p) => String(p.id) === paramId || p.slug === paramId) ||
    (!isNaN(numericId) && properties[numericId] ? properties[numericId] : properties[0]);

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

  if (isDetailLoading && !apiAdaptedProperty) {
    return (
      <main className="min-h-screen bg-[#FAFBFD] pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 space-y-6">
          <div className="h-10 w-64 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-[420px] w-full rounded-3xl bg-slate-200 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 h-80 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="lg:col-span-4 h-80 rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

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
        {/* Hero Gallery & Property Info Specs */}
        <PropertyDetailHero
          property={property}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenVideo={() => setIsVideoOpen(true)}
        />

        {/* Builder Profile & Dealer Enquiry Form */}
        <PropertyDetailBuilderAndDealer
          seller={property.seller}
          propertyId={property.id ? String(property.id) : undefined}
          propertyTitle={property.title}
        />

        {/* About Property, Furnishing Grid & Society */}
        <PropertyDetailAboutAndAmenities
          description={property.description}
          amenities={property.amenities}
        />

        {/* Floor Plan & Location Advantages */}
        <PropertyDetailFloorPlanAndHighlights
          variants={property.variants}
        />

        {/* Why Roofin, Bank Offers & Price Trend Graph */}
        <PropertyDetailWhyRoofinAndBankOffers />

        {/* FAQs, Suggestion 3-Card Grid & Have Questions Banner */}
        <PropertyDetailFAQAndSuggestions />
      </div>

      {/* Interactive Photo Gallery Lightbox */}
      <PropertyGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.images}
        title={property.title}
      />

      {/* Interactive Video Tour Modal */}
      <PropertyVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={`${property.title} - Video Tour`}
        videoUrl={property.videoUrl}
      />
    </main>
  );
}
