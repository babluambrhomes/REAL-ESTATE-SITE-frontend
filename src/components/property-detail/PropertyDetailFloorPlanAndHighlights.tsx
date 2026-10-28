"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Download,
  Calculator,
  Compass,
  Maximize2,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PhoneCall,
  MapPin,
  Eye,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { PropertyEmiCalculatorModal } from "@/components/properties/PropertyEmiCalculatorModal";
import { PropertyMapModal } from "@/components/card/PropertyMapModal";

interface UnitVariant {
  id: string;
  variantName: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetArea: number;
  totalArea: number;
  totalAreaUnit: string;
  facing: string;
  estimatedPrice: string;
  estimatedEmi: string;
  rooms: { name: string; size: string; description: string }[];
}

const DEFAULT_VARIANTS: UnitVariant[] = [
  {
    id: "v-2bhk",
    variantName: "2 BHK Smart Living",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    carpetArea: 850,
    totalArea: 1020,
    totalAreaUnit: "SQ.FT.",
    facing: "North-East (Vastu Compliant)",
    estimatedPrice: "₹85 Lakh",
    estimatedEmi: "₹58,400/mo",
    rooms: [
      { name: "Living & Dining", size: "18'0\" × 12'0\"", description: "Connected with open-air sunrise balcony" },
      { name: "Master Bedroom", size: "13'0\" × 11'6\"", description: "Laminated wooden flooring with en-suite bath" },
      { name: "Bedroom 2", size: "11'6\" × 10'0\"", description: "Ideal for kids or executive home office" },
      { name: "Modular Kitchen", size: "10'0\" × 8'0\"", description: "L-shaped granite counter with utility balcony" },
      { name: "Balconies (2)", size: "12'0\" × 4'6\"", description: "Anti-skid ceramic tiles with MS railing" },
    ],
  },
  {
    id: "v-3bhk",
    variantName: "3 BHK Premium Suite",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    carpetArea: 1180,
    totalArea: 1350,
    totalAreaUnit: "SQ.FT.",
    facing: "East (Park & Pool Facing)",
    estimatedPrice: "₹1.25 Cr",
    estimatedEmi: "₹85,800/mo",
    rooms: [
      { name: "Living & Dining", size: "22'6\" × 13'0\"", description: "Double-height feeling with wide panoramic balcony" },
      { name: "Master Suite", size: "14'0\" × 12'0\"", description: "Attached walk-in wardrobe and Italian-fit bathroom" },
      { name: "Bedroom 2", size: "12'6\" × 11'0\"", description: "Large corner window with tranquil garden view" },
      { name: "Bedroom 3 / Guest", size: "11'0\" × 10'6\"", description: "Well-ventilated with dedicated closet space" },
      { name: "Modular Kitchen", size: "11'0\" × 9'6\"", description: "Piped gas, chimney, & separate service utility" },
    ],
  },
  {
    id: "v-3bhk-s",
    variantName: "3 BHK + Servant Grand",
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    carpetArea: 1480,
    totalArea: 1780,
    totalAreaUnit: "SQ.FT.",
    facing: "Corner 3-Side Open",
    estimatedPrice: "₹1.68 Cr",
    estimatedEmi: "₹1,15,400/mo",
    rooms: [
      { name: "Grand Living Area", size: "24'0\" × 14'0\"", description: "Expansive layout for family gatherings" },
      { name: "Master Presidential Suite", size: "16'0\" × 13'0\"", description: "Private balcony with bathtub-ready bathroom" },
      { name: "Bedroom 2 & 3", size: "13'0\" × 12'0\"", description: "Both with attached bathrooms and wardrobes" },
      { name: "Servant Room with Toilet", size: "8'0\" × 6'6\"", description: "Separate entry from service corridor" },
      { name: "Chef's Kitchen", size: "12'6\" × 10'0\"", description: "Parallel counter with breakfast counter bar" },
    ],
  },
  {
    id: "v-4bhk",
    variantName: "4 BHK Sky Villa",
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    carpetArea: 2050,
    totalArea: 2450,
    totalAreaUnit: "SQ.FT.",
    facing: "North-West (Skyline View)",
    estimatedPrice: "₹2.40 Cr",
    estimatedEmi: "₹1,64,800/mo",
    rooms: [
      { name: "Palatial Living Lounge", size: "28'0\" × 16'0\"", description: "Floor-to-ceiling glass wall opening to deck" },
      { name: "Master Haven Suite", size: "18'0\" × 14'0\"", description: "Jacuzzi point, wooden deck, walk-in dressing" },
      { name: "Bedrooms 2, 3 & 4", size: "14'0\" × 12'6\"", description: "All three with attached designer bathrooms" },
      { name: "Family Lounge", size: "13'0\" × 11'0\"", description: "Dedicated private family entertainment lounge" },
      { name: "Servant Quarters", size: "9'0\" × 7'0\"", description: "Independent access and private washroom" },
    ],
  },
];

const INITIAL_HIGHLIGHTS = [
  "Prime Location With Seamless Expressway & Metro Connectivity",
  "Well-Ventilated Architecture With Maximum Natural Daylight",
  "Modern Design With High-End Italian Marble & CP Fittings",
  "100% Vastu Compliant Layout With East/North-East Orientation",
  "Gated 7-Tier Security Community With 24×7 Smart AI Surveillance",
  "Close Proximity To Top International Schools & Multi-Specialty Hospitals",
  "80% Lush Green Open Landscaping & Themed Flora Gardens",
];

const EXTENDED_HIGHLIGHTS = [
  "Dedicated EV Fast-Charging Bays Allocated in Basement 1 & 2",
  "High-Speed Otis Smart Elevators With Automatic Rescue Device (ARD)",
  "Olympic-Length Temperature-Controlled Indoor & Outdoor Swimming Pool",
  "Biometric & RFID Touchless Access For Residents & Verified Guests",
  "Rainwater Harvesting, Solar Lighting & Zero-Discharge STP System",
  "Acoustically Insulated Double-Glazed Noise-Cancelling Toughened Glass",
  "Double-Height Air-Conditioned Grand Entrance Lobby With Concierge Desk",
];

const LOCATION_ADVANTAGES = [
  { label: "Metro Station", time: "10 Min", icon: "/location_advantage/metro_station.png" },
  { label: "Mall", time: "25 Min", icon: "/location_advantage/mall.png" },
  { label: "School", time: "8 Min", icon: "/location_advantage/school.png" },
  { label: "Airport", time: "35 Min", icon: "/location_advantage/airport.png" },
  { label: "Hospital", time: "6 Min", icon: "/location_advantage/hospital.png" },
  { label: "Bank", time: "4 Min", icon: "/location_advantage/bank.png" },
];

export const PropertyDetailFloorPlanAndHighlights = ({
  variants,
  nearbyPlaces,
  propertyTitle = "The Terraces at Max Estate",
  propertyLocation = "Sector 128, Noida Expressway",
  propertyPrice = "₹1.25 Cr",
  propertyId = "1",
  onOpenVideoTour,
}: {
  variants?: any[];
  nearbyPlaces?: string[];
  propertyTitle?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyId?: string | number;
  onOpenVideoTour?: () => void;
}) => {
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(1); // default 3 BHK
  const [showDimensions, setShowDimensions] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [unitEnquirySuccess, setUnitEnquirySuccess] = useState(false);

  // Compute active variant list: either mapped from props or default matrix
  const unitList: UnitVariant[] =
    variants && variants.length > 0
      ? variants.map((v, i) => ({
          id: String(v.id || `v-${i}`),
          variantName: v.variantName || `${v.bedrooms || 3} BHK Luxury Suite`,
          bedrooms: v.bedrooms || 3,
          bathrooms: v.bathrooms || 3,
          balconies: v.balconies || 2,
          carpetArea: v.carpetArea || Math.round((v.totalArea || 1350) * 0.78),
          totalArea: v.totalArea || 1350,
          totalAreaUnit: v.totalAreaUnit || "SQ.FT.",
          facing: v.facing || "North-East (Vastu Compliant)",
          estimatedPrice: v.price ? `₹${v.price}` : propertyPrice,
          estimatedEmi: "₹85,800/mo",
          rooms: DEFAULT_VARIANTS[Math.min(i, DEFAULT_VARIANTS.length - 1)].rooms,
        }))
      : DEFAULT_VARIANTS;

  const activeUnit = unitList[selectedVariantIndex] || unitList[0];

  const handleDownloadFloorPlan = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      // Create a downloadable text file blob simulating the PDF spec
      const specContent = `ROOFIN CERTIFIED FLOOR PLAN SPECIFICATIONS
Property: ${propertyTitle}
Location: ${propertyLocation}
Unit Configuration: ${activeUnit.variantName}
Super Built-Up Area: ${activeUnit.totalArea} ${activeUnit.totalAreaUnit}
Carpet Area: ${activeUnit.carpetArea} SQ.FT.
Facing Direction: ${activeUnit.facing}
Bedrooms: ${activeUnit.bedrooms} | Bathrooms: ${activeUnit.bathrooms} | Balconies: ${activeUnit.balconies}
Estimated Pricing: ${activeUnit.estimatedPrice}

ROOM DIMENSIONS:
${activeUnit.rooms.map((r) => `- ${r.name}: ${r.size} (${r.description})`).join("\n")}

Generated via Roofin Real Estate Portal on ${new Date().toLocaleDateString("en-IN")}.
For physical model inspection and booking call 1800-ROOFIN-PRO.
`;
      const blob = new Blob([specContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Roofin_${propertyTitle.replace(/\s+/g, "_")}_${activeUnit.variantName.replace(/\s+/g, "_")}_Spec.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Floor Plan Spec for ${activeUnit.variantName} downloaded!`);
    }, 800);
  };

  const handleEnquireUnit = () => {
    try {
      const userProfile = JSON.parse(localStorage.getItem("roofin_user_profile") || "{}");
      const newEnquiry = {
        id: `enq-unit-${Date.now()}`,
        propertyTitle: `${propertyTitle} - ${activeUnit.variantName}`,
        propertyLocation: propertyLocation,
        dealerName: "Roofin Verified Project Desk",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        message: `Inquiry for ${activeUnit.variantName} (${activeUnit.totalArea} ${activeUnit.totalAreaUnit}, ${activeUnit.estimatedPrice}). Requesting availability & floor level choice.`,
        status: "Dealer Assigned",
        propertyId: String(propertyId),
      };

      const existing = JSON.parse(localStorage.getItem("roofin_enquiries") || "[]");
      localStorage.setItem("roofin_enquiries", JSON.stringify([newEnquiry, ...existing]));
      setUnitEnquirySuccess(true);
      toast.success(`Enquiry registered for ${activeUnit.variantName}! Saved in your dashboard.`);
    } catch {
      toast.success(`Enquiry registered for ${activeUnit.variantName}!`);
    }
  };

  return (
    <div className="w-full my-6 flex flex-col gap-8 font-jakarta">
      {/* ----------------- 1. FLOOR PLAN SECTION (FIGMA 1:1) ----------------- */}
      <div id="floor-plan" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h3 className="text-[17px] font-bold text-[#1865F2] tracking-tight uppercase">
            FLOOR PLAN
          </h3>
        </div>

        {/* Floor Plan Container Card matching Figma Screenshot 3 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 3D Floor Plan Image on Left (Span 5) */}
            <div className="lg:col-span-5 relative h-64 sm:h-72 w-full flex items-center justify-center">
              <Image
                src="/3d_floor_plan.png"
                alt="3D Floor Plan"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Middle Info & Feature Bullets (Span 4) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[20px] font-bold text-[#0B132B]">
                3 BHK – 1350 SQ.FT.
              </h4>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Smartly designed layout with spacious rooms and efficient space utilization.
              </p>
              <ul className="space-y-2 pt-1 text-[13px] text-[#334155] font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                  <span>1 Living &amp; Dining</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                  <span>1 Modular Kitchen</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                  <span>3 Bedrooms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                  <span>3 Bathrooms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                  <span>2 Balconies</span>
                </li>
              </ul>
            </div>

            {/* Right 3D Walkthrough Card (Span 3) */}
            <div className="lg:col-span-3 rounded-2xl border border-[#D5E5FD] bg-[#F4F8FE] p-5 flex flex-col items-center text-center justify-between min-h-[270px]">
              <div className="relative h-32 w-full">
                <Image
                  src="/3d_floor_plan_small.png"
                  alt="3D Walkthrough"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-1 mt-2">
                <h5 className="text-[16px] font-bold text-[#0B132B]">3D Walkthrough</h5>
                <p className="text-[12px] text-[#64748B] leading-snug">
                  Experience The Property Virtually Before You Visit.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenVideoTour}
                className="mt-3 px-5 py-2 rounded-xl bg-white border border-[#1865F2] text-[#1865F2] hover:bg-blue-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span>❄ View 3D Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line below Floor Plan */}
      <div className="w-full border-t border-slate-200/80 my-1" />

      {/* ----------------- 2. KEY HIGHLIGHTS & LOCATION ADVANTAGE (FIGMA 1:1) ----------------- */}
      <div id="key-highlights" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h4 className="text-[17px] font-bold text-[#1865F2] tracking-tight uppercase">
            KEY HIGHLIGHTS
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Box: KEY HIGHLIGHTS (Span 6) matching Figma Screenshot 3 */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
            <ul className="space-y-3.5 text-[13px] text-[#475569] font-medium">
              {[
                "Prime Location With Excellent Connectivity",
                "Well- Ventilated Home With Ample Natural Light",
                "Modern Design With Premium Fittings",
                "Vastu Compliant Home",
                "Vastu Compliant Home",
                "Gated Community With 24*7 Security",
                "Close To Schools, Hospitals &Shopping Hubs",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#1865F2] stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-2 text-center">
              <button
                type="button"
                className="text-[13px] font-bold text-[#1865F2] hover:underline cursor-pointer"
              >
                View More &gt;&gt;
              </button>
            </div>
          </div>

          {/* Right Box: LOCATION ADVANTAGE (Span 6) matching Figma Screenshot 3 */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="pl-2.5 border-l-4 border-[#00D084] mb-4">
                <h4 className="text-[17px] font-bold text-[#00D084] tracking-tight">
                  Location Advantage
                </h4>
              </div>

              {/* 6 Circular Icons Grid (2 cols x 3 rows) */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {LOCATION_ADVANTAGES.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0">
                      <Image
                        src={loc.icon}
                        alt={loc.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0B132B] leading-tight">
                        {loc.label}
                      </p>
                      <p className="text-[14px] font-extrabold text-[#0B132B] mt-0.5 leading-tight">
                        {loc.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="text-[13px] font-bold text-[#1865F2] hover:underline cursor-pointer"
              >
                View On Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property EMI Calculator Modal initialized with this unit */}
      <PropertyEmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        propertyTitle={`${propertyTitle} - ${activeUnit.variantName}`}
        propertyLocation={propertyLocation}
        initialPrice={activeUnit.estimatedPrice}
      />

      {/* Property Neighborhood Map Modal */}
      <PropertyMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        property={{
          id: propertyId,
          title: propertyTitle,
          location: propertyLocation,
          price: activeUnit.estimatedPrice,
        }}
      />
    </div>
  );
};
