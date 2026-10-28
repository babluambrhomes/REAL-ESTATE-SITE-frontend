"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import {
  Building2,
  Home,
  MapPin,
  Check,
  ChevronRight,
  Headphones,
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  User,
  Sparkles,
  Search,
  X,
  Upload,
  Plus,
  Minus,
  Trash2,
  Video,
  FileCheck,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  Layers,
  Star,
  ExternalLink,
  Building,
  Store,
  Compass,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface PortalPostPropertyProps {
  onCancel: () => void;
  onComplete: () => void;
}

const STEPPER = [
  { num: 1, label: "Basic" },
  { num: 2, label: "Location" },
  { num: 3, label: "Details" },
  { num: 4, label: "Price" },
  { num: 5, label: "Amenities" },
  { num: 6, label: "Media" },
  { num: 7, label: "Review" },
];

// Step 1 Subtypes (Exact Figma 1:1)
const RESIDENTIAL_SUBTYPES = [
  { id: "apt", label: "Apartment", img: "/images/subtypes/apartment.png" },
  { id: "house", label: "Independent House", img: "/images/subtypes/independent_house.png" },
  { id: "villa", label: "Villa", img: "/images/subtypes/villa.png" },
  { id: "floor", label: "Builder Floor", img: "/images/subtypes/builder_floor.png" },
  { id: "studio", label: "Studio", img: "/images/subtypes/studio.png" },
  { id: "penthouse", label: "Penthouse", img: "/images/subtypes/penthouse.png" },
  { id: "farmhouse", label: "Farm House", img: "/images/subtypes/farm_house.png" },
  { id: "duplex", label: "Duplex", img: "/images/subtypes/duplex.png" },
];

const COMMERCIAL_SUBTYPES = [
  { id: "office", label: "Office Space", img: "/categories/office_space.png" },
  { id: "shop", label: "Retail Shop", img: "/images/properties/entire-card-sample.png" },
  { id: "showroom", label: "Showroom", img: "/images/properties/property-4-clean.png" },
  { id: "coworking", label: "Co-working", img: "/images/properties/luxury-living-room.jpg" },
  { id: "warehouse", label: "Warehouse", img: "/images/properties/rtm-card-1.png" },
  { id: "industrial", label: "Industrial Unit", img: "/images/properties/rtm-card-2.png" },
  { id: "cafe", label: "Restaurant / Café", img: "/images/properties/rtm-card-3.png" },
  { id: "other-comm", label: "Other Commercial", img: "/images/properties/rtm-card-4.png" },
];

const PLOT_SUBTYPES = [
  { id: "ind-plot", label: "Industrial Plot", img: "/categories/land.png" },
  { id: "agri", label: "Agricultural Land", img: "/categories/land.png" },
  { id: "farm-plot", label: "Farmhouse Plot", img: "/categories/farm_house.png" },
  { id: "inst-plot", label: "Institutional Plot", img: "/categories/land.png" },
  { id: "mixed-plot", label: "Mixed-Use Plot", img: "/categories/land.png" },
  { id: "other-land", label: "Other Land", img: "/categories/land.png" },
];

// Step 5 Amenities
const AMENITY_ICONS = [
  { id: "gym", label: "GYM", icon: "🏋️", selected: true },
  { id: "pool", label: "Swimming pool", icon: "🏊", selected: true },
  { id: "gas", label: "Gas pipeline", icon: "🔥", selected: true },
  { id: "parking", label: "Parking", icon: "🚗", selected: true },
  { id: "club", label: "Club House", icon: "🏠", selected: true },
  { id: "park", label: "Children Park", icon: "🎠", selected: false },
  { id: "cctv", label: "Cctv surveillia..", icon: "📹", selected: false },
  { id: "security", label: "7x24 Security", icon: "🛡️", selected: false },
  { id: "smart", label: "Smart tab", icon: "📱", selected: false },
];

export const PortalPostProperty = ({
  onCancel,
  onComplete,
}: PortalPostPropertyProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const listedUserName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Rohit Sharma";

  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const tourInputRef = useRef<HTMLInputElement>(null);
  const floorPlanInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);
  const replacePhotoInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Basics
  const [propertyType, setPropertyType] = useState<"Residential" | "Commercial" | "Plot/Land">("Residential");
  const [propertyCategory, setPropertyCategory] = useState<"Sell" | "Rent" | "PG/Co-Living">("Sell");
  const [societyName, setSocietyName] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("Apartment");

  // Step 2: Location
  const [locationSearch, setLocationSearch] = useState("Greater Noida West, Noida Extention, Uttar Pradesh");
  const [selectedCity, setSelectedCity] = useState("Greater Noida");
  const [selectedLocality, setSelectedLocality] = useState("Noida Extension");
  const [towerBlock, setTowerBlock] = useState("Tower A");
  const [pinCode, setPinCode] = useState("201306");
  const [fullAddress, setFullAddress] = useState("Sector 4, Gaur City, Noida Extention...");
  const [mapMode, setMapMode] = useState<"map" | "satellite">("map");

  // Step 3: Details
  const [bhk, setBhk] = useState("3 BHK");
  const [builtUpArea, setBuiltUpArea] = useState("1270");
  const [floorNumber, setFloorNumber] = useState("2 Floor");
  const [totalFloor, setTotalFloor] = useState("10 Floor");
  const [constructionStatus, setConstructionStatus] = useState("Ready to Move");
  const [aboutDescription, setAboutDescription] = useState(
    "Address : Sector 103 , Noida Ext\nThis property faces the east direction. The floor plan additionally contains 3 bedroom(s), 2 bathrooms and 3 balconies. All in all, the flat is spread over a super built up area of 1270 sq.Ft. The property is located on the 3rd floor of a 18 floors tall building. Being a ready to move project, you can move in immediately."
  );
  const [furnishType, setFurnishType] = useState("Fully Furnished");
  const [facing, setFacing] = useState("East");
  const [inclusions, setInclusions] = useState<Record<string, number>>({
    ac: 2,
    bed: 2,
    lift: 2,
    tv: 2,
    sofa: 2,
    ac2: 2,
    cabinet: 2,
  });
  const [floorPlanCounts, setFloorPlanCounts] = useState<Record<string, number>>({
    "Living Room": 1,
    "Modular Kitchen": 1,
    "Bedrooms": 3,
    "Bathrooms": 2,
    "Balconies": 3,
  });

  // Step 4: Price
  const [salesPrice, setSalesPrice] = useState("1,42,00,000");
  const [pricePerSqft, setPricePerSqft] = useState("11,181");
  const [totalPrice, setTotalPrice] = useState("1,42,00,000");
  const [maintenanceCharges, setMaintenanceCharges] = useState("2,500");
  const [bookingAmount, setBookingAmount] = useState("50,000");
  const [negotiable, setNegotiable] = useState("Yes, sightly negotiable");
  const [priceJustification, setPriceJustification] = useState(
    "Corner apartment with park view, modular kitchen, premium fitting and corner parking"
  );

  // Step 5: Amenities
  const [amenitiesList, setAmenitiesList] = useState(AMENITY_ICONS);
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>(["well-maintained"]);

  // Step 6: Media
  const [activeMediaFilter, setActiveMediaFilter] = useState("All Media");
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; tag: string; img: string }>>([
    { id: "1", tag: "01 Exterior View", img: "/images/subtypes/apartment.png" },
    { id: "2", tag: "02 Living Room", img: "/images/properties/luxury-living-room.jpg" },
    { id: "3", tag: "03 Villa Exterior", img: "/images/subtypes/villa.png" },
    { id: "4", tag: "04 Penthouse View", img: "/images/subtypes/penthouse.png" },
    { id: "5", tag: "05 Master Suite", img: "/images/subtypes/duplex.png" },
  ]);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("1");
  const [uploadedVideo, setUploadedVideo] = useState<{ name: string; size: string; url?: string } | null>(null);
  const [uploadedTour, setUploadedTour] = useState<{ name: string; size?: string } | null>(null);
  const [uploadedFloorPlan, setUploadedFloorPlan] = useState<{ name: string; url?: string } | null>(null);
  const [uploadedBrochure, setUploadedBrochure] = useState<{ name: string; size?: string } | null>(null);

  // Step 7: Preview States
  const [propertyHighlights, setPropertyHighlights] = useState<string[]>([
    "Park Facing",
    "Gated Society",
    "Ready To Move",
    "Corner Property",
  ]);
  const [customHighlight, setCustomHighlight] = useState("");
  const [seoKeywords, setSeoKeywords] = useState<string[]>([
    "3 BHK",
    "Noida",
    "Sector 150",
    "Flat for Sales",
  ]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Auto-Hydrate saved draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("roofin_post_property_draft");
      if (savedDraft) {
        const d = JSON.parse(savedDraft);
        if (d.propertyType) setPropertyType(d.propertyType);
        if (d.propertyCategory) setPropertyCategory(d.propertyCategory);
        if (d.societyName) setSocietyName(d.societyName);
        if (d.selectedSubtype) setSelectedSubtype(d.selectedSubtype);
        if (d.locationSearch) setLocationSearch(d.locationSearch);
        if (d.selectedCity) setSelectedCity(d.selectedCity);
        if (d.selectedLocality) setSelectedLocality(d.selectedLocality);
        if (d.towerBlock) setTowerBlock(d.towerBlock);
        if (d.pinCode) setPinCode(d.pinCode);
        if (d.fullAddress) setFullAddress(d.fullAddress);
        if (d.bhk) setBhk(d.bhk);
        if (d.builtUpArea) setBuiltUpArea(d.builtUpArea);
        if (d.floorNumber) setFloorNumber(d.floorNumber);
        if (d.totalFloor) setTotalFloor(d.totalFloor);
        if (d.constructionStatus) setConstructionStatus(d.constructionStatus);
        if (d.aboutDescription) setAboutDescription(d.aboutDescription);
        if (d.furnishType) setFurnishType(d.furnishType);
        if (d.facing) setFacing(d.facing);
        if (d.inclusions) setInclusions(d.inclusions);
        if (d.salesPrice) setSalesPrice(d.salesPrice);
        if (d.totalPrice) setTotalPrice(d.totalPrice);
        if (d.maintenanceCharges) setMaintenanceCharges(d.maintenanceCharges);
        if (d.bookingAmount) setBookingAmount(d.bookingAmount);
        if (d.negotiable) setNegotiable(d.negotiable);
        if (d.currentStep && typeof d.currentStep === "number") setCurrentStep(d.currentStep);
      }
    } catch (e) {
      console.warn("Could not load draft from localStorage", e);
    }
  }, []);

  // 2. Auto-Calculate Price Per Sq.Ft whenever Total Price or Built-up Area changes
  useEffect(() => {
    const cleanPrice = parseInt(totalPrice.replace(/[^\d]/g, ""), 10);
    const cleanArea = parseInt(builtUpArea.replace(/[^\d]/g, ""), 10);
    if (!isNaN(cleanPrice) && !isNaN(cleanArea) && cleanArea > 0) {
      const perSqft = Math.round(cleanPrice / cleanArea);
      setPricePerSqft(perSqft.toLocaleString("en-IN"));
    }
  }, [totalPrice, builtUpArea]);

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      tag: `0${uploadedPhotos.length + idx + 1} ${file.name.slice(0, 14)}`,
      img: URL.createObjectURL(file),
    }));
    setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    toast.success(`${files.length} photo(s) added successfully!`);
  };

  const handleRemovePhoto = (id: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
    if (selectedPhotoId === id) {
      const remaining = uploadedPhotos.filter((p) => p.id !== id);
      setSelectedPhotoId(remaining[0]?.id || "");
    }
    toast.success("Photo removed");
  };

  const handleSetCoverPhoto = (id: string) => {
    const photoToCover = uploadedPhotos.find((p) => p.id === id);
    if (!photoToCover) return;
    const remaining = uploadedPhotos.filter((p) => p.id !== id);
    setUploadedPhotos([photoToCover, ...remaining]);
    setSelectedPhotoId(photoToCover.id);
    toast.success("Cover photo updated!");
  };

  const handleTriggerReplacePhoto = (id: string) => {
    setSelectedPhotoId(id);
    replacePhotoInputRef.current?.click();
  };

  const handleReplacePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const newUrl = URL.createObjectURL(file);
    setUploadedPhotos((prev) =>
      prev.map((p) =>
        p.id === selectedPhotoId
          ? { ...p, img: newUrl, tag: `${p.tag.slice(0, 3)} ${file.name.slice(0, 14)}` }
          : p
      )
    );
    toast.success("Photo replaced successfully!");
  };

  const handleDeleteSelectedPhoto = () => {
    if (!selectedPhotoId) return;
    handleRemovePhoto(selectedPhotoId);
  };

  // Video Upload Handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setUploadedVideo({
      name: file.name,
      size: `${sizeMb} MB`,
      url: URL.createObjectURL(file),
    });
    toast.success("Video tour uploaded successfully!");
  };

  // 360 Tour Upload Handler
  const handleTourUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadedTour({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    });
    toast.success("360° Virtual Tour uploaded successfully!");
  };

  // Floor Plan Upload Handler
  const handleFloorPlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadedFloorPlan({
      name: file.name,
      url: URL.createObjectURL(file),
    });
    toast.success("Floor plan uploaded successfully!");
  };

  // Brochure Upload Handler
  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadedBrochure({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    });
    toast.success("Brochure PDF uploaded successfully!");
  };

  // AI Description Generator
  const handleGenerateAiDescription = () => {
    const generated = `Presenting a premium ${bhk} ${selectedSubtype} located in ${
      societyName || "Sector 103, Noida Extension"
    }. This beautiful home faces ${facing} direction and is situated on ${floorNumber} of an elegant ${totalFloor} building. Spread over a generous super built-up area of ${builtUpArea} sq.ft, the home is ${furnishType.toLowerCase()} with high-end modular fittings, spacious sunlit balconies, and 24x7 security. A ready-to-move sanctuary perfect for modern family living.`;
    setAboutDescription(generated);
    toast.success("AI description generated!");
  };

  const ALL_HIGHLIGHTS = [
    "Park Facing",
    "Gated Society",
    "Ready To Move",
    "Corner Property",
    "Near Metro",
    "Vastu Compliant",
    "Premium Interiors",
    "Newly Renovated",
    "Sea/Green View",
    "High Rental Yield",
    "Low Maintenance",
    "Investment Opportunity",
    "Under Construction",
    "East Facing",
    "North Facing",
    "Furnished",
    "Semi-Furnished",
  ];

  const POPULAR_KEYWORDS = [
    "3 BHK",
    "Noida",
    "Sector 150",
    "Flat for Sales",
    "New Launch",
    "Premium Society",
    "Affordable house",
  ];

  const toggleHighlight = (item: string) => {
    setPropertyHighlights((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHighlight.trim()) return;
    if (!propertyHighlights.includes(customHighlight.trim())) {
      setPropertyHighlights((prev) => [...prev, customHighlight.trim()]);
    }
    setCustomHighlight("");
  };

  const toggleKeyword = (item: string) => {
    setSeoKeywords((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKeyword.trim()) return;
    if (!seoKeywords.includes(customKeyword.trim())) {
      setSeoKeywords((prev) => [...prev, customKeyword.trim()]);
    }
    setCustomKeyword("");
  };

  const currentSubtypes =
    propertyType === "Residential"
      ? RESIDENTIAL_SUBTYPES
      : propertyType === "Commercial"
      ? COMMERCIAL_SUBTYPES
      : PLOT_SUBTYPES;

  // Validation function per step
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!societyName.trim()) {
        toast.error("Please enter the Project or Society name.");
        return false;
      }
      if (!selectedSubtype) {
        toast.error("Please select a Property Type.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!selectedCity.trim()) {
        toast.error("Please select a City.");
        return false;
      }
      if (!selectedLocality.trim()) {
        toast.error("Please enter the Locality.");
        return false;
      }
      if (!pinCode.trim() || pinCode.replace(/\D/g, "").length !== 6) {
        toast.error("Please enter a valid 6-digit Pincode.");
        return false;
      }
      return true;
    }

    if (step === 3) {
      const areaNum = parseInt(builtUpArea.replace(/[^\d]/g, ""), 10);
      if (isNaN(areaNum) || areaNum <= 0) {
        toast.error("Please enter a valid Built-up Area (sq.ft).");
        return false;
      }
      if (!aboutDescription.trim() || aboutDescription.trim().length < 15) {
        toast.error("Please provide a short description about the property.");
        return false;
      }
      return true;
    }

    if (step === 4) {
      const cleanPrice = totalPrice.replace(/[^\d]/g, "");
      if (!cleanPrice || parseInt(cleanPrice, 10) <= 0) {
        toast.error("Please enter the Total / Expected Price.");
        return false;
      }
      return true;
    }

    if (step === 5) {
      const selectedCount = amenitiesList.filter((a) => a.selected).length;
      if (selectedCount === 0) {
        toast.error("Please select at least 1 amenity.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Step 7: Final Publishing Listing
      const cleanPrice = parseInt(totalPrice.replace(/[^\d]/g, ""), 10) || 12000000;
      const cleanArea = parseInt(builtUpArea.replace(/[^\d]/g, ""), 10) || 1500;
      const cleanRate = Math.round(cleanPrice / (cleanArea || 1));

      // Construct live backend payload according to backend schema
      const backendPayload = {
        title: `${bhk} ${selectedSubtype} in ${societyName || selectedLocality}`,
        description: aboutDescription || `${bhk} luxury ${selectedSubtype} located at ${selectedLocality}, ${selectedCity}.`,
        transactionType: propertyCategory === "Rent" ? "RENT" : "SALE",
        propertyType: selectedSubtype ? selectedSubtype.toUpperCase().replace(/\s+/g, "_") : "APARTMENT",
        propertyStatus: constructionStatus === "ready" ? "READY_TO_MOVE" : "UNDER_CONSTRUCTION",
        city: selectedCity || "Noida",
        state: "Uttar Pradesh",
        pincode: pinCode.replace(/\D/g, "") || "201301",
        addressLine: `${towerBlock ? `Tower ${towerBlock}, ` : ""}${societyName || selectedLocality}`,
        variants: [
          {
            variantName: `${bhk} ${selectedSubtype}`,
            bedrooms: parseInt(bhk) || 3,
            bathrooms: floorPlanCounts["Bathrooms"] || 2,
            price: cleanPrice,
            pricePerSqft: cleanRate,
            totalArea: cleanArea,
            totalAreaUnit: "SQ_FT",
            furnishingStatus: furnishType === "Fully Furnished" ? "FURNISHED" : furnishType === "Semi-Furnished" ? "SEMI_FURNISHED" : "UNFURNISHED",
            availabilityStatus: "AVAILABLE",
          },
        ],
      };

      // Call backend API asynchronously (no UI delay or blocking)
      propertyApi
        .createProperty(backendPayload)
        .then((res: any) => {
          if (res?.data?.id && uploadedPhotos.length > 0) {
            const formData = new FormData();
            uploadedPhotos.forEach((p: any) => {
              if (p.file) formData.append("images", p.file);
            });
            propertyApi.uploadPropertyImages(res.data.id, formData).catch(() => {});
          }
        })
        .catch((err) => {
          console.log("Backend sync saved to local storage fallback:", err?.message || err);
        });

      try {
        const newProperty = {
          id: `prop-${Date.now()}`,
          title: `${bhk} ${selectedSubtype}`,
          subtitle: societyName || "The Terraces At Max",
          price: totalPrice.startsWith("₹") ? totalPrice : `₹ ${totalPrice}`,
          status: "Under Review",
          views: "1",
          leads: "0",
          location: `${selectedLocality}, ${selectedCity}`,
          image: uploadedPhotos[0]?.img || "/images/subtypes/apartment.png",
          category: propertyCategory,
          propertyType,
          builtUpArea: `${builtUpArea} sq.ft`,
          createdAt: new Date().toISOString(),
        };

        const existing = localStorage.getItem("roofin_user_properties");
        const list = existing ? JSON.parse(existing) : [];
        list.unshift(newProperty);
        localStorage.setItem("roofin_user_properties", JSON.stringify(list));

        // Clear draft after publish
        localStorage.removeItem("roofin_post_property_draft");
        toast.success("Listing published successfully! It is now under review.");
      } catch (err) {
        console.error(err);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onCancel();
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetStep > currentStep) {
      // Validate up to target
      let canJump = true;
      for (let s = currentStep; s < targetStep; s++) {
        if (!validateStep(s)) {
          canJump = false;
          break;
        }
      }
      if (canJump) {
        setCurrentStep(targetStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleSaveDraft = () => {
    try {
      const draftData = {
        propertyType,
        propertyCategory,
        societyName,
        selectedSubtype,
        locationSearch,
        selectedCity,
        selectedLocality,
        towerBlock,
        pinCode,
        fullAddress,
        bhk,
        builtUpArea,
        floorNumber,
        totalFloor,
        constructionStatus,
        aboutDescription,
        furnishType,
        facing,
        inclusions,
        salesPrice,
        pricePerSqft,
        totalPrice,
        maintenanceCharges,
        bookingAmount,
        negotiable,
        priceJustification,
        propertyHighlights,
        seoKeywords,
        currentStep,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("roofin_post_property_draft", JSON.stringify(draftData));
      toast.success("Draft saved successfully to your browser!");
    } catch (err) {
      toast.error("Could not save draft");
    }
  };

  const updateInclusionCount = (key: string, delta: number) => {
    setInclusions((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  return (
    <div className="space-y-6 font-jakarta pb-12">
      {/* 1. Top Banner: Title + Need Help Guide Box (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-1.5 h-11 bg-[#1865F2] rounded-full mr-3.5 shrink-0" />
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0B132B] tracking-tight">
              Post a Property
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              List your property in a few simple steps. IT only takes 2-3 minutes
            </p>
          </div>
        </div>

        {/* Need Help Box */}
        <div className="flex items-center gap-3 bg-slate-50/70 border border-slate-200 rounded-2xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-2xs">
            <Headphones size={20} strokeWidth={2.2} />
          </div>
          <div>
            <h5 className="text-[12px] font-bold text-[#0B132B]">Need Help?</h5>
            <p className="text-[10.5px] text-slate-500 leading-tight">
              Get step-by-step guidance to create the best listing .
            </p>
          </div>
          <button
            type="button"
            className="ml-2 px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-[#1865F2] text-[11px] font-semibold text-[#1865F2] bg-white transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            View Help Guide ➔
          </button>
        </div>
      </div>

      {/* 2. 7-Step Stepper Progress Bar (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 sm:px-8 shadow-2xs">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          {STEPPER.map((st, idx) => {
            const isCurrent = currentStep === st.num;

            return (
              <div key={st.num} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => handleStepClick(st.num)}
                  className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center font-bold text-xs shadow-xs transition-transform group-hover:scale-105 shrink-0">
                    {st.num}
                  </div>
                  <span
                    className={`text-[13px] font-semibold whitespace-nowrap ${
                      isCurrent ? "text-[#0B132B] font-bold" : "text-slate-700 font-medium"
                    }`}
                  >
                    {st.label}
                  </span>
                </button>

                {/* Connecting Line */}
                {idx < STEPPER.length - 1 && (
                  <div className="h-[1.5px] bg-slate-200 flex-1 mx-3 min-w-[16px] max-w-[80px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== STEP 1: BASIC (Figma 1:1) ==================== */}
      {currentStep === 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0B132B]">
              1. Property Basics
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-400 mt-0.5">
              Start with the basic property information.
            </p>
          </div>

          {/* Row 1: Property Type & Property Category */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            {/* Property Type (Left) */}
            <div className="lg:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Property Type <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { id: "All", label: "All", icon: MapPin },
                  { id: "Residential", label: "Residential", icon: Building2 },
                  { id: "Commercial", label: "Commercial", icon: Store },
                  { id: "Plot/Land", label: "Plot/Land", icon: Compass },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.id !== "All") {
                          setPropertyType(item.id as any);
                          const list =
                            item.id === "Residential"
                              ? RESIDENTIAL_SUBTYPES
                              : item.id === "Commercial"
                              ? COMMERCIAL_SUBTYPES
                              : PLOT_SUBTYPES;
                          if (list[0]) setSelectedSubtype(list[0].label);
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#1865F2] bg-[#EAF2FF] text-[#1865F2] shadow-2xs font-bold"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon size={14} className={isSelected ? "text-[#1865F2]" : "text-slate-500"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Category (Right) */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Property Category <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { id: "Sell", label: "Sell", icon: Home },
                  { id: "Rent", label: "Rent", icon: Building },
                  { id: "PG/Co-Living", label: "PG/Co-Living", icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPropertyCategory(item.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#1865F2] bg-[#EAF2FF] text-[#1865F2] shadow-2xs font-bold"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon size={14} className={isSelected ? "text-[#1865F2]" : "text-slate-500"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 2: Society Name & Listed Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Society name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Project or Society name"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] shadow-2xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Listed Type <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <User size={15} className="text-slate-500 mr-2.5 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={listedUserName}
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-default"
                />
                <Lock size={14} className="text-slate-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Row 3: Property Type Subtypes (8 cards matching Figma) */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-3">
              Property Type <span className="text-rose-500">*</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
              {currentSubtypes.map((sub) => {
                const isSelected = selectedSubtype === sub.label;

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubtype(sub.label)}
                    className={`rounded-xl border overflow-hidden transition-all cursor-pointer group bg-white shadow-2xs ${
                      isSelected
                        ? "border-2 border-[#1865F2] ring-2 ring-blue-100/60"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="relative h-20 sm:h-22 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={sub.img}
                        alt={sub.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          (e.target as any).src = "/images/subtypes/apartment.png";
                        }}
                      />
                    </div>
                    <div className="p-2 text-center bg-white">
                      <span
                        className={`block text-[11px] truncate leading-tight ${
                          isSelected ? "font-bold text-[#1865F2]" : "font-medium text-slate-700"
                        }`}
                      >
                        {sub.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 4: Bottom Action Bar inside Card (Figma 1:1) */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="px-7 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>← Cancel</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2.5 rounded-xl border border-blue-200 bg-[#EAF2FF] hover:bg-blue-100/80 text-xs font-bold text-[#1865F2] transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <FileText size={15} className="text-[#1865F2]" />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-98"
              >
                <span>Save & Continue</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 2: LOCATION ==================== */}
      {currentStep === 2 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <h3 className="text-[17px] font-bold text-[#0B132B]">
              2. Location
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Where is your property location? Add the exact location so buyers can find your property easily.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative flex items-center border border-slate-200 rounded-xl px-4 py-2.5 bg-white shadow-2xs focus-within:border-[#1865F2]">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Search property location"
              className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {locationSearch && (
              <button
                type="button"
                onClick={() => setLocationSearch("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Popular Locations Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] text-slate-400 font-medium shrink-0">
              Popular locations
            </span>
            {[
              "Greater Noida West",
              "Noida Extension",
              "Sector 1",
              "Sector 4",
              "Sector 10",
              "Tech Zone 4",
              "Gaur City",
              "Noida",
            ].map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocationSearch(loc);
                  setSelectedLocality(loc);
                  if (loc.toLowerCase().includes("greater noida")) setSelectedCity("Greater Noida");
                  else if (loc.toLowerCase().includes("noida")) setSelectedCity("Noida");
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors shrink-0 cursor-pointer ${
                  locationSearch.includes(loc)
                    ? "bg-[#1865F2] text-white border-[#1865F2]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Map & Form Grid (Screenshot 1:1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Map View Box (Span 7) */}
            <div className="lg:col-span-7 relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src="/temp_check_img2.jpg"
                alt="Map View"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as any).src = "/banner/price_trends.png";
                }}
              />

              {/* Pin Tooltip */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-md">
                  Drag the pin to adjust the exact location
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center border-2 border-white shadow-lg mt-1">
                  <MapPin size={16} />
                </div>
              </div>

              {/* Map / Satellite Toggle */}
              <div className="absolute bottom-3 right-3 flex items-center rounded-xl bg-white/95 border border-slate-200 p-0.5 shadow-md text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMapMode("map")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    mapMode === "map" ? "bg-[#1865F2] text-white" : "text-slate-600"
                  }`}
                >
                  Map View
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode("satellite")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    mapMode === "satellite" ? "bg-[#1865F2] text-white" : "text-slate-600"
                  }`}
                >
                  Satellite View
                </button>
              </div>
            </div>

            {/* Form Inputs (Span 5) */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                  >
                    <option value="Greater Noida">Greater Noida</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Locality/Sector <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    placeholder="e.g. Noida Extension"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tower/ Block
                  </label>
                  <input
                    type="text"
                    value={towerBlock}
                    onChange={(e) => setTowerBlock(e.target.value)}
                    placeholder="e.g. Tower A"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Pin Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit pincode"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Full Address (Optional)
                </label>
                <input
                  type="text"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] shadow-2xs"
                />
              </div>

              {/* Pin Helper Box */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5">
                <MapPin size={18} className="text-[#1865F2] shrink-0" />
                <div>
                  <h6 className="text-[11.5px] font-bold text-[#1865F2]">
                    Pin Your Property on the Map
                  </h6>
                  <p className="text-[10px] text-slate-500">
                    Drag the pin to the exact location of your property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 3: DETAILS ==================== */}
      {currentStep === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <h3 className="text-[17px] font-bold text-[#0B132B]">
              3. Details
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Share the key details about property.
            </p>
          </div>

          {/* Top Configuration & Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Configuration <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-1">
                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBhk(val)}
                    className={`px-2 py-1.5 rounded-lg text-[10.5px] font-semibold border transition-colors ${
                      bhk === val
                        ? "bg-[#1865F2] text-white border-[#1865F2]"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Build up Area <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden h-9 shadow-2xs">
                <input
                  type="text"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(e.target.value)}
                  className="w-full px-2.5 text-xs text-slate-800 focus:outline-none"
                />
                <span className="px-2 text-[11px] text-slate-400 bg-slate-50 border-l border-slate-200 h-full flex items-center">
                  Sq.ft
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Floor number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
                placeholder="e.g. 2nd Floor"
                className="w-full h-9 px-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white shadow-2xs focus:outline-none focus:border-[#1865F2]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Total Floor <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={totalFloor}
                onChange={(e) => setTotalFloor(e.target.value)}
                placeholder="e.g. 18 Floors"
                className="w-full h-9 px-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white shadow-2xs focus:outline-none focus:border-[#1865F2]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Construction Status <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-1">
                {["Ready to Move", "Under Construction"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setConstructionStatus(st)}
                    className={`px-2 py-1.5 rounded-lg text-[10.5px] font-semibold border transition-colors whitespace-nowrap ${
                      constructionStatus === st
                        ? "bg-[#1865F2] text-white border-[#1865F2]"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* About Property Textarea */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-[13px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                About Property
              </h4>
              <button
                type="button"
                onClick={handleGenerateAiDescription}
                className="text-[11px] font-semibold text-[#1865F2] hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer bg-blue-50/70 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors"
                title="Generate a description using property details"
              >
                <Sparkles size={12} />
                <span>Auto-generate with AI</span>
              </button>
            </div>
            <div className="relative border border-slate-200 rounded-xl p-3 bg-white shadow-2xs focus-within:border-[#1865F2]">
              <textarea
                rows={4}
                value={aboutDescription}
                onChange={(e) => setAboutDescription(e.target.value)}
                className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
              />
              <span className="block text-right text-[10.5px] text-slate-400 mt-1">
                {aboutDescription.length}/500
              </span>
            </div>
          </div>

          {/* Furnishing Type & Inclusions */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-6 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Furnish Type <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFurnishType(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        furnishType === f
                          ? "bg-[#1865F2] text-white border-[#1865F2]"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Facing <span className="text-rose-500">*</span>
                </label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                  className="h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                >
                  <option value="East">East</option>
                  <option value="North">North</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
              </div>
            </div>

            {/* Stepper Counters for Inclusions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { key: "ac", label: "AC", icon: "❄️" },
                { key: "bed", label: "Bed", icon: "🛏️" },
                { key: "lift", label: "Lift", icon: "🚪" },
                { key: "tv", label: "TV", icon: "📺" },
                { key: "sofa", label: "Sofa", icon: "🛋️" },
                { key: "ac2", label: "AC", icon: "❄️" },
                { key: "cabinet", label: "Cabinet", icon: "🗄️" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-slate-200 p-2 flex items-center justify-between bg-slate-50/50"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => updateInclusionCount(item.key, -1)}
                      className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[10px]"
                    >
                      -
                    </button>
                    <span className="font-bold text-[11px] w-3 text-center">
                      {inclusions[item.key] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateInclusionCount(item.key, 1)}
                      className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[10px]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 4: PRICE & AVAILABILITY ==================== */}
      {currentStep === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <h3 className="text-[17px] font-bold text-[#0B132B]">
              4. Price &amp; Availability
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Set the right price for your property. Provide accurate pricing details to attract genuine buyers or tenants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Box: Listing Price */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <h4 className="text-[13px] font-bold text-[#0B132B]">Listing Price</h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Sales Price <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-slate-400">₹</span>
                    <input
                      type="text"
                      value={salesPrice}
                      onChange={(e) => setSalesPrice(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Price per sq.ft <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-slate-400">₹</span>
                    <input
                      type="text"
                      value={pricePerSqft}
                      onChange={(e) => setPricePerSqft(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Total Price <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-slate-400">₹</span>
                    <input
                      type="text"
                      value={totalPrice}
                      onChange={(e) => setTotalPrice(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Discount <span className="text-rose-500">*</span>
                  </label>
                  {(() => {
                    const sp = parseInt(salesPrice.replace(/[^\d]/g, ""), 10);
                    const tp = parseInt(totalPrice.replace(/[^\d]/g, ""), 10);
                    const disc =
                      !isNaN(sp) && !isNaN(tp) && sp > tp && sp > 0
                        ? Math.round(((sp - tp) / sp) * 100)
                        : 0;
                    return (
                      <div className="h-10 px-3 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-xs font-extrabold text-rose-600">
                        {disc > 0 ? `${disc}% OFF` : "Standard Price"}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Price Suggestion Box */}
              <div className="p-3 rounded-xl bg-[#E6F9F0] border border-[#B3F0D2] flex items-center gap-3">
                <span className="text-lg">📊</span>
                <div>
                  <h5 className="text-[13px] font-extrabold text-[#00A859]">
                    ₹1.95 cr – ₹1.52cr
                  </h5>
                  <p className="text-[10px] text-slate-600">
                    Typical range for similar properties in Greater Noida West
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Additional Charges */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <h4 className="text-[13px] font-bold text-[#0B132B]">
                Additional Charges <span className="text-slate-400 font-normal">(Optional)</span>
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Maintenance Charges
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 relative flex items-center">
                    <span className="absolute left-3 text-xs text-slate-400">₹</span>
                    <input
                      type="text"
                      value={maintenanceCharges}
                      onChange={(e) => setMaintenanceCharges(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <select className="h-10 px-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
                    <option>Per month</option>
                    <option>Per year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Booking Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs text-slate-400">₹</span>
                  <input
                    type="text"
                    value={bookingAmount}
                    onChange={(e) => setBookingAmount(e.target.value)}
                    className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Other Charges
                </label>
                <input
                  type="text"
                  placeholder="Enter Amount( Optional)"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Pricing Terms (Negotiable) */}
          <div className="pt-2">
            <h4 className="text-[13px] font-bold text-[#0B132B] mb-2">Pricing Terms</h4>
            <div className="space-y-2">
              {[
                "Yes, sightly negotiable",
                "Yes, Open to negotiation",
                "No, fixed price",
              ].map((term) => (
                <label key={term} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingTerms"
                    checked={negotiable === term}
                    onChange={() => setNegotiable(term)}
                    className="w-4 h-4 text-[#1865F2] border-slate-300"
                  />
                  <span>{term}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 5: AMENITIES ==================== */}
      {currentStep === 5 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <h3 className="text-[17px] font-bold text-[#0B132B]">5. Amenities</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select The Amenities Available In Your Property And Society.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
            {amenitiesList.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setAmenitiesList((prev) =>
                    prev.map((a, i) => (i === idx ? { ...a, selected: !a.selected } : a))
                  );
                }}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer ${
                  item.selected
                    ? "border-[#1865F2] bg-blue-50/60 shadow-2xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-semibold text-slate-700 truncate max-w-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Location Advantage & Other Advantages Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
            {/* Left: Location Advantage */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-[13px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                Location advantage
              </h4>

              <div className="grid grid-cols-3 gap-3">
                {["Metro Station", "Mall", "School", "Airport", "Hospital", "Bank"].map((loc) => (
                  <div key={loc} className="rounded-xl border border-slate-200 p-2.5 bg-slate-50/50">
                    <span className="block text-[11px] font-bold text-slate-700 truncate mb-1">
                      {loc}
                    </span>
                    <select className="w-full text-[10px] h-7 px-1.5 rounded-lg border border-slate-200 bg-white">
                      <option>10 Min</option>
                      <option>15 Min</option>
                      <option>20 Min</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Other Advantages */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-[13px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                Other Advantages
              </h4>

              <div className="space-y-2">
                {[
                  { id: "well-maintained", title: "Well Maintained", sub: "Professional Management" },
                  { id: "active-comm", title: "Active Community", sub: "Regular Events & Activities" },
                  { id: "clean-green", title: "Clean & Green", sub: "Hygienic & Eco-Friendly" },
                ].map((adv) => {
                  const isChecked = selectedAdvantages.includes(adv.id);
                  return (
                    <div
                      key={adv.id}
                      onClick={() =>
                        setSelectedAdvantages((prev) =>
                          isChecked ? prev.filter((i) => i !== adv.id) : [...prev, adv.id]
                        )
                      }
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <h5 className="text-[12px] font-bold text-[#0B132B]">{adv.title}</h5>
                        <p className="text-[10px] text-slate-500">{adv.sub}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                          isChecked
                            ? "bg-[#1865F2] border-[#1865F2] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 6: MEDIA ==================== */}
      {currentStep === 6 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-[17px] font-bold text-[#0B132B]">6. Media</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add photos, videos and other media to make your listing stand out. High-quality media gets up to 3x more enquiries.
              </p>
            </div>
            <span className="text-[11px] text-slate-400">
              Drag and drop to reorder photos.
            </span>
          </div>

          {/* Media Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {["All Media", "Photos (8)", "Videos (2)", "Virtual Tour (1)", "Floor Plan (1)"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setActiveMediaFilter(m)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeMediaFilter === m
                    ? "bg-[#1865F2] text-white border-[#1865F2]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Photos Upload & Grid */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-[#0B132B]">Photos *</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {/* Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center bg-blue-50/40 hover:bg-blue-50/70 transition-colors cursor-pointer min-h-[120px]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Upload size={22} className="text-[#1865F2] mb-1.5" />
                <span className="text-[11px] font-bold text-[#1865F2]">Upload Photos</span>
                <span className="text-[9px] text-slate-400 mt-0.5">JPG, PNG up to 10MB</span>
              </div>

              {/* Dynamic uploaded photo thumbnails */}
              {uploadedPhotos.map((item) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[120px] group shadow-2xs">
                  <Image src={item.img} alt={item.tag} fill className="object-cover" />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                    {item.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(item.id)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 hover:bg-rose-500 text-white flex items-center justify-center text-[10px] cursor-pointer transition-colors shadow-xs"
                    title="Delete photo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Videos & 360 Tour Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-[13px] font-bold text-[#0B132B] mb-2">Videos *</h4>
              {uploadedVideo ? (
                <div className="rounded-xl border border-blue-200 p-4 bg-blue-50/50 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1865F2] text-white flex items-center justify-center shrink-0">
                      <Video size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0B132B] truncate max-w-[200px] sm:max-w-[260px]">{uploadedVideo.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{uploadedVideo.size} • Ready for buyers</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedVideo(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove video"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <Video size={24} className="text-[#1865F2] mb-2" />
                  <span className="text-xs font-bold text-slate-800">Upload Video Tour</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">MP4 or WEBM (Max 200 MB)</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-[13px] font-bold text-[#0B132B] mb-2">360° Virtual Tour</h4>
              {uploadedTour ? (
                <div className="rounded-xl border border-blue-200 p-4 bg-blue-50/50 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1865F2] text-white flex items-center justify-center shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0B132B] truncate max-w-[200px] sm:max-w-[260px]">{uploadedTour.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{uploadedTour.size} • 3D Interactive Tour</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedTour(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove 360 tour"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => tourInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <Sparkles size={24} className="text-[#1865F2] mb-2" />
                  <span className="text-xs font-bold text-slate-800">Upload 360° Tour</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">3D Interactive Tour file</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== STEP 7: PREVIEW (SCREENSHOTS 1 TO 4) ==================== */}
      {currentStep === 7 && !isSubmitted && (
        <div className="space-y-6">
          {/* 1. Property Highlights Box (Screenshot 1:1) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-3">
            <h4 className="text-[13.5px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
              Property Highlights
            </h4>
            <p className="text-xs text-slate-500">
              Select key highlights that make your property special
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {ALL_HIGHLIGHTS.map((h) => {
                const isSelected = propertyHighlights.includes(h);
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleHighlight(h)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#1865F2] text-white border-[#1865F2] shadow-2xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span>{isSelected ? "✓" : "+"}</span>
                    <span>{h}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SEO Keywords Box (Screenshot 1:1) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <h4 className="text-[13.5px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                SEO Keywords
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Add relevant keywords to help buyers find your property easily
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Popular Keywords (Span 7) */}
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Popular Keywords
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {POPULAR_KEYWORDS.map((kw) => {
                    const isSelected = seoKeywords.includes(kw);
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => toggleKeyword(kw)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#1865F2] text-white border-[#1865F2]"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span>{isSelected ? "✓" : "+"}</span>
                        <span>{kw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Keywords (Span 5) */}
              <div className="lg:col-span-5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-[#0B132B]">
                  Add custom keywords
                </span>
                <form onSubmit={handleAddCustomKeyword} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    placeholder="Type Keywords and press Enter"
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
                  >
                    ADD
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 3. Main Preview Section Header */}
          <div className="pt-2">
            <h3 className="text-[19px] font-bold text-[#0B132B]">
              7. Preview
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review all your property details before publishing your listing on Roofin.
            </p>
          </div>

          {/* Full Cascaded Preview Cards Matching Figma Screenshots 1 to 4 */}
          <div className="space-y-6">
            {/* 1. Property Basics (Figma Screenshot 1) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-5">
              <div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">
                  1. Property Basics
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Start with the basic property information.
                </p>
              </div>

              {/* Type & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Property Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {(["All", "Residential", "Commercial", "Plot/Land"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          if (type !== "All") setPropertyType(type as any);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          propertyType === type
                            ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2] shadow-2xs font-bold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Property Category <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {(["Sell", "Rent", "PG/Co-Living"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPropertyCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          propertyCategory === cat
                            ? "border-[#1865F2] bg-blue-50/70 text-[#1865F2] shadow-2xs font-bold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Society & Listed Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Society name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Project or Society name"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Listed Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-3.5 text-slate-400" />
                    <input
                      type="text"
                      readOnly
                      value={listedUserName}
                      className="w-full h-11 pl-9 pr-9 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-medium text-slate-700 cursor-not-allowed shadow-2xs"
                    />
                    <Lock size={14} className="absolute right-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Property Subtypes with Images */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-3">
                  Property Type <span className="text-rose-500">*</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {currentSubtypes.map((sub) => {
                    const isSelected = selectedSubtype === sub.label;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => setSelectedSubtype(sub.label)}
                        className={`rounded-xl border overflow-hidden transition-all cursor-pointer group bg-white shadow-2xs ${
                          isSelected
                            ? "border-[#1865F2] ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="relative h-18 sm:h-20 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={sub.img}
                            alt={sub.label}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as any).src = "/images/properties/villa-popular-figma.jpg";
                            }}
                          />
                        </div>
                        <div className="p-2 text-center">
                          <span
                            className={`block text-[11px] truncate leading-tight ${
                              isSelected ? "font-bold text-[#1865F2]" : "font-medium text-slate-700"
                            }`}
                          >
                            {sub.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Location (Figma Screenshot 1 & 2) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">
                  2. Location
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Where is your property location? Add the exact location so buyers can find your property easily.
                </p>
              </div>

              {/* Location Search Input */}
              <div className="relative flex items-center border border-slate-200 rounded-xl px-4 py-2.5 bg-white shadow-2xs focus-within:border-[#1865F2]">
                <Search size={16} className="text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search property location"
                  className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                {locationSearch && (
                  <button
                    type="button"
                    onClick={() => setLocationSearch("")}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Popular Locations Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <span className="text-[11px] text-slate-400 font-medium shrink-0">
                  Popular locations
                </span>
                {[
                  "Greater Noida West",
                  "Noida Extension",
                  "Sector 1",
                  "Sector 4",
                  "Sector 10",
                  "Tech Zone 4",
                  "Gaur City",
                  "Noida",
                ].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationSearch(loc)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors shrink-0 cursor-pointer ${
                      locationSearch.includes(loc)
                        ? "bg-[#1865F2] text-white border-[#1865F2]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              {/* Map & Right Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                {/* Map View Box (Span 7) */}
                <div className="lg:col-span-7 relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src="/temp_check_img2.jpg"
                    alt="Map View"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as any).src = "/banner/price_trends.png";
                    }}
                  />

                  {/* Pin Tooltip */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-md">
                      Drag the pin to adjust the exact location
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center border-2 border-white shadow-lg mt-1">
                      <MapPin size={16} />
                    </div>
                  </div>

                  {/* Map / Satellite Toggle */}
                  <div className="absolute bottom-3 right-3 flex items-center rounded-xl bg-white/95 border border-slate-200 p-0.5 shadow-md text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setMapMode("map")}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        mapMode === "map" ? "bg-[#1865F2] text-white" : "text-slate-600"
                      }`}
                    >
                      Map View
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapMode("satellite")}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        mapMode === "satellite" ? "bg-[#1865F2] text-white" : "text-slate-600"
                      }`}
                    >
                      Satellite View
                    </button>
                  </div>
                </div>

                {/* Form Inputs (Span 5) */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        City <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                      >
                        <option value="Greater Noida">Greater Noida</option>
                        <option value="Noida">Noida</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Locality/Sector <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                        placeholder="e.g. Noida Extension"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tower/ Block
                      </label>
                      <input
                        type="text"
                        value={towerBlock}
                        onChange={(e) => setTowerBlock(e.target.value)}
                        placeholder="e.g. Tower A"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Pin Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-digit pincode"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] bg-white shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2] shadow-2xs"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5">
                    <MapPin size={18} className="text-[#1865F2] shrink-0" />
                    <div>
                      <h6 className="text-[11.5px] font-bold text-[#1865F2]">
                        Pin Your Property on the Map
                      </h6>
                      <p className="text-[10px] text-slate-500">
                        Drag the pin to the exact location of your property.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Details (Figma Screenshot 2) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">
                  3. Details
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Share the key details about property.
                </p>
              </div>

              {/* Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Configuration <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setBhk(val)}
                        className={`px-2 py-1.5 rounded-lg text-[10.5px] font-semibold border transition-colors ${
                          bhk === val
                            ? "bg-[#1865F2] text-white border-[#1865F2]"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Build up Area <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden h-9 shadow-2xs">
                    <input
                      type="text"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(e.target.value)}
                      className="w-full px-2.5 text-xs text-slate-800 focus:outline-none"
                    />
                    <span className="px-2 text-[11px] text-slate-400 bg-slate-50 border-l border-slate-200 h-full flex items-center">
                      Sq.ft
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Floor number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={floorNumber}
                    onChange={(e) => setFloorNumber(e.target.value)}
                    placeholder="e.g. 2nd Floor"
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white shadow-2xs focus:outline-none focus:border-[#1865F2]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Total Floor <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={totalFloor}
                    onChange={(e) => setTotalFloor(e.target.value)}
                    placeholder="e.g. 18 Floors"
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white shadow-2xs focus:outline-none focus:border-[#1865F2]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Construction Status <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {["Ready to Move", "Under Construction"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setConstructionStatus(st)}
                        className={`px-2 py-1.5 rounded-lg text-[10.5px] font-semibold border transition-colors whitespace-nowrap ${
                          constructionStatus === st
                            ? "bg-[#1865F2] text-white border-[#1865F2]"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* About Property */}
              <div className="pt-2">
                <h5 className="text-[13px] font-bold text-[#1865F2] mb-1.5 border-l-2 border-[#1865F2] pl-2">
                  About Property
                </h5>
                <div className="relative border border-slate-200 rounded-xl p-3 bg-white shadow-2xs focus-within:border-[#1865F2]">
                  <textarea
                    rows={4}
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
                  />
                  <span className="block text-right text-[10.5px] text-slate-400 mt-1">
                    {aboutDescription.length}/500
                  </span>
                </div>
              </div>

              {/* Furnishing Type & Inclusions */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-6 mb-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Furnish Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFurnishType(f)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                            furnishType === f
                              ? "bg-[#1865F2] text-white border-[#1865F2]"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Facing <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                      className="h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                    >
                      <option value="East">East</option>
                      <option value="North">North</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                    </select>
                  </div>
                </div>

                {/* Inclusions Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {[
                    { key: "ac", label: "AC", icon: "❄️" },
                    { key: "bed", label: "Bed", icon: "🛏️" },
                    { key: "lift", label: "Lift", icon: "🚪" },
                    { key: "tv", label: "TV", icon: "📺" },
                    { key: "sofa", label: "Sofa", icon: "🛋️" },
                    { key: "ac2", label: "AC", icon: "❄️" },
                    { key: "cabinet", label: "Cabinet", icon: "🗄️" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="rounded-xl border border-slate-200 p-2 flex items-center justify-between bg-slate-50/50"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <button
                          type="button"
                          onClick={() => updateInclusionCount(item.key, -1)}
                          className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[10px] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-[11px] w-3 text-center">
                          {inclusions[item.key] || 0}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateInclusionCount(item.key, 1)}
                          className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-[10px] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Plan Dropdowns */}
              <div className="pt-2">
                <h5 className="text-[13px] font-bold text-[#1865F2] mb-2 border-l-2 border-[#1865F2] pl-2">
                  Floor Plan
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    "Living Room",
                    "Modular Kitchen",
                    "Bedrooms",
                    "Bathrooms",
                    "Balconies",
                  ].map((fp) => (
                    <div key={fp}>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {fp} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={floorPlanCounts[fp] || 1}
                        onChange={(e) =>
                          setFloorPlanCounts((prev) => ({
                            ...prev,
                            [fp]: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full h-9 px-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights Checklist (Figma 1:1 dual column) */}
              <div className="pt-2">
                <h5 className="text-[13px] font-bold text-[#1865F2] mb-2 border-l-2 border-[#1865F2] pl-2">
                  Key Highlights
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-slate-200 bg-slate-50/40">
                  {/* Left Column Checklist */}
                  <div className="space-y-2.5">
                    {[
                      "Prime Location With Excellent Connectivity",
                      "Well- Ventilated Home With Ample Natural Light",
                      "Modern Design With Premium Fittings",
                      "Vastu Compliant Home",
                      "Gated Community With 24*7 Security",
                      "Close To Schools, Hospitals &Shopping Hubs",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Checkboxes */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Gated Society", checked: true },
                      { label: "Server Room", checked: true },
                      { label: "Corner Property", checked: false },
                      { label: "Vastu Compliant", checked: false },
                      { label: "Gated Society", checked: true },
                      { label: "Gated Society", checked: true },
                      { label: "Corner Property", checked: false },
                      { label: "Corner Property", checked: false },
                    ].map((box, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          defaultChecked={box.checked}
                          className="w-4 h-4 rounded text-[#1865F2] border-slate-300"
                        />
                        <span className="text-[11.5px] font-medium">{box.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Price & Availability (Figma Screenshot 2 & 3) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">
                  4. Price &amp; Availability
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set the right price for your property. Provide accurate pricing details to attract genuine buyers or tenants.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Listing Price */}
                <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h5 className="text-[13px] font-bold text-[#0B132B]">Listing Price</h5>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sales Price <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs text-slate-400">₹</span>
                        <input
                          type="text"
                          value={salesPrice}
                          onChange={(e) => setSalesPrice(e.target.value)}
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Price per sq.ft <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs text-slate-400">₹</span>
                        <input
                          type="text"
                          value={pricePerSqft}
                          onChange={(e) => setPricePerSqft(e.target.value)}
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Total Price <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs text-slate-400">₹</span>
                        <input
                          type="text"
                          value={totalPrice}
                          onChange={(e) => setTotalPrice(e.target.value)}
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1865F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Discount <span className="text-rose-500">*</span>
                      </label>
                      {(() => {
                        const sp = parseInt(salesPrice.replace(/[^\d]/g, ""), 10);
                        const tp = parseInt(totalPrice.replace(/[^\d]/g, ""), 10);
                        const disc =
                          !isNaN(sp) && !isNaN(tp) && sp > tp && sp > 0
                            ? Math.round(((sp - tp) / sp) * 100)
                            : 0;
                        return (
                          <div className="h-10 px-3 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-xs font-extrabold text-rose-600">
                            {disc > 0 ? `${disc}% OFF` : "Standard Price"}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Price Suggestion Box */}
                  <div className="p-3 rounded-xl bg-[#E6F9F0] border border-[#B3F0D2] flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-medium">Based on your area and property details</span>
                      <h6 className="text-[13.5px] font-extrabold text-[#00A859]">
                        ₹1.95 cr–₹1.52cr
                      </h6>
                      <p className="text-[10px] text-slate-600">
                        Typical range for similar properties in Greater Noida West
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Additional Charges */}
                <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h5 className="text-[13px] font-bold text-[#0B132B]">
                    Additional Charges <span className="text-slate-400 font-normal">(Optional)</span>
                  </h5>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Maintenance Charges
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2 relative flex items-center">
                        <span className="absolute left-3 text-xs text-slate-400">₹</span>
                        <input
                          type="text"
                          value={maintenanceCharges}
                          onChange={(e) => setMaintenanceCharges(e.target.value)}
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <select className="h-10 px-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
                        <option>Per month</option>
                        <option>Per year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Booking Amount
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs text-slate-400">₹</span>
                      <input
                        type="text"
                        value={bookingAmount}
                        onChange={(e) => setBookingAmount(e.target.value)}
                        className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Other Charges
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Amount( Optional)"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Terms & Justification (Screenshot 3) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h5 className="text-[13px] font-bold text-[#0B132B] mb-1.5">Pricing Terms</h5>
                  <span className="block text-[11px] text-slate-500 mb-2 font-medium">Negotiable</span>
                  <div className="space-y-2">
                    {[
                      "Yes, sightly negotiable",
                      "Yes, Open to negotiation",
                      "No, fixed price",
                    ].map((term) => (
                      <label key={term} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="pricingTermsPreview"
                          checked={negotiable === term}
                          onChange={() => setNegotiable(term)}
                          className="w-4 h-4 text-[#1865F2] border-slate-300"
                        />
                        <span>{term}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[13px] font-bold text-[#0B132B] mb-1">
                    Price Justification <span className="text-slate-400 font-normal">(Optional)</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Add a few details that justify your price(eg. prime location, premium interior, corner unit)
                  </p>
                  <div className="relative border border-slate-200 rounded-xl p-3 bg-white shadow-2xs">
                    <textarea
                      rows={3}
                      value={priceJustification}
                      onChange={(e) => setPriceJustification(e.target.value)}
                      className="w-full text-xs text-slate-800 focus:outline-none resize-none leading-relaxed"
                    />
                    <span className="block text-right text-[10px] text-slate-400 mt-1">
                      {priceJustification.length}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Amenities (Figma Screenshot 3) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">5. Amenities</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select The Amenities Available In Your Property And Society.
                </p>
              </div>

              {/* 9 Amenities Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
                {amenitiesList.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setAmenitiesList((prev) =>
                        prev.map((a, i) => (i === idx ? { ...a, selected: !a.selected } : a))
                      );
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer ${
                      item.selected
                        ? "border-[#1865F2] bg-blue-50/60 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] font-semibold text-slate-700 truncate max-w-full">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Location Advantage & Other Advantages Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
                {/* Location advantage */}
                <div className="lg:col-span-6 space-y-3">
                  <h5 className="text-[13px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                    Location advantage
                  </h5>

                  <div className="grid grid-cols-3 gap-3">
                    {["Metro Station", "Mall", "School", "Airport", "Hospital", "Bank"].map((loc) => (
                      <div key={loc} className="rounded-xl border border-slate-200 p-2.5 bg-slate-50/50">
                        <span className="block text-[11px] font-bold text-slate-700 truncate mb-1">
                          {loc}
                        </span>
                        <select className="w-full text-[10px] h-7 px-1.5 rounded-lg border border-slate-200 bg-white">
                          <option>Min</option>
                          <option>5 Min</option>
                          <option>10 Min</option>
                          <option>15 Min</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Advantages */}
                <div className="lg:col-span-6 space-y-3">
                  <h5 className="text-[13px] font-bold text-[#1865F2] border-l-2 border-[#1865F2] pl-2">
                    Other Advantages
                  </h5>

                  <div className="space-y-2">
                    {[
                      { id: "well-maintained", title: "Well Maintained", sub: "Professional Management" },
                      { id: "active-comm", title: "Active Community", sub: "Regular Events & Activities" },
                      { id: "clean-green", title: "Clean & Green", sub: "Hygienic & Eco-Friendly" },
                    ].map((adv) => {
                      const isChecked = selectedAdvantages.includes(adv.id);
                      return (
                        <div
                          key={adv.id}
                          onClick={() =>
                            setSelectedAdvantages((prev) =>
                              isChecked ? prev.filter((i) => i !== adv.id) : [...prev, adv.id]
                            )
                          }
                          className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div>
                            <h6 className="text-[12px] font-bold text-[#0B132B]">{adv.title}</h6>
                            <p className="text-[10px] text-slate-500">{adv.sub}</p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                              isChecked
                                ? "bg-[#1865F2] border-[#1865F2] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check size={14} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Market Outlook (Screenshot 3) */}
              <div className="pt-2 border-t border-slate-100">
                <h5 className="text-[13px] font-bold text-[#1865F2] mb-2.5">
                  Market Outlook
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    "Price Growth",
                    "Rental Demand",
                    "Connectivity",
                    "Future Potentials",
                    "Infrastructure Growth",
                  ].map((mo) => (
                    <div key={mo}>
                      <span className="block text-[10.5px] font-semibold text-slate-600 mb-1 truncate">
                        {mo}
                      </span>
                      <select className="w-full h-8 px-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
                        <option>4.5/10</option>
                        <option>4.0/10</option>
                        <option>5.0/10</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Media (Figma Screenshot 3 & 4) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-[16px] font-bold text-[#0B132B]">6. Media</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add photos, videos and other media to make your listing stand out. High-quality media gets up to 3x more enquiries.
                  </p>
                </div>
                <span className="text-[11px] text-slate-400">
                  Drag and drop to reorder photos.
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {["All Media", "Photos 8", "Videos 2", "Virtual Tour 1", "Floor Plan 1"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setActiveMediaFilter(m)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      activeMediaFilter === m
                        ? "bg-[#1865F2] text-white border-[#1865F2]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Photos Grid (Figma 1:1) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-[13px] font-bold text-[#0B132B]">Photos <span className="text-rose-500">*</span></h5>
                  <button type="button" className="text-xs text-[#1865F2] font-semibold hover:underline">See all</button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {/* Upload Photos Card */}
                  <div className="rounded-xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center bg-blue-50/40 hover:bg-blue-50/70 transition-colors cursor-pointer min-h-[120px]">
                    <Upload size={22} className="text-[#1865F2] mb-1.5" />
                    <span className="text-[11px] font-bold text-[#1865F2]">Upload Photos</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Drag and drop or click to upload<br />JPG, PNG OR WEBP (Max 10 MB each)</span>
                    <button type="button" className="mt-2 px-3 py-1 bg-[#1865F2] text-white rounded-lg text-[10px] font-bold">
                      Select Photos
                    </button>
                  </div>

                  {/* Render uploaded photos dynamically */}
                  {uploadedPhotos.map((p, idx) => {
                    const isSelected = selectedPhotoId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPhotoId(p.id)}
                        className={`relative rounded-xl overflow-hidden border bg-slate-100 min-h-[120px] group transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#1865F2] ring-2 ring-[#1865F2] shadow-sm"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Image src={p.img} alt={p.tag} fill className="object-cover" />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                          {idx === 0 ? "Cover" : `0${idx + 1}`}
                        </span>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-semibold truncate max-w-[90%]">
                          {p.tag}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto(p.id);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 hover:bg-rose-500 text-white flex items-center justify-center text-[10px] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}

                  {/* Add More Card */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative rounded-xl border border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 p-3 flex flex-col items-center justify-center text-center min-h-[120px] cursor-pointer"
                  >
                    <Plus size={20} className="text-slate-500 mb-1" />
                    <span className="text-[11px] font-bold text-slate-700">Add More</span>
                  </div>
                </div>

                {/* Selected Photo Action Bar */}
                {selectedPhotoId && (
                  <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() => setSelectedPhotoId("")}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        ✕
                      </span>
                      <span className="font-semibold text-slate-700 text-[11px]">Selected: 1 photo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTriggerReplacePhoto(selectedPhotoId)}
                        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>🔁</span> Replace Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetCoverPhoto(selectedPhotoId)}
                        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>⭐</span> Set as Cover
                      </button>
                      <button
                        type="button"
                        onClick={() => toast.success("Photo caption saved")}
                        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>📝</span> Add Caption
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteSelectedPhoto}
                        className="px-3 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 text-[11px] font-semibold text-rose-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Videos & 360 Tour Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Videos */}
                <div className="space-y-3">
                  <h5 className="text-[13px] font-bold text-[#0B132B]">Videos <span className="text-rose-500">*</span></h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="rounded-xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center bg-blue-50/40 hover:bg-blue-50/70 transition-colors cursor-pointer min-h-[130px]"
                    >
                      <Video size={22} className="text-[#1865F2] mb-1.5" />
                      <span className="text-[11px] font-bold text-[#1865F2]">Update Video</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">MP4 or WEBM (Max 200 MB)</span>
                      <button type="button" className="mt-2 px-3 py-1 bg-white border border-[#1865F2] text-[#1865F2] rounded-lg text-[10px] font-bold">
                        Select Video
                      </button>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[130px] flex flex-col justify-between p-3">
                      {uploadedVideo ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#1865F2] text-[9px] font-bold">Video Tour</span>
                            <button
                              type="button"
                              onClick={() => setUploadedVideo(null)}
                              className="w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 truncate">{uploadedVideo.name}</p>
                            <p className="text-[10px] text-slate-500">{uploadedVideo.size}</p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                          <Video size={20} className="mb-1 text-slate-300" />
                          <span>No video uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 360° Tour */}
                <div className="space-y-3">
                  <h5 className="text-[13px] font-bold text-[#0B132B]">360° Tour</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => tourInputRef.current?.click()}
                      className="rounded-xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center bg-blue-50/40 hover:bg-blue-50/70 transition-colors cursor-pointer min-h-[130px]"
                    >
                      <Sparkles size={22} className="text-[#1865F2] mb-1.5" />
                      <span className="text-[11px] font-bold text-[#1865F2]">Upload 360 Tour</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">3D Interactive Tour file</span>
                      <button type="button" className="mt-2 px-3 py-1 bg-white border border-[#1865F2] text-[#1865F2] rounded-lg text-[10px] font-bold">
                        Select File
                      </button>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[130px] flex flex-col justify-between p-3">
                      {uploadedTour ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">360° Tour</span>
                            <button
                              type="button"
                              onClick={() => setUploadedTour(null)}
                              className="w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 truncate">{uploadedTour.name}</p>
                            <p className="text-[10px] text-slate-500">{uploadedTour.size}</p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                          <Sparkles size={20} className="mb-1 text-slate-300" />
                          <span>No tour uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Plan (1) */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[13px] font-bold text-[#0B132B]">Floor Plan (1)</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => floorPlanInputRef.current?.click()}
                    className="rounded-xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center bg-blue-50/40 hover:bg-blue-50/70 transition-colors cursor-pointer min-h-[120px]"
                  >
                    <FileText size={22} className="text-[#1865F2] mb-1.5" />
                    <span className="text-[11px] font-bold text-[#1865F2]">Upload Floor Plan</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">JPG, PNG OR PDF (Max 200 MB)</span>
                    <button type="button" className="mt-2 px-3 py-1 bg-white border border-[#1865F2] text-[#1865F2] rounded-lg text-[10px] font-bold">
                      Select File
                    </button>
                  </div>

                  {uploadedFloorPlan ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 min-h-[120px] flex flex-col justify-between p-3">
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold">Floor Plan</span>
                        <button
                          type="button"
                          onClick={() => setUploadedFloorPlan(null)}
                          className="w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs font-bold text-slate-800 truncate">{uploadedFloorPlan.name}</p>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[120px] flex items-center justify-center text-slate-400 text-xs">
                      <span>Standard 2D/3D Plan</span>
                    </div>
                  )}

                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[120px] flex items-center justify-center text-slate-400 text-xs">
                    <span>Layout Specifications</span>
                  </div>
                </div>
              </div>

              {/* Brochure Section (Screenshot 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div
                  onClick={() => brochureInputRef.current?.click()}
                  className="rounded-2xl border border-slate-200 p-4 flex items-center gap-3 bg-white hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#1865F2] flex items-center justify-center font-bold text-lg shrink-0">
                    +
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-[#0B132B]">
                      {uploadedBrochure ? uploadedBrochure.name : "Brochure"}
                    </h6>
                    <p className="text-[10px] text-slate-400">
                      {uploadedBrochure ? `${uploadedBrochure.size} • Attached` : "Upload PDF Of Brochure"}
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    if (uploadedBrochure) {
                      toast.success(`Viewing brochure: ${uploadedBrochure.name}`);
                    } else {
                      toast("Please upload a brochure first", { icon: "ℹ️" });
                    }
                  }}
                  className="rounded-2xl border border-slate-200 p-4 flex items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs font-bold text-[#0B132B]">
                    {uploadedBrochure ? "✓ View Brochure (PDF)" : "View Brochure"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CELEBRATION SUCCESS SCREEN (SCREENSHOT 5 1:1) ==================== */}
      {isSubmitted && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* 3D Isometric Building with Confetti Illustration */}
          <div className="relative w-72 sm:w-84 h-64 sm:h-76 mx-auto">
            <Image
              src="/post-property/property_submitted_success.png"
              alt="Property Submitted Successfully"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-[26px] sm:text-[30px] font-black text-[#0B132B] tracking-tight">
              Property Submitted !
            </h2>
            <p className="text-xs sm:text-[14px] text-slate-500 font-medium">
              Your property has been submited successfully and is under review.
            </p>
          </div>

          {/* 4-Stage Horizontal Status Tracker */}
          <div className="max-w-md mx-auto flex items-center justify-between relative py-2">
            {[
              { label: "Submitted", status: "done" },
              { label: "Verification", status: "active" },
              { label: "Approved", status: "pending" },
              { label: "Live", status: "pending" },
            ].map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step.status === "done"
                      ? "bg-[#00A859] text-white shadow-xs"
                      : step.status === "active"
                      ? "bg-[#1865F2] text-white shadow-xs"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-2">
                  {step.label}
                </span>
              </div>
            ))}
            {/* Connecting line behind circles */}
            <div className="absolute top-[26px] inset-x-8 h-1 bg-slate-200 -z-0">
              <div className="h-full bg-gradient-to-r from-[#00A859] to-[#1865F2] w-1/3" />
            </div>
          </div>

          {/* Green Information Notice Banner */}
          <div className="max-w-xl mx-auto rounded-2xl bg-[#E6F9F0] border border-[#B3F0D2] p-4 flex items-center gap-3.5 text-left">
            <div className="w-8 h-8 rounded-full bg-[#00A859] text-white flex items-center justify-center shrink-0">
              <Check size={18} strokeWidth={3} />
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-snug">
              We Usually Review Approve Listing Within 24 Hours. You Will Be Notified Once Your Property Gets Live.
            </p>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onComplete}
              className="px-7 py-3 rounded-xl border border-[#1865F2] text-[#1865F2] bg-white hover:bg-blue-50 font-bold text-xs transition-all shadow-2xs cursor-pointer"
            >
              Go to My Properties
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="px-8 py-3 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer active:scale-98"
            >
              Post Another Property
            </button>
          </div>
        </div>
      )}

      {/* 4. Bottom Action Bar (Figma 1:1) - For steps 2 to 7 */}
      {!isSubmitted && currentStep > 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:px-6 shadow-2xs flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FileText size={14} className="text-slate-400" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-98"
            >
              <span>{currentStep === 7 ? "Publish Listing" : "Save & Continue"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Inputs for Native System File Dialogs */}
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoUpload}
        accept="video/*"
        className="hidden"
      />
      <input
        type="file"
        ref={tourInputRef}
        onChange={handleTourUpload}
        accept=".mp4,.webm,.mov,.zip"
        className="hidden"
      />
      <input
        type="file"
        ref={floorPlanInputRef}
        onChange={handleFloorPlanUpload}
        accept="image/*,.pdf"
        className="hidden"
      />
      <input
        type="file"
        ref={brochureInputRef}
        onChange={handleBrochureUpload}
        accept=".pdf"
        className="hidden"
      />
      <input
        type="file"
        ref={replacePhotoInputRef}
        onChange={handleReplacePhotoFile}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
