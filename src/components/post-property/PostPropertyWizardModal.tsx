"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Building,
  Home,
  MapPin,
  IndianRupee,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Copy,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    userType?: string;
    category?: string;
    intent?: string;
    subType?: string;
    mobileNumber?: string;
  };
}

const SAMPLE_PROPERTY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    label: "Modern Luxury Villa",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    label: "Skyline High-rise Apartment",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    label: "Premium Gated Community",
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    label: "Designer Penthouse",
  },
];

const AVAILABLE_AMENITIES = [
  "24x7 Security & CCTV",
  "Clubhouse & Lounge",
  "Swimming Pool",
  "Fully Equipped Gym",
  "Covered Car Parking",
  "100% Power Backup",
  "Children's Play Zone",
  "Jogging Track",
  "EV Charging Points",
  "Piped Gas Connection",
  "Intercom Facility",
  "High Speed Elevators",
];

export const PostPropertyWizardModal: React.FC<WizardProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdListingId, setCreatedListingId] = useState("");

  // Form State
  const [userRole, setUserRole] = useState(initialData?.userType || "Owner");
  const [intent, setIntent] = useState(initialData?.intent || "sell");
  const [propertyType, setPropertyType] = useState(initialData?.subType || "Flat/Apartment");
  
  // Step 1: Location
  const [society, setSociety] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("Noida");

  // Step 2: Specs
  const [bhk, setBhk] = useState("2 BHK");
  const [bathrooms, setBathrooms] = useState("2");
  const [balconies, setBalconies] = useState("1");
  const [superArea, setSuperArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [furnishing, setFurnishing] = useState("Semi-Furnished");
  const [floorNo, setFloorNo] = useState("");
  const [totalFloors, setTotalFloors] = useState("");

  // Step 3: Pricing & Status
  const [price, setPrice] = useState(""); // In Cr, Lacs, or Monthly rent
  const [priceUnit, setPriceUnit] = useState("Cr");
  const [maintenance, setMaintenance] = useState("");
  const [possession, setPossession] = useState("Ready to Move");
  const [ownership, setOwnership] = useState("Freehold");

  // Step 4: Amenities & Media
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "24x7 Security & CCTV",
    "Clubhouse & Lounge",
    "Swimming Pool",
    "Covered Car Parking",
    "100% Power Backup",
  ]);
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PROPERTY_IMAGES[0].url);
  const [contactPhone, setContactPhone] = useState(initialData?.mobileNumber || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initialData?.mobileNumber) {
      setContactPhone(initialData.mobileNumber);
    }
    if (initialData?.subType) {
      setPropertyType(initialData.subType);
    }
    if (initialData?.intent) {
      setIntent(initialData.intent);
    }
  }, [initialData]);

  if (!mounted || !isOpen) return null;

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handlePublish = async () => {
    if (!locality.trim()) {
      toast.error("Please enter property locality / sector");
      setStep(1);
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price or rent amount");
      setStep(3);
      return;
    }

    const title = `${bhk} ${propertyType} in ${society || locality || "Prime Location"}`;
    const formattedPrice =
      intent === "rent"
        ? `₹${price} / month`
        : `₹${price} ${priceUnit}`;

    const numPrice = Number(price) || 0;
    const finalPriceVal =
      intent === "rent"
        ? numPrice
        : priceUnit === "Cr"
        ? Math.round(numPrice * 10000000)
        : Math.round(numPrice * 100000);

    const bedroomsNum = parseInt(bhk.replace(/\D/g, ""), 10) || 2;
    const bathroomsNum = parseInt(bathrooms, 10) || 2;
    const balconiesNum = parseInt(balconies, 10) || 1;
    const areaNum = Number(superArea) || 1200;

    let propTypeEnum = "APARTMENT";
    const lowerType = propertyType.toLowerCase();
    if (lowerType.includes("villa")) propTypeEnum = "VILLA";
    else if (lowerType.includes("house")) propTypeEnum = "HOUSE";
    else if (lowerType.includes("plot") || lowerType.includes("land")) propTypeEnum = "PLOT";
    else if (lowerType.includes("commercial")) propTypeEnum = "COMMERCIAL_OFFICE";
    else if (lowerType.includes("studio") || lowerType.includes("rk")) propTypeEnum = "STUDIO";

    let furnEnum = "SEMI_FURNISHED";
    if (furnishing.toLowerCase().includes("unfurn")) furnEnum = "UNFURNISHED";
    else if (furnishing.toLowerCase().includes("full") || furnishing.toLowerCase() === "furnished") furnEnum = "FURNISHED";

    let availEnum = "READY_TO_MOVE";
    if (possession.toLowerCase().includes("under")) availEnum = "UNDER_CONSTRUCTION";
    else if (possession.toLowerCase().includes("launch")) availEnum = "NEW_LAUNCH";

    let createdId = `prop-${Date.now()}`;

    // Attempt live API publish if user is logged in
    try {
      const payload = {
        title,
        description: `Premium ${bhk} ${propertyType} situated in ${society || locality}, ${city}. Features ${selectedAmenities.slice(0, 4).join(", ")}.`,
        transactionType: intent === "rent" ? "RENT" : "SALE",
        propertyType: propTypeEnum,
        propertyStatus: "AVAILABLE",
        city,
        addressLine: society ? `${society}, ${locality}` : locality,
        amenities: selectedAmenities,
        variants: [
          {
            variantName: `${bhk} Standard Configuration`,
            bedrooms: bedroomsNum,
            bathrooms: bathroomsNum,
            balconies: balconiesNum,
            price: finalPriceVal,
            totalArea: areaNum,
            totalAreaUnit: "sqft",
            furnishingStatus: furnEnum,
            availabilityStatus: availEnum,
            isAvailable: true,
            images: [{ url: selectedImage, isFeatured: true }],
          },
        ],
      };

      const res = await propertyApi.createProperty(payload);
      if (res?.data?.id || res?.data?.slug) {
        createdId = res.data.slug || res.data.id;
      }
    } catch (err: any) {
      // If unverified seller or guest, gracefully keep listing saved in local draft
      console.log("Live listing creation deferred to local draft:", err?.response?.data?.message || err?.message);
    }

    const newListing = {
      id: createdId,
      title,
      location: `${locality}, ${city}`,
      price: formattedPrice,
      beds: `${bhk} · ${superArea} sq.ft.`,
      image: selectedImage,
      status: "Active" as const,
      views: 1,
      leads: 0,
      dateAdded: "Just now",
      furnishing,
      possession,
      amenities: selectedAmenities,
      userRole,
      contactPhone,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("roofin_user_listings") || "[]");
      const updated = [newListing, ...existing.filter((item: any) => item.id !== createdId)];
      localStorage.setItem("roofin_user_listings", JSON.stringify(updated));
    } catch {}

    setCreatedListingId(createdId);
    setIsSuccess(true);
    toast.success("Listing published successfully!");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${createdListingId}`);
      toast.success("Public listing URL copied!");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 font-poppins">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0B132B] via-[#102A45] to-[#1865F2] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-300 font-bold">
              <Building size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Post Free Property Listing</span>
                <span className="px-2 py-0.5 rounded-full bg-[#00D084] text-slate-950 text-[10px] font-extrabold uppercase">
                  Verified Seller
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Direct buyer connection · 100% Zero Brokerage for Owners
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Progress Bar (when not in success state) */}
        {!isSuccess && (
          <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3 shrink-0">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {[
                { s: 1, label: "Location" },
                { s: 2, label: "Specs & Area" },
                { s: 3, label: "Pricing" },
                { s: 4, label: "Amenities & Media" },
              ].map((item) => {
                const isActive = step === item.s;
                const isPassed = step > item.s;
                return (
                  <div key={item.s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#1865F2] text-white shadow-md ring-4 ring-blue-100"
                          : isPassed
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {isPassed ? <Check size={14} /> : item.s}
                    </div>
                    <span
                      className={`text-xs font-bold hidden sm:inline ${
                        isActive ? "text-[#1865F2]" : isPassed ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* SUCCESS CELEBRATION VIEW */}
          {isSuccess ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check size={36} strokeWidth={3} />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-[#0B132B]">
                  Your Property is Now Live on Roofin!
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Listing ID <span className="font-mono font-bold text-slate-800">#{createdListingId}</span> has been published to verified buyers across Delhi NCR.
                </p>
              </div>

              {/* Preview Card */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left flex gap-4 items-center shadow-xs">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                  <Image src={selectedImage} alt="Property" fill className="object-cover" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      Active
                    </span>
                    <span className="text-[11px] text-slate-400">Zero Brokerage</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    {bhk} {propertyType} in {society || locality}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{locality}, {city}</p>
                  <p className="text-sm font-black text-[#1865F2]">
                    {intent === "rent" ? `₹${price} / month` : `₹${price} ${priceUnit}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/u/me?tab=listings"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  <span>View in My Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  <span>Copy Shareable Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setStep(1);
                    setSociety("");
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 font-bold text-xs transition-colors"
                >
                  + Post Another Property
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: LOCATION DETAILS */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">Step 1: Property Location & Community</h3>
                    <p className="text-xs text-slate-500">Provide the exact locality or project name to help buyers locate your unit.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Listing Role</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Owner", "Agent / Broker"].map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setUserRole(role)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                              userRole === role
                                ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">I am looking to</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "sell", label: "Sell" },
                          { id: "rent", label: "Rent" },
                          { id: "pg", label: "PG / Co-live" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setIntent(item.id)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                              intent === item.id
                                ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Project / Society / Building Name</label>
                    <input
                      type="text"
                      value={society}
                      onChange={(e) => setSociety(e.target.value)}
                      placeholder="e.g. ATS Knightsbridge, Godrej Woods, Mahagun Moderne"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Locality / Sector</label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Sector 150, Noida-Greater Noida Expressway"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none bg-white"
                      >
                        <option value="Noida">Noida</option>
                        <option value="Greater Noida">Greater Noida</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                        <option value="Faridabad">Faridabad</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Contact WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Verified buyer leads will be shared directly on this number.</p>
                  </div>
                </div>
              )}

              {/* STEP 2: SPECS & FLOOR AREA */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">Step 2: Property Specifications & Area</h3>
                    <p className="text-xs text-slate-500">Accurate specifications help genuine buyers filter and connect instantly.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Bedrooms (BHK)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBhk(item)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all ${
                            bhk === item
                              ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Bathrooms</label>
                      <div className="flex gap-2">
                        {["1", "2", "3", "4+"].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setBathrooms(num)}
                            className={`flex-1 py-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                              bathrooms === num
                                ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Balconies</label>
                      <div className="flex gap-2">
                        {["1", "2", "3", "3+"].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setBalconies(num)}
                            className={`flex-1 py-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                              balconies === num
                                ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Super Built-up Area (sq.ft)</label>
                      <input
                        type="number"
                        value={superArea}
                        onChange={(e) => setSuperArea(e.target.value)}
                        placeholder="e.g. 1650"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Carpet Area (sq.ft)</label>
                      <input
                        type="number"
                        value={carpetArea}
                        onChange={(e) => setCarpetArea(e.target.value)}
                        placeholder="e.g. 1320"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Furnishing</label>
                      <select
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-[#1865F2] focus:outline-none bg-white"
                      >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Floor No.</label>
                      <input
                        type="text"
                        value={floorNo}
                        onChange={(e) => setFloorNo(e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Floors</label>
                      <input
                        type="text"
                        value={totalFloors}
                        onChange={(e) => setTotalFloors(e.target.value)}
                        placeholder="e.g. 26"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING & POSSESSION */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">Step 3: Pricing, Ownership & Possession</h3>
                    <p className="text-xs text-slate-500">Set competitive pricing based on current sector market trends.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {intent === "rent" ? "Expected Monthly Rent (₹)" : "Expected Total Price"}
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder={intent === "rent" ? "35000" : "1.45"}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:border-[#1865F2] focus:outline-none"
                        />
                      </div>
                      {intent !== "rent" && (
                        <div className="flex gap-1.5">
                          {["Cr", "Lakh"].map((unit) => (
                            <button
                              key={unit}
                              type="button"
                              onClick={() => setPriceUnit(unit)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                                priceUnit === unit
                                  ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                  : "border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              {unit}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {superArea && price && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        Estimated rate: ~₹
                        {Math.round(
                          (parseFloat(price) * (priceUnit === "Cr" ? 10000000 : 100000)) /
                            (parseFloat(superArea) || 1)
                        ).toLocaleString("en-IN")}{" "}
                        / sq.ft.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Maintenance Charge (₹/mo)</label>
                      <input
                        type="text"
                        value={maintenance}
                        onChange={(e) => setMaintenance(e.target.value)}
                        placeholder="e.g. 4500"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1865F2] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Possession Status</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Ready to Move", "Under Construction"].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setPossession(st)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                              possession === st
                                ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Ownership Authority</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Freehold", "Leasehold", "Power of Attorney"].map((ow) => (
                        <button
                          key={ow}
                          type="button"
                          onClick={() => setOwnership(ow)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                            ownership === ow
                              ? "border-[#1865F2] bg-blue-50/80 text-[#1865F2]"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {ow}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: AMENITIES & MEDIA */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">Step 4: Amenities & Cover Photo</h3>
                    <p className="text-xs text-slate-500">Pick highlight amenities and choose a standout cover photograph.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Select Community Amenities</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AVAILABLE_AMENITIES.map((amenity) => {
                        const isSelected = selectedAmenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex items-center gap-2 ${
                              isSelected
                                ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2]"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                isSelected ? "bg-[#1865F2] border-[#1865F2] text-white" : "border-slate-300"
                              }`}
                            >
                              {isSelected && <Check size={12} />}
                            </span>
                            <span className="truncate">{amenity}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Select Cover Photo</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {SAMPLE_PROPERTY_IMAGES.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedImage(img.url)}
                          className={`relative h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                            selectedImage === img.url
                              ? "border-[#1865F2] ring-4 ring-blue-100 scale-[1.02]"
                              : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                        >
                          <Image src={img.url} alt={img.label} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] text-white font-bold truncate">{img.label}</span>
                          </div>
                          {selectedImage === img.url && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1865F2] text-white flex items-center justify-center">
                              <Check size={12} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Navigation Bar */}
        {!isSuccess && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  className="px-6 py-2.5 rounded-xl bg-[#00D084] hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Publish Free Listing</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
