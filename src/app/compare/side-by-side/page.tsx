"use client";

import { useState } from "react";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { PostPropertyTopAnnouncement } from "@/components/post-property/PostPropertyTopAnnouncement";
import { CompareResultsHeader } from "@/components/compare/results/CompareResultsHeader";
import { CompareSeeDifferenceBar } from "@/components/compare/results/CompareSeeDifferenceBar";
import { CompareHighlightsTable } from "@/components/compare/results/CompareHighlightsTable";
import { ComparePriceTrendChart } from "@/components/compare/results/ComparePriceTrendChart";
import { ComparePricingTable } from "@/components/compare/results/ComparePricingTable";
import { CompareLocationMap } from "@/components/compare/results/CompareLocationMap";
import { CompareFacilitiesTable } from "@/components/compare/results/CompareFacilitiesTable";
import { CompareSectorPairs } from "@/components/compare/results/CompareSectorPairs";
import { ComparePropertyPickerModal } from "@/components/compare/ComparePropertyPickerModal";
import { properties as allProperties } from "@/data/properties";
import { Property } from "@/types";

export default function CompareSideBySidePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState("highlights");
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);

  // Default properties matching the screenshot design
  const [prop1, setProp1] = useState({
    title: "The Terraces at Max Estate 361",
    location: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/villa-popular-figma.jpg",
  });

  const [prop2, setProp2] = useState({
    title: "ATS Knightsbridge",
    location: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/tower-popular-figma.jpg",
  });

  const [targetSlot, setTargetSlot] = useState<number>(1);

  const handleSelectProperty = (newProp: Property) => {
    const updated = {
      title: newProp.title,
      location: newProp.location,
      status: "Ready To Move",
      image: newProp.images[0] || "/images/properties/tower-popular-figma.jpg",
    };
    if (targetSlot === 0) {
      setProp1(updated);
    } else {
      setProp2(updated);
    }
    setIsPickerModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#FDFEFE] font-jakarta pb-16">
      {/* 1. Top Announcement Header Bar */}
      {showAnnouncement && (
        <PostPropertyTopAnnouncement onClose={() => setShowAnnouncement(false)} />
      )}

      {/* 2. SimpleHeader with Compare Variant matching Figma exactly */}
      <SimpleHeader variant="compare" hasAnnouncement={showAnnouncement} />

      {/* 3. Main Compare Title & 3 Comparison Slots (Property 1 = Property 2 = Add Another Property) */}
      <CompareResultsHeader
        properties={[prop1, prop2]}
        onAddProperty={() => {
          setTargetSlot(1);
          setIsPickerModalOpen(true);
        }}
        onChangeProperty={(idx) => {
          setTargetSlot(idx);
          setIsPickerModalOpen(true);
        }}
        onRemoveProperty={(idx) => {
          if (idx === 1) {
            setProp2({
              title: "Godrej Woods",
              location: "Sector 43, Noida",
              status: "Ready To Move",
              image: "/images/properties/modern-white-penthouse.jpg",
            });
          }
        }}
      />

      {/* 4. See The Difference Search Input + 3 Quick Filter Tabs */}
      <CompareSeeDifferenceBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          const element = document.getElementById(tab);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />

      {/* 5. Section 1: Highlights Table Matrix */}
      <div id="highlights">
        <CompareHighlightsTable prop1={prop1} prop2={prop2} />
      </div>

      {/* 6. Section 2: AVG. PROPERTY RATE Price Trend Chart */}
      <div id="price">
        <ComparePriceTrendChart />
      </div>

      {/* 7. Section 3: Pricings Com Matrix */}
      <ComparePricingTable prop1={prop1} prop2={prop2} />

      {/* 8. Section 4: Interactive Location Map with Pins & Amenities Legend */}
      <CompareLocationMap />

      {/* 9. Section 5: Facilities 22-Checklist with Sky Blue Column Highlight */}
      <div id="facilities">
        <CompareFacilitiesTable prop1={prop1} prop2={prop2} />
      </div>

      {/* 10. Section 6: COMPARE SECTOR 124 & 120 Grid */}
      <CompareSectorPairs
        onComparePair={(pair) => {
          setProp1({
            title: pair.prop1.title,
            location: pair.prop1.location,
            status: pair.prop1.status,
            image: pair.prop1.image,
          });
          setProp2({
            title: pair.prop2.title,
            location: pair.prop2.location,
            status: pair.prop2.status,
            image: pair.prop2.image,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Property Picker Modal */}
      <ComparePropertyPickerModal
        isOpen={isPickerModalOpen}
        onClose={() => setIsPickerModalOpen(false)}
        properties={allProperties}
        onSelectProperty={handleSelectProperty}
        selectedIds={[prop1.title, prop2.title]}
      />
    </main>
  );
}
