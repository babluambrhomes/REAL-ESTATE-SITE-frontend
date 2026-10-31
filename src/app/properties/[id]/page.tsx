"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowRight,
  BadgePercent,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronUp,
  Heart,
  Eye,
  Share2,
  Zap,
  MessageSquare,
  Phone,
  Star,
  UserRound,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Images,
  MapPin,
  X,
  FlipHorizontal2,
  NotebookPen,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import ViewMap from "@/components/common/ViewMap";
import { PropertyCard } from "@/components/card/PropertyCard";
import { PropertyBrochureModal } from "@/components/property-detail/PropertyBrochureModal";
import { PropertyGalleryModal } from "@/components/property-detail/PropertyGalleryModal";
import { PropertyVideoModal } from "@/components/property-detail/PropertyVideoModal";
import { PropertyReportModal } from "@/components/property-detail/PropertyReportModal";
import { properties } from "@/data/properties";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";
import Select from "react-select";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// ─── STATIC DATA MATCHING FIGMA & SIR'S STRUCTURE ──────────────────────────────

const COUNTRY_CODE_OPTIONS = [
  { value: "+91", label: "IND (+91)" },
  { value: "+1", label: "US (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+61", label: "AUS (+61)" },
];

const TOC_MAIN_TABS = [
  { id: "overview", label: "Overview", icon: true },
  { id: "property-details", label: "Property Details" },
  { id: "dealer-details", label: "Dealer Details" },
  { id: "price-trends", label: "Price Trends" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQS" },
  { id: "recommendations", label: "Recommendations" },
];

const TOC_SUB_TABS = [
  { id: "about-property", label: "About Property" },
  { id: "amenities", label: "Amenities" },
  { id: "society", label: "Society" },
  { id: "floor-plan", label: "Floor Plan" },
  { id: "key-highlights", label: "Key Highlights" },
  { id: "why-roofin", label: "Why Roofin" },
];

const SEMIFURNISHED_ITEMS = [
  { name: "Rent", value: "₹ 30k/M", image: "/semifurnished_icon/rent.png" },
  { name: "AC", value: "2", image: "/semifurnished_icon/ac.png" },
  { name: "Bed", value: "4", image: "/semifurnished_icon/bed.png" },
  { name: "Lift", value: "1", image: "/semifurnished_icon/lift.png" },
  { name: "TV", value: "1", image: "/semifurnished_icon/tv.png" },
  { name: "Sofa", value: "1", image: "/semifurnished_icon/sofa.png" },
  { name: "Refrigerator", value: "2", image: "/semifurnished_icon/refrigerator.png" },
  { name: "Power Backup", value: "Full", image: "/semifurnished_icon/power_backup.png" },
  { name: "Bathroom", value: "2", image: "/semifurnished_icon/bathroom.png" },
  { name: "Cabinet", value: "2", image: "/semifurnished_icon/cabinet.png" },
  { name: "Stove", value: "Full", image: "/semifurnished_icon/stove.png" },
  { name: "Washing Machine", value: "0", image: "/semifurnished_icon/washing_machine.png" },
  { name: "Dining Table", value: "1", image: "/semifurnished_icon/dining_table.png" },
  { name: "Microwave", value: "1", image: "/semifurnished_icon/microwave.png" },
];

const SOCIETY_AMENITIES = [
  { name: "GYM", image: "/amenities/gym.png" },
  { name: "Swimming pool", image: "/amenities/swimming_pool.png" },
  { name: "Gas pipeline", image: "/amenities/gas_pipeline.png" },
  { name: "Parking", image: "/amenities/parking.png" },
  { name: "Children Park", image: "/amenities/children_park.png" },
  { name: "Club House", image: "/amenities/club_house.png" },
  { name: "7x24 Security", image: "/amenities/security.png" },
  { name: "Cctv surveillia...", image: "/amenities/cctv_surveilliance.png" },
  { name: "Cctv surveillia...", image: "/amenities/water_supply.png" },
];

const SOCIETY_STATS = [
  { label: "Towers", value: "3" },
  { label: "Total Units", value: "420" },
  { label: "Total Units", value: "4.5", unit: "Acers" },
  { label: "Open Space", value: "70%" },
  { label: "Years Of Trust", value: "8+" },
];

const SOCIETY_HIGHLIGHTS = [
  {
    name: "Well Maintained",
    description: "Professional Management",
    image: "/society/well_maintained.png",
  },
  {
    name: "Active Community",
    description: "Regular Events & Activities",
    image: "/society/active_community.png",
  },
  {
    name: "Clean & Green",
    description: "Hygienic & Eco-Friendly",
    image: "/society/clean_green.png",
  },
  {
    name: "Pet Friendly",
    description: "Pets Are Welcome",
    image: "/society/pet_friendly.png",
  },
];

const KEY_HIGHLIGHTS = [
  "Prime Location With Excellent Connectivity",
  "Well- Ventilated Home With Ample Natural Light",
  "Modern Design With Premium Fittings",
  "Vastu Compliant Home",
  "Vastu Compliant Home",
  "Gated Community With 24*7 Security",
  "Close To Schools, Hospitals &Shopping Hubs",
];

const LOCATION_ADVANTAGES = [
  { name: "Metro Station", time: "10 Min", image: "/location_advantage/metro_station.png" },
  { name: "Mall", time: "25 Min", image: "/location_advantage/mall.png" },
  { name: "School", time: "8 Min", image: "/location_advantage/school.png" },
  { name: "Airport", time: "35 Min", image: "/location_advantage/airport.png" },
  { name: "Hospital", time: "6 Min", image: "/location_advantage/hospital.png" },
  { name: "Bank", time: "4 Min", image: "/location_advantage/bank.png" },
];

const WHY_ROOFIN_ITEMS = [
  {
    name: "Verified Properties",
    description: "All Properties Are Rera Verified",
    image: "/icon/verified.png",
  },
  {
    name: "Best Price Promise",
    description: "Get the best price with no hidden cost",
    image: "/icon/best_price.png",
  },
  {
    name: "After Sales Support",
    description: "We're With You Always",
    image: "/icon/support.png",
  },
];

const BANK_PARTNERS = [
  { name: "SBI", rate: "7.3%", logo: "/banks/sbi.png" },
  { name: "ICICI Bank", rate: "7.1%", logo: "/banks/icici.png" },
  { name: "PNB Housing", rate: "7.5%", logo: "/banks/pnb.png" },
  { name: "AXIS BANK", rate: "7.3%", logo: "/banks/axis.png" },
  { name: "HDFC BANK", rate: "7.1%", logo: "/banks/hdfc.png" },
  { name: "Bank of Baroda", rate: "7.5%", logo: "/banks/bankofbaroda.png" },
  { name: "YES BANK", rate: "7.1%", logo: "/banks/yesbank.png" },
  { name: "KOTAK", rate: "7.5%", logo: "/banks/kotak.png" },
];

const PRICE_TREND_DATA = [
  { year: "2021", rate: 20000 },
  { year: "2022", rate: 23000 },
  { year: "2023", rate: 28000 },
  { year: "2024", rate: 46000 },
  { year: "2025", rate: 52000 },
  { year: "2026", rate: 58000 },
];

const PRICE_TICKS = [
  4000, 8000, 12000, 16000, 20000, 24000, 28000, 32000, 36000, 40000, 44000, 48000, 52000, 56000, 60000, 64000,
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Ritik Singh",
    rating: 5,
    date: "10/7/2022",
    time: "1:10:37 AM",
    avatarBg: "bg-purple-600",
    text: "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
  },
  {
    id: 2,
    name: "Ritik Singh",
    rating: 4,
    date: "10/7/2022",
    time: "1:10:37 AM",
    avatarBg: "bg-rose-700",
    text: "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
  },
];

const FAQS_DATA = [
  {
    question: "What documents should I check before buying a 3 BHK property?",
    answer:
      "Verify the RERA registration, title deed, approvals, occupancy certificate (if ready), and builder documents.",
  },
  {
    question: "Can I get a home loan for a 3 BHK property?",
    answer:
      "Yes, home loans are available from 40+ leading partner banks including SBI, HDFC, and ICICI with interest rates starting at 7.1%.",
  },
  {
    question: "How do I choose the right 3 BHK apartment?",
    answer:
      "Consider carpet area, floor level, ventilation, developer track record, maintenance fees, and nearby road/metro connectivity.",
  },
  {
    question: "Is a 3 BHK suitable for rental income?",
    answer:
      "Yes, luxury 3 BHK homes in prime sectors like Sector 103 Noida Extension command high rental demand from working professionals and families.",
  },
  {
    question: "What should I look for during a site visit?",
    answer:
      "Check actual construction quality, natural sunlight, ceiling heights, elevator brands, security gates, and society clubhouse amenities.",
  },
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // ─── STATE MANAGEMENT ────────────────────────────────────────────────────────
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("about-property");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(10);
  const [showConfig, setShowConfig] = useState(false);
  const [showAboutMore, setShowAboutMore] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [trendMode, setTrendMode] = useState<"locality" | "societies">("locality");
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);

  // Enquiry Form State
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE_OPTIONS[0]);
  const [enquiryMsg, setEnquiryMsg] = useState("I am interested in this property.");
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Interactive Modals & UI States
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showMapPopup, setShowMapPopup] = useState(true);

  // ─── RESOLVE PROPERTY DATA ───────────────────────────────────────────────────
  const paramId = typeof params?.id === "string" ? params.id : "1";
  const property: Property = useMemo(() => {
    return (
      properties.find(
        (p) => String(p.id) === paramId || p.slug === paramId
      ) || properties[0]
    );
  }, [paramId]);

  const images = useMemo(() => {
    const figmaDefaultImages = [
      "/images/properties/night-tower-figma.jpg",
      "/images/properties/villa-popular-figma.jpg",
      "/images/properties/max-estate-tower.png",
      "/images/properties/luxury-living-room.jpg",
    ];

    if (property.images && property.images.length > 0) {
      if (property.images.includes("/images/properties/night-tower-figma.jpg")) {
        const rest = property.images.filter((img) => img !== "/images/properties/night-tower-figma.jpg");
        return ["/images/properties/night-tower-figma.jpg", ...rest];
      }
      return property.images;
    }
    return figmaDefaultImages;
  }, [property]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (!agreedTerms) {
      toast.error("Please agree to the Terms & Privacy Policy");
      return;
    }
    toast.success("Enquiry sent to dealer successfully! An agent will call you shortly.");
    setEnquiryName("");
    setEnquiryPhone("");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-[#0B132B]">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP ANNOUNCEMENT BAR (MATCHES FIGMA SCREENSHOT 1)                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {!isBannerDismissed && (
        <div className="relative bg-[#1865F2] text-white text-[12px] sm:text-[13px] font-medium py-2 px-4 text-center z-50">
          <span>
            Find Your Dream Home • Trusted Real Estate Experts • Verified Listings • Exclusive Offers • Book Your Site Visit Today
          </span>
          <button
            type="button"
            onClick={() => setIsBannerDismissed(true)}
            aria-label="Dismiss banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 2. SEARCH HEADER (NAVIGATION BAR) + DYNAMIC SPACER                      */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <SearchHeader hasAnnouncement={!isBannerDismissed} />

      {/* Spacer so fixed header doesn't overlap tabs */}
      <div
        className={cn(
          "w-full transition-all duration-200",
          !isBannerDismissed ? "h-[85px] sm:h-[95px]" : "h-[65px] sm:h-[75px]"
        )}
      />

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 3. FULL-WIDTH SUB-NAVIGATION TABS (MATCHES FIGMA SCREENSHOT 1)          */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-2.5 flex items-center justify-between overflow-x-auto scrollbar-none">
          <ul className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {TOC_MAIN_TABS.map((tab) => {
              const isActive = activeMainTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMainTab(tab.id);
                      scrollToSection(tab.id);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition-all cursor-pointer",
                      isActive
                        ? "border border-[#1865F2] bg-white text-[#1865F2] font-semibold shadow-2xs"
                        : "text-[#475569] hover:text-[#1865F2] font-medium"
                    )}
                  >
                    {tab.icon && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1865F2] text-white text-[10px]">
                        ⚡
                      </span>
                    )}
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="shrink-0 pl-4 font-bold text-[13px] text-[#1865F2] hidden md:block">
            URN : P35
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-4">
        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 4. BREADCRUMB & QUICK ACTION CONTROLS (SCREENSHOT 1)                  */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 pt-1 border-b border-slate-200/90 text-[12.5px]">
          <div className="flex items-center gap-4 flex-wrap">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Property in Noida", href: "/properties?city=noida" },
                { label: property.title || "The terraces at Estate 361" },
              ]}
            />
            <div className="hidden sm:flex items-center gap-4 border-l border-slate-300 pl-4">
              <button
                type="button"
                onClick={() => toast.success("Property added to comparison list")}
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#1865F2] font-medium cursor-pointer"
              >
                <FlipHorizontal2 size={15} className="text-[#1865F2]" />
                <span>Compare</span>
              </button>
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-rose-600 font-medium cursor-pointer"
              >
                <NotebookPen size={15} className="text-slate-500" />
                <span>Report Property</span>
              </button>
            </div>
          </div>

          {/* Solid Blue-Teal Gradient Previous / Next Pill (Figma 1:1) */}
          <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#1865F2] to-[#00A884] px-4 py-1.5 text-[12px] font-bold text-white shadow-2xs">
            <button
              type="button"
              onClick={() => router.push("/properties")}
              className="flex items-center gap-1 hover:opacity-85 cursor-pointer"
            >
              <ChevronLeft size={14} className="stroke-[3]" />
              <span>Previous</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              type="button"
              onClick={() => router.push("/properties")}
              className="flex items-center gap-1 hover:opacity-85 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight size={14} className="stroke-[3]" />
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 5. HERO GALLERY & SPECS OVERVIEW (SCREENSHOTS 1 & 2)                  */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="overview" className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* LEFT COLUMN: Main Gallery + Thumbnail Strip */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Big Main Image Container */}
            <div className="relative h-[400px] sm:h-[490px] lg:h-[530px] w-full rounded-[28px] overflow-hidden bg-slate-900 border border-slate-200/90 shadow-sm">
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-opacity duration-300"
              />

              {/* Top-Left: Download Brochure Badge with Blue Ribbon Fold (Figma Image 1) */}
              <div className="absolute top-6 left-0 z-20">
                <button
                  type="button"
                  onClick={() => setIsBrochureOpen(true)}
                  className="relative z-10 flex items-center gap-2.5 bg-black hover:bg-neutral-900 text-white text-[12px] font-black uppercase tracking-wider px-4 py-2.5 rounded-r-[6px] shadow-lg cursor-pointer transition-transform hover:scale-105"
                >
                  <span>DOWNLOAD BROCHURE</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
                {/* Blue triangular ribbon fold directly under badge on left edge */}
                <div className="absolute -bottom-2.5 left-0 w-0 h-0 border-t-[10px] border-t-[#1865F2] border-l-[10px] border-l-transparent pointer-events-none" />
              </div>

              {/* Top-Right: Stats Stacked Badges (Figma 1:1) */}
              <div className="absolute top-5 right-5 z-20 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLiked((prev) => !prev);
                    setLikesCount((c) => (liked ? c - 1 : c + 1));
                  }}
                  className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-white shadow-md text-slate-700 hover:text-rose-500 transition-transform hover:scale-110 cursor-pointer"
                  title="Save property"
                >
                  <Heart
                    size={16}
                    className={cn(liked ? "fill-rose-500 text-rose-500" : "text-[#1865F2]")}
                  />
                  <span className="text-[8px] font-bold leading-none mt-0.5 text-slate-700">
                    {likesCount}k
                  </span>
                </button>

                <div className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-white shadow-md text-slate-700">
                  <Eye size={16} className="text-[#1865F2]" />
                  <span className="text-[8px] font-bold leading-none mt-0.5 text-slate-700">
                    8k
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: property.title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-white shadow-md text-slate-700 hover:text-[#1865F2] transition-transform hover:scale-110 cursor-pointer"
                  title="Share property"
                >
                  <Share2 size={16} className="text-[#1865F2]" />
                  <span className="text-[8px] font-bold leading-none mt-0.5 text-slate-700">
                    5k
                  </span>
                </button>
              </div>

              {/* Bottom Overlay Controls */}
              <div className="absolute bottom-14 left-4 z-20 rounded-[8px] bg-black/60 px-3 py-1 text-[12px] font-bold text-white backdrop-blur-xs">
                {activeImageIndex + 1}/{images.length > 25 ? images.length : 25}
              </div>

              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="absolute bottom-14 right-4 z-20 flex items-center gap-2 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] px-4 py-1.5 text-[12px] font-bold shadow-md cursor-pointer transition-transform hover:scale-105"
              >
                <Images size={14} />
                <span>View Photo Gallery</span>
              </button>

              {/* Bottom Blue Distance & Map Bar (Figma 1:1 with divider) */}
              <div className="absolute bottom-0 inset-x-0 h-11 bg-[#1865F2] text-white flex items-center justify-between px-6 text-[13px] font-medium border-t-2 border-white rounded-b-[28px]">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
                  <span>↔</span>
                  <span>15 km Away</span>
                </div>
                <div className="h-5 w-[1px] bg-white/40" />
                <button
                  type="button"
                  onClick={() => scrollToSection("mini-map")}
                  className="flex items-center gap-2 cursor-pointer hover:underline"
                >
                  <span>🌐</span>
                  <span>View on Map</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Strip (Figma Screenshot 1 & 2) */}
            <div>
              <div className="grid grid-cols-4 gap-3 pt-1">
                {/* 1. 360 Tour */}
                <div
                  onClick={() => {
                    setActiveImageIndex(0);
                    setIsVideoOpen(true);
                  }}
                  className={cn(
                    "relative h-20 sm:h-24 rounded-[14px] overflow-hidden bg-slate-900 border cursor-pointer group transition-all",
                    activeImageIndex === 0 ? "border-[#1865F2] ring-2 ring-[#1865F2]/40" : "border-slate-200"
                  )}
                >
                  <Image
                    src={images[0]}
                    alt="360 Tour"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <span className="rounded-full bg-white text-[#1865F2] text-[10.5px] font-extrabold px-3 py-1 shadow-md flex items-center gap-1 select-none">
                      <span>360° TOUR</span>
                    </span>
                  </div>
                </div>

                {/* 2. Photo: Interior Luxury Room */}
                <div
                  onClick={() => setActiveImageIndex(1 % images.length)}
                  className={cn(
                    "relative h-20 sm:h-24 rounded-[14px] overflow-hidden bg-slate-100 border cursor-pointer group transition-all",
                    activeImageIndex === 1 ? "border-[#1865F2] ring-2 ring-[#1865F2]/40" : "border-slate-200"
                  )}
                >
                  <Image
                    src={images[1] || images[0]}
                    alt="Interior"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* 3. Video Tour with Play Button */}
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="relative h-20 sm:h-24 rounded-[14px] overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer group"
                >
                  <Image
                    src={images[2] || images[0]}
                    alt="Video Tour"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <span className="text-[12px] ml-0.5">▶</span>
                    </div>
                  </div>
                </div>

                {/* 4. +28 Photos Overlay */}
                <div
                  onClick={() => setIsGalleryOpen(true)}
                  className="relative h-20 sm:h-24 rounded-[14px] overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer group"
                >
                  <Image
                    src={images[3] || images[0]}
                    alt="More photos"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-[12px] font-bold">
                    <span>+28</span>
                    <span className="text-[10px] font-medium">Photos</span>
                  </div>
                </div>
              </div>

              {/* Blue Active Bar Indicator under thumbnails (Figma Image 4) */}
              <div className="w-1/3 h-1.5 bg-[#1865F2] rounded-full mt-3" />
            </div>
          </div>

          {/* RIGHT COLUMN: Property Title, Pricing, Essentials & Mini Map */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* BHK Pills */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#1865F2] px-4 py-1 text-xs font-bold text-white shadow-2xs">
                3 BHK Apartments
              </span>
              <span className="rounded-full border border-[#1865F2] bg-white px-4 py-1 text-xs font-bold text-[#1865F2]">
                4 BHK Apartments
              </span>
            </div>

            {/* Title with vertical accent bar */}
            <div>
              <div className="flex items-start gap-2.5">
                <div className="w-[3.5px] h-10 bg-[#1865F2] rounded-full shrink-0 mt-1" />
                <h1 className="text-[23px] sm:text-[26px] font-bold text-[#0B132B] tracking-tight leading-tight">
                  The Terraces at Max<br />Estate 361
                </h1>
              </div>

              {/* Price Row */}
              <div className="mt-2.5 flex items-baseline gap-3 flex-wrap">
                <span className="text-[13.5px] text-[#64748B] font-medium line-through">
                  MRP ₹1.58 Cr
                </span>
                <span className="text-[26px] sm:text-[28px] font-extrabold text-[#0B132B]">
                  ₹1.25<span className="text-[16px] font-bold">*Cr</span>
                </span>
                {/* Coupon Ticket 13% OFF Badge (Figma Image 2) */}
                <div className="relative inline-flex items-center gap-1.5 h-[30px] pl-2.5 pr-3 bg-gradient-to-r from-[#1865F2] via-[#0EA5E9] to-[#00C58A] rounded-[5px] shadow-xs select-none">
                  {/* Left notch */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white" />
                  {/* Right notch */}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white" />

                  {/* White Rosette / Scalloped % badge */}
                  <div className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
                      <path d="M12 2a3 3 0 0 0-2.12.88 3 3 0 0 0-3-.08 3 3 0 0 0-2.3 2 3 3 0 0 0-2.8 1.15 3 3 0 0 0-.82 2.93 3 3 0 0 0-1.88 2.37 3 3 0 0 0 .8 3 3 3 0 0 0-.25 3 3 3 0 0 0 1.95 2.3 3 3 0 0 0 1.25 2.8 3 3 0 0 0 2.9.7 3 3 0 0 0 2.2 2 3 3 0 0 0 3-.1 3 3 0 0 0 3 .1 3 3 0 0 0 2.2-2 3 3 0 0 0 2.9-.7 3 3 0 0 0 1.25-2.8 3 3 0 0 0 1.95-2.3 3 3 0 0 0-.25-3 3 3 0 0 0 .8-3 3 3 0 0 0-1.88-2.37 3 3 0 0 0-.82-2.93 3 3 0 0 0-2.8-1.15 3 3 0 0 0-2.3-2 3 3 0 0 0-3 .08A3 3 0 0 0 12 2z" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-[#1865F2] leading-none">
                      %
                    </span>
                  </div>

                  {/* Bold white text */}
                  <span className="text-white font-extrabold text-[12.5px] tracking-wide whitespace-nowrap">
                    13 % OFF!
                  </span>
                </div>
              </div>
            </div>

            {/* Location Ticket Box with Cutouts on Left & Right (Figma Image 3) */}
            <div className="relative rounded-[14px] bg-[#F0F5FA] px-6 py-3 flex items-center gap-3">
              {/* Left notch */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />
              {/* Right notch */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1865F2] text-white shrink-0 shadow-xs">
                <MapPin size={17} className="fill-white text-[#1865F2]" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-[#0B132B] leading-tight">
                  Sector 103 , Noida Ext
                </p>
                <p className="text-[12px] text-[#64748B] font-normal leading-tight mt-0.5">
                  gdshkasaskshvja...
                </p>
              </div>
            </div>

            {/* Green Dashed Line Divider (Figma Image 3) */}
            <div className="w-full border-b border-dashed border-[#05B67B] my-2" />

            {/* Property Essentials Section with Stacked Label & 3 Floating-Icon Cards (Figma Image 3) */}
            <div className="flex items-center gap-3 pt-3">
              {/* Left Stacked Title */}
              <div className="shrink-0 flex flex-col justify-center pr-1 select-none">
                <span className="text-[17px] font-extrabold text-[#0B132B] leading-[1.15] block">Property</span>
                <span className="text-[17px] font-extrabold text-[#0B132B] leading-[1.15] block">Essentials</span>
              </div>

              {/* 3 Cards */}
              <div className="flex-1 grid grid-cols-3 gap-2.5">
                {/* 1. Area Card (Blue border) */}
                <div className="relative rounded-[16px] border-2 border-[#1865F2] bg-[#F2F7FF] pt-5 pb-2.5 px-1.5 text-center shadow-xs">
                  {/* Top Floating Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" stroke="#1865F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#E8F1FF" />
                      <path d="M9 3V18" stroke="#1865F2" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15 6V21" stroke="#1865F2" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="15" cy="11" r="2.5" fill="#00C58A" />
                      <path d="M15 13.5V16" stroke="#00C58A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] text-[#64748B] font-medium block mt-1">Area</span>
                  <span className="text-[14px] sm:text-[15px] font-extrabold text-[#0B132B] leading-tight block mt-0.5">3,200-4,500</span>
                  <span className="text-[10.5px] text-[#64748B] font-medium block mt-0.5">Sq. Ft</span>
                </div>

                {/* 2. Property Ready */}
                <div className="relative rounded-[16px] bg-[#F2F7FF] pt-5 pb-2.5 px-1.5 text-center shadow-xs">
                  {/* Top Floating Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 10L12 6L17 10V14H7V10Z" fill="#00C58A" />
                      <path d="M10 14V11H14V14" fill="#E8F8F0" />
                      <path d="M4 14H8L10 16H16L18 14H20" stroke="#1865F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 14V19H17" stroke="#1865F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] text-[#0B132B] font-bold block mt-1">Property</span>
                  <div className="mt-0.5 leading-tight">
                    <span className="text-[14px] sm:text-[15px] font-extrabold text-[#0B132B]">Ready</span>
                    <span className="text-[10.5px] text-[#64748B] font-medium ml-1">To Move</span>
                  </div>
                </div>

                {/* 3. Floor number */}
                <div className="relative rounded-[16px] bg-[#F2F7FF] pt-5 pb-2.5 px-1.5 text-center shadow-xs">
                  {/* Top Floating Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L20 7.5L12 12L4 7.5L12 3Z" fill="#2563EB" />
                      <path d="M12 5.5L17.5 8.5L12 11.5L6.5 8.5L12 5.5Z" fill="#93C5FD" opacity="0.6" />
                      <path d="M4 10.5L12 15L20 10.5V12.5L12 17L4 12.5V10.5Z" fill="#3B82F6" />
                      <path d="M4 14.5L12 19L20 14.5V16.5L12 21L4 16.5V14.5Z" fill="#CBD5E1" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] text-[#0B132B] font-bold block mt-1">Floor number</span>
                  <span className="text-[14px] sm:text-[15px] font-extrabold text-[#0B132B] leading-tight block mt-0.5">2 Floors</span>
                  <span className="text-[10.5px] text-[#64748B] font-medium block mt-0.5">Floor Number</span>
                </div>
              </div>
            </div>

            {/* Configuration Drawer */}
            <div className="rounded-[14px] border border-slate-200 bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => setShowConfig((prev) => !prev)}
                className="flex items-center justify-between w-full p-3 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">📋</span>
                  <span className="text-[12px] font-bold text-[#0B132B] shrink-0">Configuration</span>
                  <span className="text-slate-300 mx-1">|</span>
                  <span className="text-[11.5px] text-[#64748B] truncate">
                    3 Bedrooms, 2 Bathrooms, 3 Balconies, Pool...
                  </span>
                </div>
                <span className="text-[#1865F2] text-[11px] font-bold shrink-0">▼</span>
              </button>

              {showConfig && (
                <div className="p-3 border-t border-slate-100 bg-[#F8FAFC] text-[12px] grid grid-cols-2 gap-2">
                  <p><span className="text-slate-400">Bedrooms:</span> 3-4 Beds</p>
                  <p><span className="text-slate-400">Bathrooms:</span> 3 Baths</p>
                  <p><span className="text-slate-400">Balconies:</span> 3-4 Balconies</p>
                  <p><span className="text-slate-400">Facing:</span> North-East</p>
                </div>
              )}
            </div>

            {/* Mini Map Preview Widget with Floating Card Overlay (Figma Screenshot 1 & 2) */}
            <div id="mini-map" className="rounded-[18px] overflow-hidden border border-slate-200/90 shadow-2xs bg-white relative">
              <div className="relative h-[200px] w-full">
                <ViewMap height="200px" properties={[property]} />

                {/* Floating Property Card Popup matching Figma Screenshot 1 & 2 */}
                {showMapPopup && (
                  <div className="absolute top-2.5 left-2.5 z-10 w-[190px] rounded-[14px] overflow-hidden bg-white shadow-xl border border-white">
                    <div className="relative h-20 w-full">
                      <Image
                        src="/images/properties/villa-popular-figma.jpg"
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMapPopup(false)}
                        aria-label="Close preview"
                        className="absolute top-1 right-1 h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[9px] hover:bg-black cursor-pointer"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-1 inset-x-0 flex justify-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-white" />
                        <span className="h-1 w-1 rounded-full bg-white/60" />
                        <span className="h-1 w-1 rounded-full bg-white/60" />
                        <span className="h-1 w-1 rounded-full bg-white/60" />
                      </div>
                    </div>
                    <div className="p-2 space-y-1 bg-white">
                      <span className="inline-block rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1865F2] text-[8px] font-bold px-2 py-0.5">
                        2, 3 & 4 BHK Apartments
                      </span>
                      <h4 className="text-[10px] font-bold text-[#0B132B] truncate">
                        The Terraces at Max Estate 361
                      </h4>
                      <p className="text-[8.5px] text-[#64748B] flex items-center gap-0.5">
                        <span>📍</span> Sector 78, Noida
                      </p>
                      <button
                        type="button"
                        onClick={() => toast.success("Opening property details")}
                        className="w-full rounded-[6px] bg-[#1865F2] hover:bg-[#1250C4] text-white py-1 text-[9px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Comparison Callout (Figma Screenshot) */}
            <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
              <div>
                <h3 className="text-[17px] font-bold text-[#0B132B]">Property Comparison</h3>
                <p className="text-[12px] text-[#64748B]">Add up-to 3 Property to compare</p>
              </div>
              <button
                type="button"
                onClick={() => toast.success("Property added to comparison dock")}
                className="w-full flex items-center justify-center gap-2 rounded-[10px] bg-[#0099FF] hover:bg-[#008AE6] text-white py-3 text-[15px] font-bold shadow-xs cursor-pointer transition-all"
              >
                <span>+ Add property</span>
              </button>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 6. BUILDER & DEALER DETAILS (MASTER WRAPPER CARD - FIGMA EXACT)       */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="dealer-details" className="mt-8 rounded-[24px] border border-blue-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-5">
          {/* Builder Box: GM MULTIVENTURES */}
          <div className="rounded-[18px] border border-blue-200/80 bg-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 p-1 text-center shadow-xs">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                  <path d="M4 22V8L10 3V22" stroke="#000000" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M10 22V5L17 5V22" stroke="#000000" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M17 22V9L24 13V22" stroke="#000000" strokeWidth="2.2" strokeLinejoin="round" />
                  <line x1="2" y1="22" x2="26" y2="22" stroke="#000000" strokeWidth="2.2" />
                </svg>
                <span className="font-black text-[6px] sm:text-[7px] text-black tracking-tight leading-none mt-1">
                  GM MULTIVENTURES
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#0B132B] uppercase">
                  GM MULTIVENTURES
                </h3>
                <p className="text-[12.5px] text-[#64748B] mt-0.5">
                  Gm multiventures Group is one of India&apos;s leading real state in greater noida
                </p>
                <div className="flex items-center gap-6 mt-3 text-center flex-wrap">
                  <div>
                    <span className="block text-[17px] font-bold text-[#0066FF]">271+</span>
                    <span className="block text-[12px] text-[#64748B]">Projects</span>
                  </div>
                  <div className="border-l border-slate-200 pl-6">
                    <span className="block text-[17px] font-bold text-[#0066FF]">10k</span>
                    <span className="block text-[12px] text-[#64748B]">Fallowers</span>
                  </div>
                  <div className="border-l border-slate-200 pl-6">
                    <span className="block text-[17px] font-bold text-[#0066FF]">50k</span>
                    <span className="block text-[12px] text-[#64748B]">Views</span>
                  </div>
                  <div className="border-l border-slate-200 pl-6">
                    <span className="block text-[17px] font-bold text-[#0066FF]">2k</span>
                    <span className="block text-[12px] text-[#64748B]">Videos</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/builders"
              className="shrink-0 rounded-[8px] border border-[#0099FF] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0099FF] hover:bg-blue-50 transition-colors"
            >
              View Builder Project Details &gt;
            </Link>
          </div>

          {/* Dealer Card: JITENDRA SINGH & Send Enquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Avatar & Info */}
            <div className="lg:col-span-7 rounded-[18px] border border-slate-200/90 bg-white p-5 flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-[16px] bg-[#EEF4FC] border border-blue-100/60 overflow-hidden flex items-end justify-center shrink-0 shadow-xs">
                  <svg viewBox="0 0 120 135" className="w-full h-full object-cover">
                    <rect width="120" height="135" fill="#EEF4FC" />
                    {/* Suit body */}
                    <path d="M10 135 C10 100, 30 85, 60 85 C90 85, 110 100, 110 135 Z" fill="#55392D" />
                    {/* Shirt Collar */}
                    <polygon points="60,85 45,108 60,118 75,108" fill="#FFFFFF" />
                    {/* Necktie */}
                    <polygon points="57,100 63,100 66,135 54,135" fill="#1E293B" />
                    {/* Neck */}
                    <rect x="52" y="70" width="16" height="20" fill="#FAD4B6" />
                    {/* Head */}
                    <ellipse cx="60" cy="52" rx="20" ry="24" fill="#FAD4B6" />
                    {/* Hair */}
                    <path d="M38 52 C38 28, 48 24, 60 24 C72 24, 82 28, 82 52 C82 36, 75 32, 60 32 C45 32, 38 36, 38 52 Z" fill="#1E293B" />
                    <path d="M40 45 C42 30, 52 24, 60 24 C70 24, 80 30, 80 42 C78 35, 70 30, 60 30 C48 30, 42 37, 40 45 Z" fill="#18181B" />
                    {/* Ears */}
                    <circle cx="39" cy="54" r="4" fill="#FAD4B6" />
                    <circle cx="81" cy="54" r="4" fill="#FAD4B6" />
                    {/* Lapels */}
                    <polygon points="35,92 50,112 40,135 22,135" fill="#432B21" />
                    <polygon points="85,92 70,112 80,135 98,135" fill="#432B21" />
                  </svg>
                </div>
                <span className="mt-2.5 text-[13px] font-bold text-[#0066FF] text-center block">
                  Properties Listed: 35
                </span>
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[22px] font-bold text-[#0066FF] tracking-tight">
                    JITENDRA SINGH
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-[6px] bg-[#A7F3D0]/60 text-[#059669] text-[11px] font-semibold px-2.5 py-0.5">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-[14px] font-medium text-[#64748B]">
                  Director Sales
                </p>

                <div className="space-y-2 pt-1 text-[13px]">
                  <div>
                    <span className="font-bold text-[#0B132B] block">Localities:</span>
                    <p className="text-[#64748B] leading-snug">
                      Sector 128 Noida, Sector 120 Noida, Sector 119 Noida
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B132B] block">About Terraces :</span>
                    <p className="text-[#64748B] leading-snug">
                      Deals In All Exclusive Properties Across Noida.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B132B] block">Address :</span>
                    <p className="text-[#64748B] leading-snug">
                      401, RG RESIDENCY, NOIDA SEC-120, Greater Noida
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Send Enquiry to Dealer Form */}
            <div className="lg:col-span-5 rounded-[18px] border border-slate-200/90 bg-white p-5 space-y-3">
              <h4 className="text-[16px] font-bold text-[#0066FF]">Send Enquiry to Dealer</h4>
              <form onSubmit={handleEnquirySubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full rounded-[8px] border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0084FF]"
                />
                <div className="flex rounded-[8px] border border-slate-200 bg-white overflow-hidden focus-within:border-[#0084FF]">
                  <select
                    value={countryCode.value}
                    onChange={(e) => {
                      const found = COUNTRY_CODE_OPTIONS.find((c) => c.value === e.target.value);
                      if (found) setCountryCode(found);
                    }}
                    aria-label="Country code"
                    className="border-r border-slate-200 bg-white px-2.5 py-2 text-[12px] font-medium text-slate-700 outline-none cursor-pointer"
                  >
                    {COUNTRY_CODE_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    className="flex-1 px-3 py-2 text-[13px] outline-none"
                  />
                </div>
                <textarea
                  rows={3}
                  value={enquiryMsg}
                  onChange={(e) => setEnquiryMsg(e.target.value)}
                  placeholder="I am interested in this property."
                  className="w-full rounded-[8px] border border-slate-200 bg-white p-3 text-[13px] text-slate-700 outline-none resize-none focus:border-[#0084FF]"
                />
                <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="accent-[#0084FF] rounded h-3.5 w-3.5 cursor-pointer"
                  />
                  <span>I agree to the Terms & Conditions and Privacy Policy</span>
                </label>
                <button
                  type="submit"
                  className="w-full rounded-[8px] bg-[#0084FF] hover:bg-[#0070E0] text-white py-2.5 text-[13px] font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-all"
                >
                  SEND EMAILS & SMS
                </button>
              </form>
            </div>
          </div>

          {/* 3 Action Buttons (Figma Screenshot) */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => toast.success("Calling +91 98765 43210...")}
              className="w-full h-[52px] rounded-[10px] bg-[#0099FF] hover:bg-[#008AE6] text-white text-[17px] font-bold flex items-center justify-center gap-2.5 shadow-sm cursor-pointer transition-all"
            >
              <Phone size={19} className="fill-white" />
              <span>Call Now</span>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toast.success("Site visit scheduler opened")}
                className="w-full h-[48px] rounded-[10px] border border-[#BFDBFE] bg-white hover:bg-blue-50/50 text-[#0084FF] text-[14px] font-bold flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 text-[#0084FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <path d="M8 14h.01"/>
                  <path d="M12 14h.01"/>
                  <path d="M16 14h.01"/>
                  <path d="M8 18h.01"/>
                  <path d="M12 18h.01"/>
                </svg>
                <span>Schedule Site Visit</span>
              </button>
              <button
                type="button"
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                className="w-full h-[48px] rounded-[10px] border border-[#86EFAC] bg-white hover:bg-emerald-50/50 text-[#16A34A] text-[14px] font-bold flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-2xs"
              >
                <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 7. PROPERTY SUB-NAV TABS & ABOUT PROPERTY (FIGMA SCREENSHOT EXACT)    */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="property-details" className="mt-10">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none border-b border-slate-200 pb-3">
            {TOC_SUB_TABS.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab(tab.id);
                      scrollToSection(tab.id);
                    }}
                    className={cn(
                      "text-[13px] font-medium whitespace-nowrap cursor-pointer transition-all",
                      isActive
                        ? "rounded-full bg-[#0084FF] text-white px-5 py-2 shadow-xs"
                        : "text-[#475569] hover:text-[#0084FF] px-2 py-2"
                    )}
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* About Property Text (Figma Screenshot) */}
          <div id="about-property" className="pt-6 pb-2 space-y-2">
            <p className="text-[14px] text-[#0B132B]">
              <span className="font-bold">Address : </span>
              <span className="font-medium text-[#475569]">Sector 103 , Noida Ext</span>
            </p>
            <p className="text-[13.5px] text-[#334155] leading-relaxed max-w-5xl mt-2.5">
              This property faces the east direction. The floor plan additionally contains 3 bedroom(s), 2 bathrooms and 3 balconies. All in all, the flat is spread over a super built up area of 1270 sq.Ft. The property is located on the 3rd floor of a 18 floors tall building. Being a ready to move project,{" "}
              {showAboutMore
                ? "you can easily shift into this luxurious residential enclave featuring world class modern amenities, serene landscaped gardens, and high security."
                : "you c..."}
            </p>
            <button
              type="button"
              onClick={() => setShowAboutMore((prev) => !prev)}
              className="text-[13px] font-semibold text-[#0084FF] hover:underline cursor-pointer inline-flex items-center gap-1 mt-1"
            >
              {showAboutMore ? "Less <<<" : "More >>>"}
            </button>
          </div>

          {/* Thin Dotted Divider Line (Figma Screenshot) */}
          <div className="border-b border-dotted border-slate-300 my-6" />
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 8. SEMIFURNISHED / FURNISHING DETAILS (FIGMA SCREENSHOT EXACT)         */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
              <div>
                <h3 className="text-[16px] font-bold uppercase text-[#0066FF] tracking-wide">
                  SEMIFURNISHED
                </h3>
                <span className="text-[12px] text-[#64748B] font-medium block -mt-0.5">
                  Furnishing Details
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("amenities")}
              className="rounded-[8px] bg-[#0084FF] hover:bg-[#0070E0] text-white px-5 py-2 text-[13px] font-bold shadow-xs cursor-pointer transition-all"
            >
              View All Amenities
            </button>
          </div>

          {/* 5-Column Grid with 14 items matching Figma Screenshot */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {SEMIFURNISHED_ITEMS.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-3.5 rounded-[14px] border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="h-11 w-11 rounded-[10px] bg-[#EEF5FF] flex items-center justify-center shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block text-[12px] font-medium text-[#475569] truncate">
                    {item.name === "Washing Machine" ? "Washing Mac..." : item.name}
                  </span>
                  <span className="block text-[14px] font-bold text-[#0B132B] mt-0.5 leading-tight">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 9. AMENITIES SECTION (FIGMA SCREENSHOT EXACT)                         */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="amenities" className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
              <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
                AMENITIES
              </h3>
            </div>
            <span className="text-[13px] text-[#64748B] font-normal">
              Inside Paramount Floraville Society
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
            {SOCIETY_AMENITIES.map((am, idx) => (
              <div key={`${am.name}-${idx}`} className="flex flex-col items-center gap-2">
                {/* Upper Icon Card */}
                <div className="w-full h-22 sm:h-24 rounded-[16px] border border-slate-200/90 bg-white flex items-center justify-center p-3 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                    <Image
                      src={am.image}
                      alt={am.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Lower Pill Label */}
                <div className="w-full text-center py-1 px-1 rounded-full border border-slate-200/90 bg-white text-[11px] font-medium text-slate-700 truncate shadow-2xs">
                  {am.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 10. SOCIETY HIGHLIGHTS & STATS (FIGMA SCREENSHOT EXACT)                */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="society" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              SOCIETY
            </h3>
          </div>

          {/* 5 Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {SOCIETY_STATS.map((s, idx) => (
              <div
                key={idx}
                className="rounded-[16px] bg-[#EEF5FC] p-4 sm:p-5 text-center border border-blue-100/70 shadow-2xs"
              >
                <div className="flex items-baseline justify-center">
                  <span className="text-[26px] sm:text-[28px] font-black text-[#0066FF] leading-none">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="text-[12px] font-bold text-[#0066FF] ml-1">
                      {s.unit}
                    </span>
                  )}
                </div>
                <span className="block text-[13px] font-medium text-[#475569] mt-1.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* 4 Society Pillars inside single wide card with border */}
          <div className="mt-4 rounded-[16px] border border-[#BFDBFE]/90 bg-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 shadow-2xs">
            {SOCIETY_HIGHLIGHTS.map((h) => (
              <div
                key={h.name}
                className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:pl-4 first:pl-0"
              >
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Image
                    src={h.image}
                    alt={h.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[14px] font-bold text-[#0B132B] truncate">{h.name}</h4>
                  <p className="text-[11.5px] text-[#64748B] mt-0.5">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 11. FLOOR PLAN (FIGMA SCREENSHOT EXACT)                               */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="floor-plan" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              FLOOR PLAN
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 3D Floor Plan Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative h-60 w-full max-w-[320px]">
                <Image
                  src="/3d_floor_plan.png"
                  alt="3 BHK Floor Plan"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Middle Specs */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-[18px] font-bold text-[#0B132B]">3 BHK – 1350 SQ.FT.</h4>
              <p className="text-[13px] text-[#475569] leading-relaxed">
                Smartly designed layout with spacious rooms and efficient space utilization.
              </p>
              <ul className="space-y-2 pt-1 text-[13px] text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1865F2] shrink-0" />
                  <span>1 Living &amp; Dining</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1865F2] shrink-0" />
                  <span>1 Modular Kitchen</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1865F2] shrink-0" />
                  <span>3 Bedrooms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1865F2] shrink-0" />
                  <span>3 Bathrooms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1865F2] shrink-0" />
                  <span>2 Balconies</span>
                </li>
              </ul>
            </div>

            {/* Right 3D Floor Plan Card with 3D Walkthrough & View 3D Tour */}
            <div className="lg:col-span-5 rounded-[20px] border border-slate-200/90 bg-[#F8FBFF] p-5 shadow-2xs flex flex-col justify-between">
              <div className="relative h-48 w-full">
                <Image
                  src="/3d_floor_plan_small.png"
                  alt="3D Floor Plan View"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pt-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-[15px] font-bold text-[#0B132B]">3D Walkthrough</h4>
                  <p className="text-[11.5px] text-[#64748B]">Experience The Property Virtually Before You Visit.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="rounded-[8px] border border-[#1865F2] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#1865F2] hover:bg-blue-50 cursor-pointer shrink-0 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>❄</span>
                  <span>View 3D Tour</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 12. KEY HIGHLIGHTS & LOCATION ADVANTAGE (FIGMA SCREENSHOT EXACT)       */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="key-highlights" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              KEY HIGHLIGHTS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Highlights Box */}
            <div className="rounded-[16px] border border-[#BFDBFE]/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
              <ul className="space-y-3.5 text-[13.5px] text-slate-700 font-medium">
                {KEY_HIGHLIGHTS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={16} className="text-[#0084FF] stroke-[2.5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full py-2.5 rounded-[8px] bg-[#F0F6FE] hover:bg-[#E2EEFD] text-[#0084FF] font-bold text-[13px] text-center mt-5 transition-colors cursor-pointer"
              >
                View More &gt;&gt;
              </button>
            </div>

            {/* Right Location Advantage Box */}
            <div className="rounded-[16px] border border-[#BFDBFE]/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-[3px] h-5 bg-[#00C58A] rounded-full" />
                  <h4 className="text-[16px] font-bold text-[#00C58A]">Location Advantage</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 my-2">
                  {LOCATION_ADVANTAGES.map((loc) => (
                    <div key={loc.name} className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-[#EFF6FF] border border-blue-100/70 flex items-center justify-center shrink-0">
                        <Image src={loc.image} alt={loc.name} width={26} height={26} className="object-contain" />
                      </div>
                      <div>
                        <span className="block text-[13px] font-bold text-[#0B132B]">{loc.name}</span>
                        <span className="block text-[12px] text-[#64748B]">{loc.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection("mini-map")}
                className="w-full py-2.5 rounded-[8px] bg-[#F0F6FE] hover:bg-[#E2EEFD] text-[#0084FF] font-bold text-[13px] text-center mt-5 transition-colors cursor-pointer"
              >
                View On Map
              </button>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 13. WHY ROOFIN (FIGMA SCREENSHOT EXACT)                                */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="why-roofin" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              WHY ROOFIN
            </h3>
          </div>

          <div className="rounded-[16px] border border-[#BFDBFE]/80 bg-white p-6 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {WHY_ROOFIN_ITEMS.map((w, idx) => (
              <div key={idx} className="flex items-center gap-4 pt-3 md:pt-0 md:pl-6 first:pl-0">
                <div className="h-12 w-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Image src={w.image} alt={w.name} width={34} height={34} className="object-contain" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0B132B]">{w.name}</h4>
                  <p className="text-[12px] text-[#64748B] mt-0.5">{w.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 14. BANK OFFERS (FIGMA SCREENSHOT EXACT)                               */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold text-[#0066FF]">
              Bank Offers
            </h3>
          </div>

          <div className="relative rounded-[20px] overflow-hidden border border-blue-200/80 bg-[#E8F6F4] p-6 sm:p-8 shadow-xs">
            <Image
              src="/banner/banck_banner.png"
              alt="Bank Offers Background"
              fill
              className="object-cover object-right pointer-events-none select-none"
            />
            <div className="relative z-10 max-w-xl space-y-4">
              <div>
                <h3 className="text-[24px] font-bold text-[#0066FF]">Bank offers</h3>
                <p className="text-[13px] text-[#475569] mt-0.5">
                  compare home loan offers from 40+ banks
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <span className="block text-[12px] text-[#64748B]">Rate Start From</span>
                  <span className="block text-[18px] font-black text-[#0066FF]">7.1%</span>
                </div>
                <div>
                  <span className="block text-[12px] text-[#64748B]">Processing Fee</span>
                  <span className="block text-[18px] font-black text-[#0066FF]">0%</span>
                </div>
              </div>

              <div>
                <span className="block text-[12px] text-[#64748B] mb-2 font-medium">our banking partners</span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {BANK_PARTNERS.slice(0, 5).map((bp) => (
                    <div
                      key={bp.name}
                      className="h-10 px-3 rounded-[8px] border border-slate-200 bg-white flex items-center justify-center shadow-2xs"
                    >
                      <Image src={bp.logo} alt={bp.name} width={70} height={24} className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 15. PRICE TRENDS (FIGMA SCREENSHOT EXACT)                             */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="price-trends" className="mt-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
              <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
                PRICE TREND
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTrendMode("locality")}
                className={cn(
                  "rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold cursor-pointer transition-colors shadow-2xs",
                  trendMode === "locality"
                    ? "border border-[#93C5FD] bg-[#F0F7FF] text-[#1865F2]"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                With Locality
              </button>
              <button
                type="button"
                onClick={() => setTrendMode("societies")}
                className={cn(
                  "rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold cursor-pointer transition-colors shadow-2xs",
                  trendMode === "societies"
                    ? "border border-[#93C5FD] bg-[#F0F7FF] text-[#1865F2]"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                With Societies
              </button>
            </div>
          </div>
          <p className="text-[13px] text-[#64748B] mb-5">
            The Graph Shows The Quarterly Average Rates Of Properties.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Area Chart Box */}
            <div className="lg:col-span-8 rounded-[16px] border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[14px] font-bold uppercase text-[#0B132B]">AVG. PROPERTY RATE</h4>
                <span className="rounded-[6px] border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
                  Last 5 Years ▾
                </span>
              </div>

              {/* Persistent Floating Tooltip matching Figma Screenshot */}
              <div className="absolute top-[32%] left-[42%] -translate-x-1/2 -translate-y-full bg-white rounded-[10px] p-2.5 shadow-md border border-slate-200/90 text-left z-10 select-none pointer-events-none">
                <span className="block text-[11px] font-bold text-[#1865F2]">July-Sept, 2023</span>
                <span className="block text-[12px] font-extrabold text-[#0B132B]">SEC 103, Noida</span>
                <span className="block text-[10.5px] text-[#64748B]">₹6,000/ sqft</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200/90 rotate-45" />
              </div>

              <div className="h-68 sm:h-76 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PRICE_TREND_DATA} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1865F2" stopOpacity={0.75} />
                        <stop offset="95%" stopColor="#1865F2" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 9.5, fill: "#64748B" }}
                      domain={[4000, 64000]}
                      ticks={PRICE_TICKS}
                      tickFormatter={(v) => `₹${v / 1000}K`}
                    />
                    <Tooltip
                      formatter={(v) => [`₹${Number(v).toLocaleString()}/sqft`, "Average Rate"]}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#1865F2" strokeWidth={3} fill="url(#blueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Market Outlook Box */}
            <div className="lg:col-span-4 rounded-[16px] border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] font-bold text-[#0B132B]">Market Outlook</h4>
                  <span className="rounded-full bg-[#E6F9F0] text-[#00BA7A] text-[11px] font-bold px-2.5 py-0.5">
                    Positive
                  </span>
                </div>

                <div className="mt-3">
                  <span className="block text-[12px] text-[#64748B]">Investment Score</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[30px] font-black text-[#0B132B]">8.1</span>
                    <span className="text-[14px] text-slate-400">/10</span>
                  </div>
                </div>

                <div className="space-y-3 mt-4 text-[12px]">
                  <div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Price Growth</span>
                      <span className="font-bold text-slate-800">8/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#00C58A] rounded-full w-[80%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Rental Demand</span>
                      <span className="font-bold text-slate-800">6/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#00C58A] rounded-full w-[60%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Connectivity</span>
                      <span className="font-bold text-slate-800">7/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#00C58A] rounded-full w-[70%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Future Potentials</span>
                      <span className="font-bold text-slate-800">8/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#00C58A] rounded-full w-[80%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>Infrastructure Growth</span>
                      <span className="font-bold text-slate-800">8/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#00C58A] rounded-full w-[80%]" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-5 rounded-[8px] bg-[#F1F5F9] hover:bg-slate-200 text-[#0B132B] py-2.5 text-[12.5px] font-semibold cursor-pointer transition-colors"
              >
                View Market Insights
              </button>
            </div>
          </div>

          {/* Performance of Localities Table */}
          <div className="mt-6 rounded-[16px] border border-slate-200/90 bg-white p-5 shadow-2xs space-y-3">
            <div>
              <h4 className="text-[15px] font-bold text-[#0B132B]">Performance of Localities</h4>
              <p className="text-[11.5px] text-[#64748B]">check rates, appreciation and rental yield</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[#64748B]">
                    <th className="py-2.5 font-medium">Locality</th>
                    <th className="py-2.5 font-medium">Avg.Rate</th>
                    <th className="py-2.5 font-medium">1Y Change</th>
                    <th className="py-2.5 font-medium">5Y Growth</th>
                    <th className="py-2.5 font-medium">Rental Yield</th>
                    <th className="py-2.5 text-right font-medium">Outlook</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 font-medium">
                    <td className="py-3 font-bold text-[#0B132B]">Sector 150</td>
                    <td className="py-3">RS 12,450</td>
                    <td className="py-3">
                      <span className="rounded-full bg-[#E6F9F0] text-[#00BA7A] px-2 py-0.5 text-[11px] font-bold inline-block">
                        +10.8%
                      </span>
                    </td>
                    <td className="py-3">33.4%</td>
                    <td className="py-3">3.5%</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-[#EEF6FE] text-[#1865F2] px-2.5 py-0.5 text-[11px] font-bold inline-block">
                        Positive
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Feedback & More Details CTA */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#0B132B] font-bold">Is this helpful?</span>
              <button
                type="button"
                onClick={() => setHelpfulVote("yes")}
                className={cn("cursor-pointer font-bold transition-transform hover:scale-110", helpfulVote === "yes" && "text-[#1865F2]")}
              >
                Yes 👍
              </button>
              <button
                type="button"
                onClick={() => setHelpfulVote("no")}
                className={cn("cursor-pointer font-bold transition-transform hover:scale-110", helpfulVote === "no" && "text-rose-500")}
              >
                No 👎
              </button>
            </div>
            <button
              type="button"
              className="rounded-[8px] border border-[#1865F2] bg-white px-5 py-2 text-[13px] font-bold text-[#1865F2] hover:bg-blue-50 cursor-pointer shadow-2xs transition-colors"
            >
              Click for More Price Details
            </button>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 16. SECTOR RATES BANNER (FIGMA SCREENSHOT EXACT)                      */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="mt-10 relative rounded-[20px] overflow-hidden border border-blue-200/70 p-6 sm:p-9 shadow-xs min-h-[160px] flex items-center">
          <Image
            src="/banner/price_trends.png"
            alt="Sector Rates Background"
            fill
            className="object-cover object-right pointer-events-none select-none"
          />
          <div className="relative z-10 max-w-xl space-y-2">
            <h3 className="text-[20px] sm:text-[23px] font-black text-[#0066FF] leading-snug">
              Property Rates & Trends For Every Sector Listed On Roofin
            </h3>
            <p className="text-[13.5px] text-[#334155] font-medium">
              Stay Updated, Invest Smart With Accurate Data.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#0084FF] hover:bg-[#0070E0] text-white pl-5 pr-2 py-2 text-[13px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>View Sector By Gaph</span>
                <span className="w-5 h-5 rounded-full bg-white text-[#0084FF] flex items-center justify-center text-xs font-black shrink-0">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 17. SOCIETY REVIEW (FIGMA SCREENSHOT EXACT)                           */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="reviews" className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
              <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
                Society Review
              </h3>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Review form opened")}
              className="rounded-[8px] border border-[#0084FF] bg-white px-4 py-2 text-[12.5px] font-bold text-[#0084FF] hover:bg-blue-50 cursor-pointer shadow-2xs transition-colors"
            >
              + Review your society/ locality
            </button>
          </div>

          <div className="rounded-[16px] border border-blue-100 bg-white p-6 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Rating Breakdown */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-black text-[#0066FF] leading-none">4.5</span>
                <span className="text-[18px] text-slate-400 font-normal">/5</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-lg my-1.5">
                {"★★★★☆"}
              </div>
              <span className="text-[12.5px] font-extrabold uppercase text-slate-800 tracking-wider">GOOD RATING</span>
              <span className="text-[11px] text-slate-400">(200 TotaL Reviews)</span>

              <div className="w-full space-y-1.5 mt-5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right text-slate-500 font-medium">5 star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[85%]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right text-slate-500 font-medium">4 star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[65%]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right text-slate-500 font-medium">3 star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[40%]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right text-slate-500 font-medium">2 star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[20%]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right text-slate-500 font-medium">1 star</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[10%]" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-5 rounded-[8px] border border-blue-200 bg-white py-2 text-[12px] font-semibold text-[#0084FF] hover:bg-blue-50 transition-colors"
              >
                See how ratings are calculated
              </button>
            </div>

            {/* User Reviews List with blue right scroll thumb */}
            <div className="lg:col-span-8 pt-4 lg:pt-0 lg:pl-6 relative pr-3">
              <div className="flex items-center justify-between text-[14px] font-bold text-[#0066FF] mb-4">
                <span>ALL Reviews (2)</span>
                <span className="cursor-pointer hover:underline text-[13px]">View All</span>
              </div>

              <div className="space-y-4">
                {REVIEWS_DATA.map((rev, idx) => (
                  <div key={rev.id} className={cn("space-y-1.5", idx > 0 && "pt-3 border-t border-slate-100")}>
                    <div className="flex items-center gap-3">
                      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0", rev.avatarBg)}>
                        <UserRound size={18} />
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-[#0B132B]">{rev.name}</h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-amber-400 text-xs tracking-tight">★★★★☆</span>
                          <span className="text-[11px] text-slate-400">{rev.date} {rev.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[12.5px] text-slate-700 leading-relaxed pl-13">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Blue scrollbar thumb indicator on right edge */}
              <div className="absolute right-0 top-16 bottom-4 w-1 bg-slate-100 rounded-full hidden sm:block">
                <div className="h-16 w-full bg-[#0084FF] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 18. FAQS (FIGMA SCREENSHOT EXACT)                                     */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="faqs" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              FAQS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left FAQ Accordion */}
            <div className="lg:col-span-8 space-y-3">
              {FAQS_DATA.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[8px] border border-slate-200 bg-white overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="flex items-center justify-between w-full p-4 text-left font-bold text-[13.5px] text-[#0B132B] hover:text-[#0084FF] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-[18px] text-slate-400 ml-2">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-[13px] text-[#475569] leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Question Card */}
            <div className="lg:col-span-4 rounded-[16px] border border-slate-200 bg-white p-6 shadow-xs flex flex-col items-center justify-between text-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-[10px] bg-[#F59E0B] flex items-center justify-center text-white mb-3 shadow-2xs">
                  <MessageSquare size={24} className="fill-white text-white" />
                </div>
                <h4 className="text-[16px] font-bold text-[#0B132B]">
                  Do you have more questions?
                </h4>
                <p className="text-[12px] text-[#64748B] mt-2 leading-relaxed">
                  Find answers to the most common questions about this 3 BHK property, including pricing, amenities, location, home loans, and more.
                </p>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Direct mail compose opened")}
                className="w-full mt-5 rounded-[8px] bg-[#0084FF] hover:bg-[#0070E0] text-white py-2.5 text-[13px] font-bold shadow-xs cursor-pointer transition-all"
              >
                Send a Direct Mail
              </button>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 19. SUGGESTIONS SECTION (FIGMA SCREENSHOT EXACT)                      */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section id="recommendations" className="mt-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-[3px] h-6 bg-[#00C58A] rounded-full" />
            <h3 className="text-[17px] font-bold uppercase text-[#0066FF] tracking-wide">
              Suggestion
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-[#0084FF] text-white text-[10px] font-bold px-2.5 py-0.5">
                        3 BHK Apartments
                      </span>
                      <span className="rounded-full border border-blue-200 text-[#0084FF] text-[10px] font-bold px-2.5 py-0.5">
                        4 BHK Apartments
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-700 font-bold bg-[#FEF3C7] px-2.5 py-0.5 rounded-full">
                      {idx === 1 ? "Popular" : "New Arrival"}
                    </span>
                  </div>

                  <h4 className="text-[14px] font-bold text-[#0B132B] truncate">
                    The Terraces at Max Estate 361
                  </h4>

                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="relative h-16 w-20 rounded-[8px] overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src="/images/properties/property-1.jpg"
                        alt="The Terraces at Max Estate 361"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-[11.5px] text-[#64748B] truncate">
                        <MapPin size={12} className="text-[#0084FF] shrink-0" />
                        <span className="truncate">Sector 103 , Noida Ext</span>
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[11px] text-slate-400 line-through">MRP ₹1.58 Cr</span>
                        <span className="text-[13.5px] font-bold text-[#0B132B]">₹1.25*Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]">Posted on 10 jul, 2026</span>
                  <Link
                    href={`/properties/${idx + 1}`}
                    className="rounded-[6px] bg-[#0084FF] hover:bg-[#0070E0] text-white px-4 py-1.5 text-[11.5px] font-bold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* 20. HAVE QUESTIONS BANNER (FIGMA SCREENSHOT EXACT)                     */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="mt-10 relative rounded-[24px] overflow-hidden p-6 sm:p-9 shadow-md min-h-[170px] flex items-center">
          <Image
            src="/banner/have_q.png"
            alt="Have Questions Background"
            fill
            className="object-cover object-right pointer-events-none select-none"
          />
          <div className="relative z-10 max-w-lg space-y-2">
            <span className="text-[13px] font-medium text-white/90 block">Have Questions?</span>
            <h3 className="text-[22px] sm:text-[26px] font-black tracking-tight text-white">
              We&apos;re here to help you!
            </h3>
            <p className="text-[13px] text-blue-100 font-normal">
              Our property expects are just a call away.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toast.success("Calling customer support...")}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1865F2] px-7 py-2.5 text-[13.5px] font-bold shadow-md hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Phone size={16} className="fill-[#1865F2]" />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </section>
      </div>



      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 22. INTERACTIVE MODALS                                                   */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <PropertyBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
        }}
      />

      <PropertyGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        title={property.title}
      />

      <PropertyVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={`${property.title} - 3D Tour`}
      />

      <PropertyReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
        }}
      />
    </div>
  );
}
