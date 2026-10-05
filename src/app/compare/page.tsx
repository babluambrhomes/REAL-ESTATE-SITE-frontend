"use client";

import { useState } from "react";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { PostPropertyTopAnnouncement } from "@/components/post-property/PostPropertyTopAnnouncement";
import { CompareHero } from "@/components/compare/CompareHero";
import { CompareCtaBanner } from "@/components/compare/CompareCtaBanner";
import { CompareFeatureStrip } from "@/components/compare/CompareFeatureStrip";
import { CompareHowItWorks } from "@/components/compare/CompareHowItWorks";
import { CompareWhySection } from "@/components/compare/CompareWhySection";
import { CompareByBuilder } from "@/components/compare/CompareByBuilder";
import { CompareLikedPairs, ComparePair } from "@/components/compare/CompareLikedPairs";
import { CompareModal } from "@/components/compare/CompareModal";
import { ComparePropertyPickerModal } from "@/components/compare/ComparePropertyPickerModal";
import { Footer } from "@/components/layout/Footer";
import { properties as allProperties } from "@/data/properties";
import { Property } from "@/types";

export default function ComparePage() {
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);

  // Initial comparison pair matching screenshots (The Terraces at Max vs ATS Knightsbridge)
  const [comparedProperties, setComparedProperties] = useState<Property[]>([
    allProperties[0] || {
      images: ["/images/properties/villa-popular-figma.jpg"],
      verifiedText: "Verified Deal",
      chips: ["3 BHK Apartments"],
      infoChips: [
        { value: "3,200", label: "Sq. Ft", Icon: "/icon/location.png" },
        { value: "60%", label: "Amenities", Icon: "/icon/Frame.svg" },
        { value: "Ready", label: "To Move", Icon: "/icon/Group.svg" },
      ],
      title: "The Terraces at Max Estate 361",
      phone: "+91 98765 43210",
      location: "Sector 124, Noida",
      price: "₹1.25 Cr",
      originalPrice: "₹1.58 Cr",
      city: "Noida",
      type: "Apartment",
      beds: "3",
    },
    allProperties[1] || {
      images: ["/images/properties/tower-popular-figma.jpg"],
      verifiedText: "Verified Deal",
      chips: ["4 BHK Apartments"],
      infoChips: [
        { value: "4,500", label: "Sq. Ft", Icon: "/icon/location.png" },
        { value: "60%", label: "Amenities", Icon: "/icon/Frame.svg" },
        { value: "Ready", label: "To Move", Icon: "/icon/Group.svg" },
      ],
      title: "ATS Knightsbridge",
      phone: "+91 98765 43210",
      location: "Sector 124, Noida",
      price: "₹1.58 Cr",
      originalPrice: "₹1.95 Cr",
      city: "Noida",
      type: "Apartment",
      beds: "4",
    },
  ]);

  const handleAddProperty = () => {
    setIsPickerModalOpen(true);
  };

  const handleSelectProperty = (newProp: Property) => {
    setComparedProperties((prev) => {
      if (prev.some((p) => p.title === newProp.title)) return prev;
      if (prev.length >= 3) {
        return [...prev.slice(0, 2), newProp];
      }
      return [...prev, newProp];
    });
    setIsCompareModalOpen(true);
  };

  const handleRemoveProperty = (indexToRemove: number) => {
    setComparedProperties((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleComparePair = (pair: ComparePair) => {
    const prop1Obj: Property = {
      images: [pair.prop1.image],
      verifiedText: "Verified Deal",
      chips: [pair.prop1.bhk],
      infoChips: [
        { value: pair.prop1.area, label: "Sq. Ft", Icon: "/icon/location.png" },
        { value: "60%", label: "Amenities", Icon: "/icon/Frame.svg" },
        { value: pair.prop1.status, label: "Status", Icon: "/icon/Group.svg" },
      ],
      title: pair.prop1.title,
      phone: "+91 98765 43210",
      location: pair.prop1.location,
      price: pair.prop1.price,
      city: "Noida",
      type: "Apartment",
      beds: "3",
    };

    const prop2Obj: Property = {
      images: [pair.prop2.image],
      verifiedText: "Verified Deal",
      chips: [pair.prop2.bhk],
      infoChips: [
        { value: pair.prop2.area, label: "Sq. Ft", Icon: "/icon/location.png" },
        { value: "60%", label: "Amenities", Icon: "/icon/Frame.svg" },
        { value: pair.prop2.status, label: "Status", Icon: "/icon/Group.svg" },
      ],
      title: pair.prop2.title,
      phone: "+91 98765 43210",
      location: pair.prop2.location,
      price: pair.prop2.price,
      city: "Noida",
      type: "Apartment",
      beds: "4",
    };

    setComparedProperties([prop1Obj, prop2Obj]);
    setIsCompareModalOpen(true);
  };

  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <main className="min-h-screen bg-white font-jakarta">
      {/* 1. Top Announcement Bar */}
      {showAnnouncement && (
        <PostPropertyTopAnnouncement onClose={() => setShowAnnouncement(false)} />
      )}

      {/* 2. Top Header Navigation */}
      <div className="relative z-40">
        <SimpleHeader variant="compare" hasAnnouncement={showAnnouncement} />
      </div>

      {/* Spacer for fixed SimpleHeader */}
      <div className={showAnnouncement ? "h-24 sm:h-28" : "h-16 sm:h-20"} />

      {/* 3. Hero Section (Heading, Description, ADD PROPERTY, Experts, Overlapping Property Cards) */}
      <CompareHero onAddProperty={() => setIsPickerModalOpen(true)} />

      {/* 4. Ready To Explore Dark Navy CTA Banner */}
      <CompareCtaBanner onStartComparing={() => setIsCompareModalOpen(true)} />

      {/* 5. 4-Feature Icons Strip (Compare Details, Save Time, Confident Decisions, Share with Family) */}
      <CompareFeatureStrip />

      {/* 6. How It Works Section (4 Simple Steps + Highlighted Card Visual) */}
      <CompareHowItWorks onStartComparing={() => setIsCompareModalOpen(true)} />

      {/* 7. Why Compare on Roofin (See The Biggest Picture 4 Cards Grid) */}
      <CompareWhySection />

      {/* 8. Compare By Builder (DLF, Godrej, Tata, ATS, Sobha) */}
      <CompareByBuilder />

      {/* 9. Compare What You Have Liked (2x2 Dual Property Cards with Compare ↗ Action) */}
      <CompareLikedPairs onComparePair={handleComparePair} />

      {/* 10. Interactive Side-By-Side Comparison Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedProperties={comparedProperties}
        onAddProperty={() => setIsPickerModalOpen(true)}
        onRemoveProperty={handleRemoveProperty}
      />

      {/* 11. Property Selection Picker Modal */}
      <ComparePropertyPickerModal
        isOpen={isPickerModalOpen}
        onClose={() => setIsPickerModalOpen(false)}
        properties={allProperties}
        onSelectProperty={handleSelectProperty}
        selectedIds={comparedProperties.map((p) => p.title)}
      />

      {/* 12. Global Footer */}
      <Footer />
    </main>
  );
}
