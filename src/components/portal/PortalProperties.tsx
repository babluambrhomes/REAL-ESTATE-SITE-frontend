"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  MapPin,
  Home,
  Building,
  Users,
  Compass,
  TrendingUp,
  LineChart,
  CalendarCheck,
  Trash2,
  Eye,
  Activity,
  Edit,
  PlusCircle,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Percent,
  Download,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { PreviewAsSellerModal } from "./PortalModals";
import { propertyApi } from "@/lib/features/property/propertyApi";
import { crmApi } from "@/lib/features/crm/crmApi";
import { formatPriceInr } from "@/lib/features/property/propertyAdapter";

interface PortalPropertiesProps {
  onPostProperty: () => void;
  onViewHealthScore?: () => void;
  onViewDiagnosis?: () => void;
  variant?: "dashboard" | "full";
  initialNavTab?: string;
  onSelectLead?: (leadId: string) => void;
}

const NAV_TABS = [
  { id: "my-properties", label: "My properties", icon: Home },
  { id: "my-projects", label: "My Projects", icon: Building },
  { id: "leads", label: "Leads", icon: Users },
  { id: "buyers-search", label: "Buyers Search", icon: Compass },
  { id: "price-trends", label: "Price Trends", icon: TrendingUp },
  { id: "location-insights", label: "Location Insights", icon: LineChart },
  { id: "market-outlook", label: "Market Outlook", icon: Sparkles },
  { id: "site-visits", label: "Site Visits", icon: CalendarCheck },
];

const INITIAL_PROPERTIES = [
  {
    id: "prop-1",
    title: "3 BHK Apartment",
    subtitle: "The Terraces At Max ...",
    price: "₹ 1.2 Cr",
    status: "On Going",
    views: "1.2 K",
    leads: "128",
    location: "Sector 124, Noida",
    image: "/images/properties/tower-popular-figma.jpg",
  },
  {
    id: "prop-2",
    title: "3 BHK Apartment",
    subtitle: "The Terraces At Max ...",
    price: "₹ 1.2 Cr",
    status: "On Going",
    views: "1.2 K",
    leads: "128",
    location: "Sector 124, Noida",
    image: "/images/properties/night-tower-figma.jpg",
  },
  {
    id: "prop-3",
    title: "3 BHK Apartment",
    subtitle: "The Terraces At Max ...",
    price: "₹ 1.2 Cr",
    status: "On Going",
    views: "1.2 K",
    leads: "128",
    location: "Sector 124, Noida",
    image: "/images/properties/max-estate-tower-figma.jpg",
  },
  {
    id: "prop-4",
    title: "3 BHK Apartment",
    subtitle: "The Terraces At Max ...",
    price: "₹ 1.2 Cr",
    status: "On Going",
    views: "1.2 K",
    leads: "128",
    location: "Sector 124, Noida",
    image: "/images/properties/ambr-aspire-figma.jpg",
  },
];

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "ATS Knightsbridge",
    developer: "ATS Infrastructure",
    location: "Sector 124, Noida",
    priceRange: "₹ 8.5 Cr - 15.0 Cr",
    totalUnits: 215,
    soldUnits: 176,
    launchDate: "Jan 2024",
    possession: "Dec 2026",
    status: "Under Construction",
    image: "/images/properties/tower-popular-figma.jpg",
  },
  {
    id: "proj-2",
    name: "Max Estate 361",
    developer: "Max Estates",
    location: "Sector 128, Noida",
    priceRange: "₹ 4.2 Cr - 9.8 Cr",
    totalUnits: 140,
    soldUnits: 90,
    launchDate: "Mar 2024",
    possession: "Oct 2027",
    status: "Newly Launched",
    image: "/images/properties/max-estate-tower-figma.jpg",
  },
  {
    id: "proj-3",
    name: "Ambr Magnolia",
    developer: "Ambr Group",
    location: "Sector 150, Noida",
    priceRange: "₹ 1.8 Cr - 3.5 Cr",
    totalUnits: 320,
    soldUnits: 291,
    launchDate: "Aug 2023",
    possession: "Mar 2025",
    status: "Near Completion",
    image: "/images/properties/ambr-aspire-figma.jpg",
  },
];

const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Rohit Malhotra",
    phone: "+91 98112 45890",
    email: "rohit.m@gmail.com",
    property: "3 BHK Apartment, Sector 124",
    budget: "₹ 1.25 Cr",
    status: "Fresh",
    date: "10 mins ago",
    score: 95,
  },
  {
    id: "lead-2",
    name: "Pooja Verma",
    phone: "+91 98710 33412",
    email: "pooja.v@outlook.com",
    property: "The Terraces At Max",
    budget: "₹ 1.40 Cr",
    status: "Follow Up",
    date: "2 hours ago",
    score: 88,
  },
  {
    id: "lead-3",
    name: "Amitabh Sen",
    phone: "+91 99580 12894",
    email: "amitabh.sen@tcs.com",
    property: "Max Estate 361",
    budget: "₹ 2.80 Cr",
    status: "Visit Scheduled",
    date: "Yesterday",
    score: 92,
  },
  {
    id: "lead-4",
    name: "Sunil Grover",
    phone: "+91 98101 77652",
    email: "sunil.grover@yahoo.com",
    property: "Ambr Magnolia 3BHK",
    budget: "₹ 1.85 Cr",
    status: "Negotiation",
    date: "3 days ago",
    score: 79,
  },
];

const BUYER_SEARCH_DATA = [
  {
    id: "bs-1",
    buyer: "Vikram Singhania",
    locality: "Sector 150, Noida",
    bhk: "3 BHK / 4 BHK",
    budget: "₹ 1.5 Cr - 2.0 Cr",
    timeline: "Ready to Move / < 6 Months",
    matchProperty: "The Terraces At Max Estate",
    matchScore: 98,
    verified: true,
  },
  {
    id: "bs-2",
    buyer: "Meenakshi Sundaram",
    locality: "Greater Noida West",
    bhk: "2 BHK / 3 BHK",
    budget: "₹ 75 L - 95 L",
    timeline: "Immediate",
    matchProperty: "Ambr Magnolia",
    matchScore: 91,
    verified: true,
  },
  {
    id: "bs-3",
    buyer: "Capt. Rajesh Bhardwaj",
    locality: "Sector 128 Expressway",
    bhk: "4 BHK Penthouse",
    budget: "₹ 3.5 Cr - 5.0 Cr",
    timeline: "Flexible",
    matchProperty: "ATS Knightsbridge",
    matchScore: 95,
    verified: true,
  },
];

const SITE_VISITS_DATA = [
  {
    id: "sv-1",
    buyer: "Rahul Sharma",
    phone: "+91 98112 00412",
    property: "The Terraces At Max (3 BHK)",
    dateTime: "Today, 4:00 PM",
    agent: "Self",
    status: "Confirmed",
  },
  {
    id: "sv-2",
    buyer: "Dr. Ananya Mukherjee",
    phone: "+91 98710 44219",
    property: "Ambr Aspire Sector 150",
    dateTime: "Tomorrow, 11:30 AM",
    agent: "Amit Kumar",
    status: "Confirmed",
  },
  {
    id: "sv-3",
    buyer: "Vikas Gupta",
    phone: "+91 99580 99812",
    property: "3 BHK Sector 124 Noida",
    dateTime: "Thursday, 2:00 PM",
    agent: "Self",
    status: "Pending",
  },
];

export const PortalProperties = ({
  onPostProperty,
  onViewHealthScore,
  onViewDiagnosis,
  variant = "dashboard",
  initialNavTab,
  onSelectLead,
}: PortalPropertiesProps) => {
  const [activeNavTab, setActiveNavTab] = useState(initialNavTab || "my-properties");
  const [activeFilterTab, setActiveFilterTab] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [filterType, setFilterType] = useState("property Type");
  const [filterLocation, setFilterLocation] = useState("Location");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [propertiesList, setPropertiesList] = useState(INITIAL_PROPERTIES);

  // Additional dynamic state
  const [projectsList, setProjectsList] = useState(INITIAL_PROJECTS);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLoc, setNewProjectLoc] = useState("");
  const [newProjectPrice, setNewProjectPrice] = useState("");
  const [newProjectUnits, setNewProjectUnits] = useState("");

  const [leadsList, setLeadsList] = useState(INITIAL_LEADS);
  const [leadStatusFilter, setLeadStatusFilter] = useState("All");

  const [siteVisitsList, setSiteVisitsList] = useState(SITE_VISITS_DATA);

  // Sync initialNavTab if prop changes
  useEffect(() => {
    if (initialNavTab) {
      setActiveNavTab(initialNavTab);
    }
  }, [initialNavTab]);

  // Sync properties from backend API and localStorage
  useEffect(() => {
    let localProps: any[] = [];
    try {
      const stored = localStorage.getItem("roofin_user_properties");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localProps = parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load stored properties", e);
    }

    // Call live backend API
    propertyApi
      .getMyProperties()
      .then((res: any) => {
        const apiData = res?.data?.data || res?.data;
        if (Array.isArray(apiData) && apiData.length > 0) {
          const mapped = apiData.map((p: any) => ({
            id: p.id,
            title: p.title,
            subtitle: p.addressLine || p.city || "Noida",
            price: formatPriceInr(Number(p.minPrice || p.variant?.price || 12000000)),
            status: p.propertyStatus === "READY_TO_MOVE" ? "Live" : "On Going",
            views: `${p.viewsCount || 1}`,
            leads: `${p.likesCount || 0}`,
            location: `${p.city || "Noida"}, ${p.state || "UP"}`,
            image: p.featuredImage || "/images/properties/tower-popular-figma.jpg",
          }));
          setPropertiesList([...localProps, ...mapped, ...INITIAL_PROPERTIES]);
          return;
        }
        setPropertiesList([...localProps, ...INITIAL_PROPERTIES]);
      })
      .catch(() => {
        // Smooth fallback
        setPropertiesList([...localProps, ...INITIAL_PROPERTIES]);
      });

    // Also fetch live seller site visits
    crmApi
      .getSellerSiteVisits()
      .then((res: any) => {
        const visits = res?.data || res?.data?.data;
        if (Array.isArray(visits) && visits.length > 0) {
          const mappedVisits = visits.map((sv: any) => ({
            id: sv.id,
            buyer: sv.name || sv.user?.name || "Client",
            phone: sv.phone || sv.user?.phone || "+91 98112 00412",
            property: sv.property?.title || "The Terraces At Max (3 BHK)",
            dateTime: `${sv.visitDate ? new Date(sv.visitDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Today"}, ${sv.startTime || "4:00 PM"}`,
            agent: "Self",
            status: sv.status === "CONFIRMED" ? "Confirmed" : sv.status === "COMPLETED" ? "Completed" : "Pending",
          }));
          setSiteVisitsList(mappedVisits);
        }
      })
      .catch(() => {
        // Fallback to initial site visits
      });
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOpenPreview = (prop: any) => {
    setSelectedProperty(prop);
    setPreviewModalOpen(true);
  };

  const handleEditProperty = (prop: any) => {
    try {
      const draft = {
        societyName: prop.subtitle,
        selectedSubtype: prop.title?.split(" ")[2] || "Apartment",
        bhk: prop.title?.slice(0, 5) || "3 BHK",
        totalPrice: prop.price?.replace(/[^\d.,]/g, "") || "1,20,00,000",
        selectedLocality: prop.location || "Sector 124, Noida",
      };
      localStorage.setItem("roofin_post_property_draft", JSON.stringify(draft));
    } catch (err) {}
    onPostProperty();
  };

  const handleDeleteProperty = (id: string) => {
    const updated = propertiesList.filter((p) => p.id !== id);
    setPropertiesList(updated);
    try {
      const stored = localStorage.getItem("roofin_user_properties");
      if (stored) {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter((p: any) => p.id !== id);
        localStorage.setItem("roofin_user_properties", JSON.stringify(filtered));
      }
    } catch (err) {}

    // Delete on backend if valid UUID
    if (propertyApi.isUUID(id)) {
      propertyApi.deleteProperty(id).catch(() => {});
    }

    setActiveMenuId(null);
    toast.success("Property removed successfully");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) {
      toast.error("Please enter project name");
      return;
    }
    const created = {
      id: `proj-${Date.now()}`,
      name: newProjectName,
      developer: "Roofin Developer Partner",
      location: newProjectLoc || "Noida Extension",
      priceRange: newProjectPrice || "₹ 1.2 Cr - 2.5 Cr",
      totalUnits: Number(newProjectUnits) || 100,
      soldUnits: 12,
      launchDate: "Current Quarter",
      possession: "2027",
      status: "Newly Launched",
      image: "/images/properties/tower-popular-figma.jpg",
    };
    setProjectsList([created, ...projectsList]);
    setIsAddProjectModalOpen(false);
    setNewProjectName("");
    setNewProjectLoc("");
    setNewProjectPrice("");
    setNewProjectUnits("");
    toast.success("New Project added successfully!");
  };

  const handleConfirmSiteVisit = (id: string) => {
    setSiteVisitsList((prev) =>
      prev.map((sv) => (sv.id === id ? { ...sv, status: "Confirmed" } : sv))
    );
    if (propertyApi.isUUID(id)) {
      crmApi.updateSiteVisitStatus(id, "CONFIRMED").catch(() => {});
    }
    toast.success("Site visit confirmed!");
  };

  const filteredProperties = propertiesList.filter((p) => {
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchSub = p.subtitle?.toLowerCase().includes(q);
      const matchLoc = p.location?.toLowerCase().includes(q);
      if (!matchTitle && !matchSub && !matchLoc) return false;
    }

    if (activeFilterTab.startsWith("Live")) {
      if (p.status !== "On Going" && p.status !== "Live") return false;
    } else if (activeFilterTab.toLowerCase().includes("review")) {
      if (!p.status?.toLowerCase().includes("review")) return false;
    } else if (activeFilterTab.startsWith("Sold")) {
      if (p.status !== "Sold") return false;
    }

    if (filterType && filterType !== "property Type") {
      if (!p.title?.toLowerCase().includes(filterType.toLowerCase())) return false;
    }

    if (filterLocation && filterLocation !== "Location") {
      if (!p.location?.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs font-jakarta overflow-hidden">
      {/* 1. Horizontal Navigation Tabs Strip (Figma 1:1) */}
      <div className="border-b border-slate-200 px-6 pt-3 flex items-center gap-7 overflow-x-auto no-scrollbar">
        {NAV_TABS.map((tab) => {
          const isActive = activeNavTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveNavTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 text-[14px] font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-[#1865F2] font-bold"
                  : "text-slate-600 hover:text-[#1865F2]"
              }`}
            >
              {IconComponent && (
                <IconComponent
                  size={17}
                  className={isActive ? "text-[#1865F2]" : "text-slate-400"}
                />
              )}
              <span>{tab.label}</span>

              {/* Blue underline indicator for active tab */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1865F2] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: MY PROPERTIES (Original Table + Filters + Actions)      */}
      {/* ============================================================== */}
      {activeNavTab === "my-properties" && (
        <div className="p-6 space-y-5">
          {/* Header Row: Title & Post Property Solid Blue Button */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[20px] font-bold text-[#0B132B]">
              My properties ({propertiesList.length})
            </h3>

            <button
              type="button"
              onClick={onPostProperty}
              className="px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-semibold text-[13px] shadow-sm transition-all cursor-pointer active:scale-98"
            >
              Post Property
            </button>
          </div>

          {/* Filter Bar & Search Row (Figma 1:1) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Status Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "All", label: `All(${propertiesList.length})` },
                {
                  id: "Live",
                  label: `Live(${propertiesList.filter((p) => p.status === "On Going" || p.status === "Live").length})`,
                },
                {
                  id: "under Review",
                  label: `under Review(${propertiesList.filter((p) => p.status?.toLowerCase().includes("review")).length})`,
                },
                {
                  id: "Sold",
                  label: `Sold(${propertiesList.filter((p) => p.status === "Sold").length})`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilterTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeFilterTab === tab.id
                      ? "bg-[#EAF2FF] text-[#1865F2]"
                      : "bg-[#F8FAFC] text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[160px] sm:min-w-[200px]">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full h-8.5 pl-8 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] bg-white"
                />
              </div>

              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-8.5 pl-3 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="property Type">property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Builder Floor">Builder Floor</option>
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="h-8.5 pl-3 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="Location">Location</option>
                  <option value="Sector 124">Sector 124, Noida</option>
                  <option value="Sector 150">Sector 150, Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              {(searchVal ||
                filterType !== "property Type" ||
                filterLocation !== "Location" ||
                activeFilterTab !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchVal("");
                    setFilterType("property Type");
                    setFilterLocation("Location");
                    setActiveFilterTab("All");
                  }}
                  className="h-8.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Property Cards List */}
          <div className="space-y-3 pt-1">
            {filteredProperties.length === 0 ? (
              <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
                <Home size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">No properties found</p>
                <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters or search keywords</p>
              </div>
            ) : (
              filteredProperties.map((p) => {
                const isChecked = selectedIds.includes(p.id);
                const isMenuOpen = activeMenuId === p.id;
                const isUnderReview = p.status?.toLowerCase().includes("review");
                const isSold = p.status === "Sold";

                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all p-3 sm:p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 relative"
                  >
                    {/* Left group */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(p.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[#1865F2] focus:ring-0 cursor-pointer shrink-0"
                      />

                      <div
                        onClick={() => handleOpenPreview(p)}
                        className="relative w-28 h-18 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/70 cursor-pointer group"
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4
                          onClick={() => handleOpenPreview(p)}
                          className="text-[15.5px] font-bold text-[#0B132B] truncate cursor-pointer hover:text-[#1865F2] transition-colors leading-snug"
                        >
                          {p.title}
                        </h4>
                        <p className="text-[12px] text-slate-400 truncate mt-0.5">
                          {p.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Middle & Right group */}
                    <div className="flex flex-wrap items-center gap-5 sm:gap-7 shrink-0">
                      <div className="min-w-[70px]">
                        <span className="text-[16px] font-bold text-[#0B132B]">
                          {p.price}
                        </span>
                      </div>

                      <div className="min-w-[80px]">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold text-center ${
                            isUnderReview
                              ? "bg-amber-50 text-amber-600 border border-amber-200"
                              : isSold
                              ? "bg-slate-100 text-slate-600"
                              : "bg-[#E8F8F0] text-[#00BA63]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      <div className="text-center min-w-[45px]">
                        <span className="block text-[14px] font-bold text-[#0B132B] leading-tight">
                          {p.views}
                        </span>
                        <span className="block text-[11px] text-slate-400 font-medium">
                          Views
                        </span>
                      </div>

                      <div className="text-center min-w-[45px]">
                        <span className="block text-[14px] font-bold text-[#0B132B] leading-tight">
                          {p.leads}
                        </span>
                        <span className="block text-[11px] text-slate-400 font-medium">
                          Leads
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600 min-w-[140px]">
                        <MapPin size={15} className="text-slate-500 shrink-0" />
                        <span className="text-[13px] font-normal truncate">
                          {p.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 relative">
                        <button
                          type="button"
                          onClick={() => handleEditProperty(p)}
                          className="px-4 py-1.5 rounded-lg border border-blue-100 bg-[#F0F5FF] hover:bg-blue-100 text-[#1865F2] text-[12px] font-semibold transition-colors cursor-pointer"
                        >
                          Edit
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setActiveMenuId(isMenuOpen ? null : p.id)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            title="More options"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-30 text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenPreview(p);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors cursor-pointer text-left"
                              >
                                <Eye size={14} className="text-slate-400" />
                                <span>Preview Listing</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  onViewHealthScore?.();
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors cursor-pointer text-left"
                              >
                                <Activity size={14} className="text-slate-400" />
                                <span>Health Score</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  onViewDiagnosis?.();
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors cursor-pointer text-left"
                              >
                                <SlidersHorizontal size={14} className="text-slate-400" />
                                <span>Diagnosis</span>
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <button
                                type="button"
                                onClick={() => handleDeleteProperty(p.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer text-left"
                              >
                                <Trash2 size={14} className="text-rose-500" />
                                <span>Delete Listing</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MY PROJECTS (Figma Style Project Master Tracker)        */}
      {/* ============================================================== */}
      {activeNavTab === "my-projects" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B]">
                Active Development Projects ({projectsList.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage residential towers, commercial layouts, unit inventory and construction milestones
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddProjectModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-all active:scale-98"
            >
              <PlusCircle size={15} />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectsList.map((proj) => {
              const percentSold = Math.round((proj.soldUnits / proj.totalUnits) * 100);
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                      <Image
                        src={proj.image}
                        alt={proj.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#1865F2] shadow-xs backdrop-blur-sm">
                        {proj.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="text-[15px] font-bold text-[#0B132B]">
                        {proj.name}
                      </h4>
                      <span className="text-[13px] font-extrabold text-[#1865F2]">
                        {proj.priceRange}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{proj.location}</span>
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Inventory Sold</span>
                        <span className="text-[#0B132B]">
                          {proj.soldUnits} / {proj.totalUnits} Units ({percentSold}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-[#1865F2] rounded-full"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toast.success(`Opening inventory for ${proj.name}`)}
                      className="flex-1 py-2 rounded-xl bg-[#EAF2FF] hover:bg-blue-100 text-[#1865F2] text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Manage Units
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success("Downloading Project Brochure PDF...")}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Brochure"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LEADS (Quick Action Leads Strip)                         */}
      {/* ============================================================== */}
      {activeNavTab === "leads" && (
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B]">
                Property Inquiries & Buyer Leads ({leadsList.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct phone, WhatsApp and meeting requests from active verified buyers
              </p>
            </div>

            <div className="flex items-center gap-2">
              {["All", "Fresh", "Follow Up", "Visit Scheduled"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setLeadStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    leadStatusFilter === st
                      ? "bg-[#1865F2] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {leadsList
              .filter((l) => leadStatusFilter === "All" || l.status === leadStatusFilter)
              .map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#EAF2FF] text-[#1865F2] font-black text-sm flex items-center justify-center shrink-0">
                      {lead.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-[#0B132B]">
                          {lead.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          Match {lead.score}%
                        </span>
                        <span className="text-[11px] text-slate-400">• {lead.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Interested in: <strong className="text-slate-700">{lead.property}</strong> | Budget: <strong className="text-[#1865F2]">{lead.budget}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={() => toast.success(`Calling ${lead.name}...`)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-[#1865F2] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone size={13} className="text-[#1865F2]" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectLead?.(lead.id)}
                      className="px-4 py-1.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Full Profile
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: BUYERS SEARCH (Active Buyer Demands Platform-Wide)       */}
      {/* ============================================================== */}
      {activeNavTab === "buyers-search" && (
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-[20px] font-bold text-[#0B132B]">
              Verified Buyer Requirements (Delhi NCR)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Buyers with pre-approved loans and high intent looking for homes matching your listings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BUYER_SEARCH_DATA.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-blue-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 text-[#1865F2]">
                      {b.bhk}
                    </span>
                    <span className="text-xs font-extrabold text-[#00BA63]">
                      {b.matchScore}% Match
                    </span>
                  </div>

                  <h4 className="text-[15px] font-bold text-[#0B132B] mt-3">
                    {b.buyer}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{b.locality}</span>
                  </p>

                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Budget:</span>
                      <strong className="text-[#0B132B]">{b.budget}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timeline:</span>
                      <strong className="text-slate-700">{b.timeline}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toast.success(`Property pitch sent to ${b.buyer}!`)}
                    className="w-full py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Pitch My Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: PRICE TRENDS (Sector Wise Rate Heat & Appreciation)      */}
      {/* ============================================================== */}
      {activeNavTab === "price-trends" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B]">
                Noida & NCR Micro-Market Price Trends
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current average rates per sq.ft and YoY capital appreciation benchmark
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
              Avg Market Growth +16.2%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { loc: "Sector 150 Noida", rate: "₹ 9,200", growth: "+14.2% YoY", tag: "High Growth" },
              { loc: "Sector 128 Expressway", rate: "₹ 14,800", growth: "+21.5% YoY", tag: "Luxury Hub" },
              { loc: "Greater Noida West", rate: "₹ 5,600", growth: "+18.4% YoY", tag: "Volume Driver" },
              { loc: "Sector 62 IT Hub", rate: "₹ 7,400", growth: "+8.1% YoY", tag: "Stable Yield" },
            ].map((card, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:border-blue-200 transition-all"
              >
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {card.loc}
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-[22px] font-extrabold text-[#0B132B]">
                    {card.rate}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ sq.ft</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight size={14} />
                    {card.growth}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-[#1865F2]">
                    {card.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-[14px] font-bold text-[#0B132B] mb-2">
              💡 Pricing Recommendation For Your Active Listings
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on recent transactions in Sector 124 and Sector 150, 3 BHK apartments between 1,600 - 1,900 sq.ft listed at <strong>₹ 7,500 - ₹ 8,200 / sq.ft</strong> are receiving 3.4x faster closures with an average listing-to-sale velocity of 22 days.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: LOCATION INSIGHTS (Infrastructure Drivers)              */}
      {/* ============================================================== */}
      {activeNavTab === "location-insights" && (
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-[20px] font-bold text-[#0B132B]">
              Key Infrastructure & Growth Drivers
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upcoming transit corridors, metro networks, and commercial developments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Jewar Noida International Airport",
                dist: "38 km (35 mins)",
                impact: "+28% Value Surge",
                desc: "Runway trials active. Operational flights expected to unlock international corporate transit.",
              },
              {
                title: "Aqua Line Metro Extension",
                dist: "500m Walk",
                impact: "Direct Delhi Connect",
                desc: "Connecting Botanical Garden to Sector 142 directly, bypassing 40 mins of peak roadway congestion.",
              },
              {
                title: "FNG 6-Lane Expressway",
                dist: "2.5 km away",
                impact: "Tri-City Corridor",
                desc: "High-speed loop linking Faridabad, Noida and Ghaziabad within 25 minutes travel time.",
              },
            ].map((infra, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#1865F2]">
                    {infra.dist}
                  </span>
                  <h4 className="text-[15px] font-bold text-[#0B132B] mt-3">
                    {infra.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {infra.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600">
                  {infra.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 7: MARKET OUTLOOK (NCR Real Estate Sentiment Index)        */}
      {/* ============================================================== */}
      {activeNavTab === "market-outlook" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B]">
                NCR Real Estate Sentiment Index
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time quarterly market confidence, absorption velocity, and supply inventory
              </p>
            </div>
            <div className="text-right">
              <span className="text-[24px] font-black text-[#1865F2]">8.8 / 10</span>
              <span className="block text-[11px] font-bold text-emerald-600">Extremely Bullish</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium">Inventory Absorption Rate</span>
              <p className="text-xl font-bold text-[#0B132B] mt-1">2.4 Months</p>
              <p className="text-[11px] text-emerald-600 mt-1">Lowest inventory holding in 5 years</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium">Ready-To-Move Premium</span>
              <p className="text-xl font-bold text-[#0B132B] mt-1">+18.5%</p>
              <p className="text-[11px] text-blue-600 mt-1">Buyers willing to pay premium for possession</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium">Avg Inquiry Response Time</span>
              <p className="text-xl font-bold text-[#0B132B] mt-1">&lt; 14 Minutes</p>
              <p className="text-[11px] text-slate-500 mt-1">Top converting agents respond in 15 mins</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 8: SITE VISITS (Schedule & Confirmed Visits)               */}
      {/* ============================================================== */}
      {activeNavTab === "site-visits" && (
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B]">
                Scheduled Physical Site Visits ({siteVisitsList.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Confirmed client tours, escort agent assignments, and customer feedback
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.success("Select a buyer from your CRM to schedule a new site visit")}
              className="px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-sm"
            >
              + Schedule Visit
            </button>
          </div>

          <div className="space-y-3">
            {siteVisitsList.map((sv) => (
              <div
                key={sv.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center shrink-0">
                    <CalendarCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-bold text-[#0B132B]">
                        {sv.buyer}
                      </h4>
                      <span className="text-xs text-slate-400 font-normal">({sv.phone})</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold ${
                          sv.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {sv.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Visiting: <strong className="text-slate-800">{sv.property}</strong> | Time: <strong className="text-[#1865F2]">{sv.dateTime}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sv.status !== "Confirmed" && (
                    <button
                      type="button"
                      onClick={() => handleConfirmSiteVisit(sv.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Confirm Visit
                    </button>
                  )}
                  <a
                    href={`tel:${sv.phone}`}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-[#1865F2] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone size={13} className="text-[#1865F2]" />
                    <span>Call Buyer</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0B132B]">Add New Project</h3>
              <button
                type="button"
                onClick={() => setIsAddProjectModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. ATS Knightsbridge Phase 2"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Locality / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 128, Noida"
                  value={newProjectLoc}
                  onChange={(e) => setNewProjectLoc(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 2 Cr - 4 Cr"
                    value={newProjectPrice}
                    onChange={(e) => setNewProjectPrice(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Units</label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    value={newProjectUnits}
                    onChange={(e) => setNewProjectUnits(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1865F2]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal Mounted */}
      <PreviewAsSellerModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        property={
          selectedProperty
            ? {
                title: selectedProperty.title,
                specs: selectedProperty.subtitle,
                price: selectedProperty.price,
                views: `${selectedProperty.views} Views`,
                leads: Number(selectedProperty.leads) || 128,
                visits: 20,
                image: selectedProperty.image,
                status: selectedProperty.status,
              }
            : undefined
        }
        onOpenPreview={() => {
          onViewHealthScore?.();
        }}
      />
    </div>
  );
};
