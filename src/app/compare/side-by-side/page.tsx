"use client";

import { useState, useEffect } from "react";
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
import { useCompare } from "@/lib/compare";

export default function CompareSideBySidePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState("highlights");
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightDifferencesOnly, setHighlightDifferencesOnly] = useState(false);

  const { comparedList, toggle } = useCompare();

  // Default properties matching the screenshot design
  const [prop1, setProp1] = useState<any>({
    title: "The Terraces at Max Estate 361",
    location: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/villa-popular-figma.jpg",
    beds: "3 BHK",
    type: "Apartment",
    area: "1,621 sq.ft",
    floor: "3rd Floor",
    builder: "ATS Group",
  });

  const [prop2, setProp2] = useState<any>({
    title: "ATS Knightsbridge",
    location: "Sector 124, Noida",
    status: "Ready To Move",
    image: "/images/properties/tower-popular-figma.jpg",
    beds: "4 BHK",
    type: "Apartment",
    area: "2,450 sq.ft",
    floor: "2nd Floor",
    builder: "M3M India",
  });

  useEffect(() => {
    if (comparedList.length >= 1) {
      setProp1({
        title: comparedList[0].title,
        location: comparedList[0].location,
        status: "Ready To Move",
        image: comparedList[0].images?.[0] || "/images/properties/villa-popular-figma.jpg",
        beds: comparedList[0].beds || "3 BHK",
        type: comparedList[0].type || "Apartment",
        area: "1,850 sq.ft",
        floor: "5th Floor",
        builder: "Roofin Verified",
      });
    }
    if (comparedList.length >= 2) {
      setProp2({
        title: comparedList[1].title,
        location: comparedList[1].location,
        status: "Ready To Move",
        image: comparedList[1].images?.[0] || "/images/properties/tower-popular-figma.jpg",
        beds: comparedList[1].beds || "4 BHK",
        type: comparedList[1].type || "Apartment",
        area: "2,400 sq.ft",
        floor: "8th Floor",
        builder: "Roofin Verified",
      });
    }
  }, [comparedList]);

  const [targetSlot, setTargetSlot] = useState<number>(1);

  const handleSelectProperty = (newProp: Property) => {
    const updated = {
      title: newProp.title,
      location: newProp.location,
      status: "Ready To Move",
      image: newProp.images?.[0] || "/images/properties/tower-popular-figma.jpg",
      beds: newProp.beds || "3 BHK",
      type: newProp.type || "Apartment",
      area: "2,100 sq.ft",
      floor: "6th Floor",
      builder: "Roofin Verified",
    };
    if (targetSlot === 0) {
      setProp1(updated);
    } else {
      setProp2(updated);
    }
    toggle(newProp);
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
        onSearch={(query) => {
          setSearchQuery(query);
          if (query.trim()) {
            const facilitiesEl = document.getElementById("facilities");
            if (facilitiesEl) {
              facilitiesEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }}
        highlightDifferencesOnly={highlightDifferencesOnly}
        onToggleDifferences={() => setHighlightDifferencesOnly((prev) => !prev)}
      />

      {/* 5. Section 1: Highlights Table Matrix */}
      <div id="highlights">
        <CompareHighlightsTable
          prop1={prop1}
          prop2={prop2}
          highlightDifferencesOnly={highlightDifferencesOnly}
        />
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
        <CompareFacilitiesTable prop1={prop1} prop2={prop2} searchQuery={searchQuery} />
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
