"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import {
  Blocks,
  Logs,
  MapPinned,
  X,
  RotateCcw,
  SearchX,
  Heart,
  Sparkles,
  ArrowLeft,
  Trash2,
  CalendarCheck,
  Search,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { PropertyCard } from "@/components/card/PropertyCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/common/Pagination";
import ViewMap from "@/components/common/ViewMap";
import { ListingsSidebarWidgets } from "@/components/properties/ListingsSidebarWidgets";
import { ListingsTopAgents } from "@/components/properties/ListingsTopAgents";
import { ListingsReadyToMove } from "@/components/properties/ListingsReadyToMove";
import { ListingsHandpicked } from "@/components/properties/ListingsHandpicked";
import { ListingsPriceDropped } from "@/components/properties/ListingsPriceDropped";
import { ListingsPropertyExperts } from "@/components/properties/ListingsPropertyExperts";
import { WhyChooseRoofinBanner } from "@/components/common/WhyChooseRoofinBanner";
import type { OptionType, Property } from "@/types";
import { properties, fastSellingProperties, handpickedProperties } from "@/data/properties";
import { listingSelectStyles } from "@/lib/selectStyles";
import { useWishlist, getSavedPropertiesData } from "@/lib/wishlist";
import { useSearchPropertiesQuery } from "@/lib/features/property/propertyHooks";
import { mapApiPropertyToUi } from "@/lib/features/property/propertyAdapter";
import type { SearchPropertiesParams } from "@/lib/features/property/propertyApi";

const PropertyCardSkeleton = ({ layout = "list" }: { layout?: "grid" | "list" }) => {
  if (layout === "grid") {
    return (
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm animate-pulse space-y-3">
        <div className="h-52 w-full rounded-[22px] bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="h-6 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <div className="h-6 w-24 rounded bg-slate-200" />
          <div className="h-9 w-28 rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row rounded-[32px] border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm animate-pulse gap-5">
      <div className="h-60 lg:w-[380px] rounded-[24px] bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-4 py-2">
        <div className="h-5 w-1/4 rounded bg-slate-200" />
        <div className="h-7 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="grid grid-cols-3 gap-3 pt-3">
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-10 rounded bg-slate-100" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="h-7 w-28 rounded bg-slate-200" />
          <div className="h-11 w-36 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

const sortOptions: OptionType[] = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const PER_PAGE = 12;

const formatName = (str?: string | null) => {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const PropertyListingsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { savedIds, clearAll } = useWishlist();

  const savedOnly = searchParams.get("saved") === "true";
  const [view, setView] = useState<"grid" | "list">(savedOnly ? "grid" : "list");
  const [showMap, setShowMap] = useState(searchParams.get("map") === "true");
  const [page, setPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<OptionType>(sortOptions[0]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    if (!sortDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortDropdownOpen]);

  // Extract URL Query Parameters
  const purpose = searchParams.get("purpose") || "";
  const city = searchParams.get("city") || "";
  const locality = searchParams.get("locality") || "";
  const budget = searchParams.get("budget") || "";
  const propertyType = searchParams.get("type") || "";
  const bhk = searchParams.get("bhk") || "";
  const q = searchParams.get("q") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const status = searchParams.get("status") || "";
  const postedBy = searchParams.get("postedBy") || "";
  const amenities = searchParams.get("amenities") || "";

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [
    purpose,
    city,
    locality,
    budget,
    propertyType,
    bhk,
    q,
    minPrice,
    maxPrice,
    status,
    postedBy,
    amenities,
    savedOnly,
  ]);

  // 1. Dynamic Filtering Logic
  const filteredProperties = useMemo(() => {
    // If user is on the Saved Properties (Wishlist) view:
    // Resolve EVERY saved ID so count always matches 100% and nothing is missing
    if (savedOnly) {
      if (savedIds.length === 0) return [];

      const idMap = new Map<string, Property>();

      // 1. Primary properties array from properties.ts
      properties.forEach((p) => {
        if (p.id !== undefined && p.id !== null) {
          idMap.set(String(p.id), p);
        }
      });

      // 2. Fast selling properties (Home page)
      fastSellingProperties.forEach((p) => {
        if (p.id && !idMap.has(String(p.id))) {
          idMap.set(String(p.id), p);
        }
      });

      // 3. Handpicked properties (Home page)
      handpickedProperties.forEach((p) => {
        if (p.id && !idMap.has(String(p.id))) {
          idMap.set(String(p.id), p);
        }
      });

      // 4. Any cached property details from localStorage (saved when heart was clicked)
      const cached = getSavedPropertiesData();
      Object.entries(cached).forEach(([id, p]) => {
        if (!idMap.has(id)) {
          idMap.set(id, p);
        }
      });

      // Map each savedId to its property, fallback if unknown id
      const resolved: Property[] = [];
      savedIds.forEach((id) => {
        const found = idMap.get(String(id));
        if (found) {
          resolved.push(found);
        } else {
          resolved.push({
            id,
            title: "NBCC Aspire Silicon City",
            location: "Sector 76, Noida",
            city: "Noida",
            type: "Apartment",
            beds: "3 BHK",
            price: "₹1.25* Cr",
            originalPrice: "₹1.58 Cr",
            verifiedText: "VERIFIED DEAL",
            images: [
              "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
            ],
            chips: ["2, 3 & 4 BHK Apartments"],
            phone: "+91 9876543210",
          });
        }
      });

      return resolved;
    }

    return properties.filter((item) => {

      // Filter by Purpose (Buy / Rent / Commercial / Plot)
      if (purpose) {
        const p = purpose.toLowerCase();
        if (p === "commercial") {
          const isComm =
            (item.type || "").toLowerCase().includes("commercial") ||
            item.category === "commercial";
          if (!isComm) return false;
        } else if (p === "plot" || p === "land") {
          const isPlot =
            (item.type || "").toLowerCase().includes("plot") ||
            (item.type || "").toLowerCase().includes("land");
          if (!isPlot) return false;
        } else if (p === "rent") {
          // Keep rental properties
        }
      }

      // Filter by City
      if (city) {
        const targetCity = city.toLowerCase().replace(/-/g, " ").trim();
        const itemCity = (item.city || "").toLowerCase();
        const itemLocation = (item.location || "").toLowerCase();
        const isCityMatch = itemCity.includes(targetCity) || itemLocation.includes(targetCity);
        const isNoidaTwin = targetCity.includes("noida") && (itemCity.includes("noida") || itemLocation.includes("noida"));
        if (!isCityMatch && !isNoidaTwin) {
          return false;
        }
      }

      // Filter by Locality
      if (locality) {
        const targetLocality = locality
          .toLowerCase()
          .replace(/-/g, " ")
          .replace(/sector/g, "")
          .trim();
        const itemLocation = (item.location || "").toLowerCase();
        if (!itemLocation.includes(targetLocality)) {
          return false;
        }
      }

      // Filter by Budget Preset (priceValue is in Lakhs, e.g. 125 = 1.25 Cr)
      if (budget) {
        const val = item.priceValue || 0;
        if (budget === "under-30l" && val > 30) return false;
        if (budget === "30-50l" && (val < 30 || val > 50)) return false;
        if (budget === "50-75l" && (val < 50 || val > 75)) return false;
        if (budget === "75l-1cr" && (val < 75 || val > 100)) return false;
        if (budget === "1-1.5cr" && (val < 100 || val > 150)) return false;
        if (budget === "1.5-3cr" && (val < 150 || val > 300)) return false;
        if (budget === "above-3cr" && val < 300) return false;
      }

      // Filter by Min/Max Price from slider (supports INR rupees or Lakhs)
      if (minPrice) {
        const minLakhs = Number(minPrice) > 10000 ? Number(minPrice) / 100000 : Number(minPrice);
        if (!isNaN(minLakhs) && (item.priceValue || 0) < minLakhs) return false;
      }
      if (maxPrice) {
        const maxLakhs = Number(maxPrice) > 10000 ? Number(maxPrice) / 100000 : Number(maxPrice);
        if (!isNaN(maxLakhs) && (item.priceValue || 0) > maxLakhs) return false;
      }

      // Filter by Construction Status (e.g. "Ready to move", "Under Construction", "New Launch")
      if (status) {
        const statusList = status.toLowerCase().split(",").map((s) => s.trim());
        const itemInfoChips = item.infoChips?.map((c) => `${c.value} ${c.label}`.toLowerCase()).join(" ") || "";
        const itemVerified = (item.verifiedText || "").toLowerCase();
        const itemDesc = (item.description || "").toLowerCase();

        const matchesStatus = statusList.some((s) => {
          if (s.includes("ready")) {
            return itemInfoChips.includes("ready") || itemDesc.includes("ready to move");
          }
          if (s.includes("under") || s.includes("construction")) {
            return itemInfoChips.includes("under construction") || itemDesc.includes("under construction");
          }
          if (s.includes("launch")) {
            return itemVerified.includes("launch") || itemDesc.includes("launch");
          }
          return false;
        });

        if (!matchesStatus) return false;
      }

      // Filter by Property Type
      if (propertyType) {
        const t = propertyType.toLowerCase();
        const itemType = (item.type || "").toLowerCase();
        if (t.includes("flat") || t.includes("apartment")) {
          if (!itemType.includes("apartment") && !itemType.includes("flat"))
            return false;
        } else if (t.includes("villa") || t.includes("house")) {
          if (!itemType.includes("villa") && !itemType.includes("house"))
            return false;
        } else if (t.includes("plot") || t.includes("land")) {
          if (!itemType.includes("plot") && !itemType.includes("land"))
            return false;
        } else if (t.includes("builder") || t.includes("floor")) {
          if (!itemType.includes("builder") && !itemType.includes("floor"))
            return false;
        } else if (t.includes("office") || t.includes("shop") || t.includes("commercial")) {
          if (!itemType.includes("commercial")) return false;
        }
      }

      // Filter by BHK
      if (bhk) {
        const itemBeds = String(item.beds || "");
        const allowedBeds = bhk.split(",").map((s) => s.trim().replace(/\D/g, "")).filter(Boolean);
        if (allowedBeds.length > 0) {
          const hasMatch = allowedBeds.some((b) => itemBeds.includes(b));
          if (!hasMatch) return false;
        }
      }

      // Filter by general Search Keyword (q)
      if (q) {
        const query = q.toLowerCase();
        const bhkMatch = query.match(/(\d+)\s*bhk/);
        if (bhkMatch) {
          const reqBeds = bhkMatch[1];
          if (!String(item.beds || "").includes(reqBeds)) return false;
        }
        if (
          query.includes("noida") &&
          !(
            item.city?.toLowerCase().includes("noida") ||
            item.location?.toLowerCase().includes("noida")
          )
        )
          return false;
        if (
          query.includes("gurgaon") &&
          !(
            item.city?.toLowerCase().includes("gurgaon") ||
            item.location?.toLowerCase().includes("gurgaon")
          )
        )
          return false;
        if (
          query.includes("ghaziabad") &&
          !(
            item.city?.toLowerCase().includes("ghaziabad") ||
            item.location?.toLowerCase().includes("ghaziabad")
          )
        )
          return false;
        if (
          query.includes("delhi") &&
          !(
            item.city?.toLowerCase().includes("delhi") ||
            item.location?.toLowerCase().includes("delhi")
          )
        )
          return false;

        if (query.includes("villa") && !item.type?.toLowerCase().includes("villa"))
          return false;
        if (
          query.includes("flat") &&
          !item.type?.toLowerCase().includes("apartment")
        )
          return false;
        if (
          query.includes("studio") &&
          !(
            item.title?.toLowerCase().includes("studio") ||
            item.description?.toLowerCase().includes("studio")
          )
        )
          return false;
        if (query.includes("plot") && !item.type?.toLowerCase().includes("plot"))
          return false;

        const combined = `${item.title} ${item.location} ${item.city} ${item.type} ${
          item.description || ""
        } ${item.chips?.join(" ") || ""}`.toLowerCase();
        const searchWords = query
          .split(/\s+/)
          .filter(
            (w) =>
              !["in", "at", "for", "the", "under", "cr", "l", "bhk"].includes(w)
          );
        if (searchWords.length > 0) {
          const matchesAnyWord = searchWords.some((w) => combined.includes(w));
          if (!matchesAnyWord && !bhkMatch) return false;
        }
      }

      return true;
    });
  }, [purpose, city, locality, budget, minPrice, maxPrice, status, propertyType, bhk, q, savedOnly, savedIds]);

  // 2. Sorting Logic
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (selectedSort.value === "price-low") {
      list.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (selectedSort.value === "price-high") {
      list.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    } else if (selectedSort.value === "popular") {
      list.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    }
    return list;
  }, [filteredProperties, selectedSort]);

  // 3. Live Backend API Query integration
  const searchApiParams = useMemo<SearchPropertiesParams>(() => {
    const params: SearchPropertiesParams = {
      page,
      limit: PER_PAGE,
    };
    if (q) params.q = q;
    if (city) params.city = city.replace(/-/g, " ");
    if (locality) params.locality = locality;
    if (propertyType) {
      const lower = propertyType.toLowerCase();
      if (lower.includes("villa")) params.propertyType = "VILLA";
      else if (lower.includes("house")) params.propertyType = "HOUSE";
      else if (lower.includes("apartment") || lower.includes("flat")) params.propertyType = "APARTMENT";
      else if (lower.includes("floor") || lower.includes("builder")) params.propertyType = "BUILDER_FLOOR";
      else if (lower.includes("studio") || lower.includes("rk")) params.propertyType = "STUDIO";
      else if (lower.includes("penthouse")) params.propertyType = "PENTHOUSE";
      else if (lower.includes("plot") || lower.includes("land")) params.propertyType = "PLOT";
      else if (lower.includes("shop")) params.propertyType = "COMMERCIAL_SHOP";
      else if (lower.includes("office")) params.propertyType = "COMMERCIAL_OFFICE";
      else if (lower.includes("commercial")) params.propertyType = "COMMERCIAL_BUILDING";
      else {
        const upper = propertyType.toUpperCase().replace(/[-\s/]/g, "_");
        const validTypes = ["APARTMENT", "HOUSE", "VILLA", "BUILDER_FLOOR", "PENTHOUSE", "STUDIO", "PLOT", "COMMERCIAL_SHOP", "COMMERCIAL_OFFICE"];
        if (validTypes.includes(upper)) params.propertyType = upper;
      }
    }
    if (purpose) {
      params.transactionType = purpose.toLowerCase() === "rent" ? "RENT" : "SALE";
    }

    if (selectedSort.value === "price-low") params.sort = "price_asc";
    else if (selectedSort.value === "price-high") params.sort = "price_desc";
    else if (selectedSort.value === "popular") params.sort = "popular";
    else params.sort = "newest";

    if (budget) {
      if (budget === "under-30l") params.maxPrice = 3000000;
      else if (budget === "30-50l") { params.minPrice = 3000000; params.maxPrice = 5000000; }
      else if (budget === "50-75l") { params.minPrice = 5000000; params.maxPrice = 7500000; }
      else if (budget === "75l-1cr") { params.minPrice = 7500000; params.maxPrice = 10000000; }
      else if (budget === "1-1.5cr") { params.minPrice = 10000000; params.maxPrice = 15000000; }
      else if (budget === "1.5-3cr") { params.minPrice = 15000000; params.maxPrice = 30000000; }
      else if (budget === "above-3cr") params.minPrice = 30000000;
    }

    if (minPrice) {
      const num = Number(minPrice);
      params.minPrice = num > 10000 ? num : num * 100000;
    }
    if (maxPrice) {
      const num = Number(maxPrice);
      params.maxPrice = num > 10000 ? num : num * 100000;
    }

    if (bhk) {
      const allowedDigits = bhk.split(",").map((s) => s.replace(/\D/g, "")).filter(Boolean);
      if (allowedDigits.length === 1 && ["1", "2", "3", "4", "5", "6", "7", "8"].includes(allowedDigits[0])) {
        params.bhk = allowedDigits[0];
      } else if (allowedDigits.length > 0) {
        const num = parseInt(allowedDigits[0]);
        if (!isNaN(num)) params.bedrooms = num;
      }
    }

    return params;
  }, [page, q, city, locality, propertyType, purpose, selectedSort, budget, bhk, minPrice, maxPrice]);

  const { data: apiData, isLoading: isApiLoading } = useSearchPropertiesQuery(searchApiParams);

  const apiProperties = useMemo(() => {
    if (!apiData?.data?.data || apiData.data.data.length === 0) return null;
    return apiData.data.data.map(mapApiPropertyToUi);
  }, [apiData]);

  // If live backend properties exist and not savedOnly, use live data.
  // Otherwise gracefully fallback to local sortedProperties.
  const isUsingApi = !savedOnly && Boolean(apiProperties && apiProperties.length > 0);
  const totalItems = isUsingApi ? apiData!.data.meta.total : sortedProperties.length;
  const totalPages = isUsingApi ? Math.max(1, apiData!.data.meta.pages) : Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = isUsingApi
    ? apiProperties!
    : sortedProperties.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleViewChange = (next: "grid" | "list") => {
    setView(next);
  };

  const handleClearAllSaved = () => {
    if (confirm("Are you sure you want to remove all saved properties?")) {
      clearAll();
      toast.success("Saved properties cleared");
    }
  };

  // Helper to remove an active filter pill
  const clearFilter = (key: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete(key);
    if (key === "minPrice") nextParams.delete("maxPrice");
    if (key === "maxPrice") nextParams.delete("minPrice");
    router.push(`/properties?${nextParams.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/properties");
  };

  // Active filter pills list (for normal listing)
  const activePills = useMemo(() => {
    const pills: { key: string; label: string }[] = [];
    if (city) pills.push({ key: "city", label: `City: ${formatName(city)}` });
    if (locality)
      pills.push({ key: "locality", label: `Locality: ${formatName(locality)}` });
    if (propertyType)
      pills.push({ key: "type", label: `Type: ${formatName(propertyType)}` });
    if (budget) pills.push({ key: "budget", label: `Budget: ${budget}` });
    if (minPrice || maxPrice) {
      const minTxt = minPrice ? (Number(minPrice) >= 10000000 ? `${(Number(minPrice) / 10000000).toFixed(1)} Cr` : `${(Number(minPrice) / 100000).toFixed(0)} L`) : "0";
      const maxTxt = maxPrice ? (Number(maxPrice) >= 10000000 ? `${(Number(maxPrice) / 10000000).toFixed(1)} Cr` : `${(Number(maxPrice) / 100000).toFixed(0)} L`) : "Max";
      pills.push({ key: "minPrice", label: `Budget: ₹${minTxt} - ₹${maxTxt}` });
    }
    if (purpose)
      pills.push({ key: "purpose", label: `Purpose: ${formatName(purpose)}` });
    if (bhk) pills.push({ key: "bhk", label: `${bhk} BHK` });
    if (status) pills.push({ key: "status", label: `Status: ${status}` });
    if (postedBy) pills.push({ key: "postedBy", label: `By: ${postedBy}` });
    if (amenities) pills.push({ key: "amenities", label: `Amenities: ${amenities}` });
    if (q) pills.push({ key: "q", label: `Keyword: "${q}"` });
    return pills;
  }, [city, locality, propertyType, budget, minPrice, maxPrice, status, postedBy, amenities, purpose, bhk, q]);

  // Dynamic Page Title
  const dynamicTitle = useMemo(() => {
    if (savedOnly) return "Your Saved Properties";
    if (q) return `Results for "${q}"`;
    if (city && propertyType)
      return `${formatName(propertyType)}s in ${formatName(city)}`;
    if (city) return `Properties in ${formatName(city)}`;
    if (purpose) return `${formatName(purpose)} Properties`;
    return "Properties in Noida";
  }, [q, city, propertyType, purpose, savedOnly]);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pt-5 pb-16 sm:px-8 font-jakarta">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CASE A: DEDICATED SAVED PROPERTIES / WISHLIST VIEW                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {savedOnly ? (
        <div className="space-y-6 pt-2">
          {/* Breadcrumb for Wishlist */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: "Saved Wishlist" },
            ]}
          />

          {/* Premium Hero Banner for Saved Properties */}
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-[#1865F2] via-[#2563EB] to-[#0D47A1] p-6 sm:p-9 text-white shadow-[0_16px_40px_rgba(24,101,242,0.22)]">
            {/* Soft decorative glow circles */}
            <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-rose-400/20 blur-xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-cyan-400/15 blur-lg pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
                  <Heart className="h-3.5 w-3.5 text-rose-300 fill-rose-300" />
                  <span>My Shortlisted Collection</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  Saved Properties
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-blue-100 max-w-xl font-normal leading-relaxed">
                  Easily track your favorite homes, compare prices and amenities, or book a free site tour with our verified advisors.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1865F2] px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md hover:bg-blue-50 transition-all hover:scale-105"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Browse More</span>
                </Link>

                {totalItems > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllSaved}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-rose-500/80 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer backdrop-blur-md border border-white/20"
                    title="Remove all saved properties"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Toolbar for Saved Properties */}
          {totalItems > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#1865F2] text-xs font-bold">
                  {totalItems}
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {totalItems === 1 ? "Property Shortlisted" : "Properties Shortlisted"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                    Sort by:
                  </span>
                  <div className="w-36 sm:w-44">
                    <Select<OptionType, false>
                      options={sortOptions}
                      styles={listingSelectStyles}
                      isSearchable={false}
                      value={selectedSort}
                      onChange={(opt) => opt && setSelectedSort(opt)}
                    />
                  </div>
                </div>

                {/* Grid / List View Toggle (2 separate rounded buttons) */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => handleViewChange("list")}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-[12px] transition-all cursor-pointer border bg-white shadow-2xs",
                      view === "list"
                        ? "border-[#1865F2] text-[#1865F2]"
                        : "border-slate-300 text-[#475569] hover:border-slate-400"
                    )}
                    title="List View"
                  >
                    <svg width="22" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2" cy="2" r="1.75" fill="currentColor" />
                      <circle cx="2" cy="7.5" r="1.75" fill="currentColor" />
                      <circle cx="2" cy="13" r="1.75" fill="currentColor" />
                      <rect x="7" y="0.75" width="17" height="2.5" rx="1.25" fill="currentColor" />
                      <rect x="7" y="6.25" width="17" height="2.5" rx="1.25" fill="currentColor" />
                      <rect x="7" y="11.75" width="17" height="2.5" rx="1.25" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => handleViewChange("grid")}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-[12px] transition-all cursor-pointer border bg-white shadow-2xs",
                      view === "grid"
                        ? "border-[#1865F2] text-[#1865F2]"
                        : "border-slate-300 text-[#475569] hover:border-slate-400"
                    )}
                    title="Grid View"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="12" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="1.5" y="12" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="12" y="12" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State: If Wishlist is empty */}
          {totalItems === 0 ? (
            <div className="space-y-12 py-4">
              {/* Premium Empty State Card */}
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#FFF5F6] via-white to-white border border-rose-100/90 p-8 sm:p-14 text-center shadow-[0_8px_30px_rgba(244,63,94,0.06)]">
                {/* Background ambient blush */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-100/40 to-transparent pointer-events-none" />

                {/* Glowing Heart Container */}
                <div className="relative mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-rose-500/20 via-pink-400/25 to-rose-100 border border-rose-200/90 shadow-inner mb-6">
                  <Heart className="h-12 w-12 sm:h-14 sm:w-14 text-rose-500 fill-rose-500/35 transition-transform hover:scale-110" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Your Wishlist is Empty
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-lg mx-auto font-normal leading-relaxed">
                  You haven&apos;t saved any properties yet. Tap the heart icon on any property card while browsing to save it here for quick access.
                </p>

                {/* Call-to-action buttons */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1865F2] to-[#0284C7] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(24,101,242,0.35)] transition-all hover:scale-105 cursor-pointer"
                  >
                    <Search className="h-4 w-4" />
                    <span>Explore Verified Properties</span>
                  </Link>

                  <Link
                    href="/compare"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
                  >
                    <ArrowLeftRight className="h-4 w-4 text-[#1865F2]" />
                    <span>Compare Top Properties</span>
                  </Link>
                </div>
              </div>

              {/* Handpicked Recommendations Grid (User can click heart to save right away!) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#1865F2]" />
                      <span>Popular Properties You Might Like</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Click the heart icon on any property below to add it directly to your shortlist.
                    </p>
                  </div>

                  <Link
                    href="/properties"
                    className="text-xs sm:text-sm font-bold text-[#1865F2] hover:underline hidden sm:inline-block"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.slice(0, 3).map((property, idx) => (
                    <PropertyCard
                      key={`${property.id || property.title}-${idx}`}
                      {...property}
                      index={idx}
                      layout="vertical"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* If user has saved properties: Render neat Grid or List */
            <div className="space-y-8 pt-2">
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((property, idx) => (
                    <PropertyCard
                      key={`${property.id || property.title}-${idx}`}
                      {...property}
                      index={idx}
                      layout="vertical"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                  {visible.map((property, idx) => (
                    <PropertyCard
                      key={`${property.id || property.title}-${idx}`}
                      {...property}
                      index={idx}
                      layout="horizontal"
                    />
                  ))}
                </div>
              )}

              {/* Free Site Visit Advisor Banner */}
              <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-r from-[#F0F6FF] via-[#F8FAFF] to-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#1865F2] text-white flex items-center justify-center shrink-0 shadow-md">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Want to tour your shortlisted homes in person?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Schedule a free, zero-obligation site visit with our verified neighborhood experts.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 rounded-xl bg-[#1865F2] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Book Free Site Visit
                </Link>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    perPage={PER_PAGE}
                    onChange={handlePageChange}
                    text="Properties"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────── */
        /* CASE B: STANDARD PROPERTIES LISTING VIEW                          */
        /* ─────────────────────────────────────────────────────────────────── */
        <>
          {/* Dynamic Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: city ? `Property in ${formatName(city)}` : "Property in Noida" },
            ]}
          />

          {/* Subheader Toolbar */}
          <div className="my-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#0B132B]">
                {dynamicTitle}
              </h2>
              <p className="mt-0.5 text-xs sm:text-[13px] text-[#64748B] font-normal">
                {totalItems.toLocaleString("en-IN")} + properties available
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Short by pill dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  className="flex h-11 items-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 text-[14px] shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
                  aria-label="Sort properties"
                >
                  <span className="text-[#64748B] font-normal">Short by:</span>
                  <span className="font-bold text-[#0B132B]">{selectedSort.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-[#0B132B] stroke-[2.5] transition-transform duration-200 ml-1",
                      sortDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white shadow-xl border border-slate-100 z-50 p-1.5 overflow-hidden">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSelectedSort(opt);
                          setSortDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3.5 py-2 text-xs sm:text-[13px] rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-between",
                          selectedSort.value === opt.value
                            ? "bg-[#1865F2] text-white"
                            : "text-slate-700 hover:bg-slate-50 hover:text-[#1865F2]"
                        )}
                      >
                        <span>{opt.label}</span>
                        {selectedSort.value === opt.value && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid vs List View Toggle (2 separate rounded buttons matching Image 2 exactly) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => handleViewChange("list")}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[12px] transition-all cursor-pointer border bg-white shadow-2xs",
                    view === "list"
                      ? "border-[#1865F2] text-[#1865F2]"
                      : "border-slate-300 text-[#475569] hover:border-slate-400"
                  )}
                  title="List View"
                >
                  <svg width="22" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="1.75" fill="currentColor" />
                    <circle cx="2" cy="7.5" r="1.75" fill="currentColor" />
                    <circle cx="2" cy="13" r="1.75" fill="currentColor" />
                    <rect x="7" y="0.75" width="17" height="2.5" rx="1.25" fill="currentColor" />
                    <rect x="7" y="6.25" width="17" height="2.5" rx="1.25" fill="currentColor" />
                    <rect x="7" y="11.75" width="17" height="2.5" rx="1.25" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => handleViewChange("grid")}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[12px] transition-all cursor-pointer border bg-white shadow-2xs",
                    view === "grid"
                      ? "border-[#1865F2] text-[#1865F2]"
                      : "border-slate-300 text-[#475569] hover:border-slate-400"
                  )}
                  title="Grid View"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="12" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="1.5" y="12" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="12" y="12" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>

              {/* Map View Toggle Button */}
              <button
                type="button"
                aria-label="Toggle map view"
                onClick={() => setShowMap((prev) => !prev)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all cursor-pointer shadow-2xs border ml-1 sm:ml-1.5",
                  showMap
                    ? "border-[#1865F2] ring-2 ring-blue-100"
                    : "border-slate-300 hover:border-slate-400"
                )}
                title="Toggle Map View"
              >
                <Image
                  src="/icon/map_view_icon.png"
                  alt="Map View"
                  width={26}
                  height={26}
                  className="h-[25px] w-[25px] object-contain transition-transform hover:scale-105"
                  unoptimized
                />
              </button>
            </div>
          </div>

          {/* Active Filter Badges / Pills */}
          {activePills.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#F4F8FE] border border-blue-100/80">
              <span className="text-xs font-semibold text-slate-600">
                Active Filters:
              </span>
              {activePills.map((pill) => (
                <span
                  key={pill.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-medium text-[#1865F2] shadow-2xs"
                >
                  <span>{pill.label}</span>
                  <button
                    type="button"
                    onClick={() => clearFilter(pill.key)}
                    className="hover:bg-blue-100 rounded-full p-0.5 text-slate-400 hover:text-[#1865F2] transition-colors cursor-pointer"
                    title="Remove filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 hover:underline cursor-pointer ml-auto transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear all</span>
              </button>
            </div>
          )}

          {/* Loading Skeleton State */}
          {isApiLoading && !savedOnly ? (
            <div className={cn("pt-2", view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6")}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <PropertyCardSkeleton key={i} layout={view} />
              ))}
            </div>
          ) : totalItems === 0 ? (
            /* Empty State: When no properties match search filters */
            <div className="my-12 flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-[#1865F2] mb-4">
                <SearchX className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                No Properties Found
              </h3>
              <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
                We couldn&apos;t find any properties matching your current filter
                criteria. Try resetting your filters or adjusting your budget and
                location.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-2 rounded-xl bg-[#1865F2] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Main Content Area */
            <>
              {view === "grid" ? (
                /* ------------------ PURE GRID VIEW ------------------ */
                <div className="flex flex-col lg:flex-row gap-7 pt-2 items-start">
                  <div className={cn(showMap ? "flex-1 min-w-0" : "w-full")}>
                    <div
                      className={cn(
                        "grid gap-6",
                        showMap
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      )}
                    >
                      {visible.map((property, idx) => (
                        <PropertyCard
                          key={`${property.id || property.title}-${idx}`}
                          {...property}
                          index={idx}
                          layout="vertical"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Map in Grid View if toggled */}
                  {showMap && (
                    <div className="w-full lg:w-[360px] shrink-0 sticky top-24 self-start">
                      <div className="rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                          <span className="text-xs font-bold text-gray-800">
                            Map View
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="text-xs text-[#1865F2] font-semibold hover:underline"
                          >
                            Hide Map
                          </button>
                        </div>
                        <ViewMap height="620px" properties={sortedProperties} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ------------------ FULL FIGMA LIST VIEW ------------------ */
                <div className="flex flex-col lg:flex-row gap-7 pt-2 items-start">
                  {/* Left Column: Full Property Sections Flow */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-6">
                      {/* Top 2 Properties (Matches User Figma Screenshot 1:1) */}
                      <div className="flex flex-col gap-5">
                        {visible.slice(0, 2).map((property, idx) => (
                          <PropertyCard
                            key={`${property.id || property.title}-${idx}`}
                            {...property}
                            index={idx}
                            layout="horizontal"
                          />
                        ))}
                      </div>

                      {/* Top Agents Section */}
                      <ListingsTopAgents />

                      {/* Property 3 */}
                      {visible.length > 2 && (
                        <div className="flex flex-col gap-5">
                          <PropertyCard
                            key={`${visible[2].id || visible[2].title}-2`}
                            {...visible[2]}
                            index={2}
                            layout="horizontal"
                          />
                        </div>
                      )}

                      {/* Ready To Move Section */}
                      <ListingsReadyToMove />

                      {/* Properties 4 & 5 */}
                      {visible.length > 3 && (
                        <div className="flex flex-col gap-5">
                          {visible.slice(3, 5).map((property, idx) => (
                            <PropertyCard
                              key={`${property.id || property.title}-${idx + 3}`}
                              {...property}
                              index={idx + 3}
                              layout="horizontal"
                            />
                          ))}
                        </div>
                      )}

                      {/* Handpicked For You Section */}
                      <ListingsHandpicked />

                      {/* Properties 6, 7 & 8 */}
                      {visible.length > 5 && (
                        <div className="flex flex-col gap-5">
                          {visible.slice(5, 8).map((property, idx) => (
                            <PropertyCard
                              key={`${property.id || property.title}-${idx + 5}`}
                              {...property}
                              index={idx + 5}
                              layout="horizontal"
                            />
                          ))}
                        </div>
                      )}

                      {/* Price Dropped Section */}
                      <ListingsPriceDropped />

                      {/* Properties 9 & 10 */}
                      {visible.length > 8 && (
                        <div className="flex flex-col gap-5">
                          {visible.slice(8, 10).map((property, idx) => (
                            <PropertyCard
                              key={`${property.id || property.title}-${idx + 8}`}
                              {...property}
                              index={idx + 8}
                              layout="horizontal"
                            />
                          ))}
                        </div>
                      )}

                      {/* Property Experts Section */}
                      <ListingsPropertyExperts />

                      {/* Properties 11+ */}
                      {visible.length > 10 && (
                        <div className="flex flex-col gap-5">
                          {visible.slice(10).map((property, idx) => (
                            <PropertyCard
                              key={`${property.id || property.title}-${idx + 10}`}
                              {...property}
                              index={idx + 10}
                              layout="horizontal"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Sticky Sidebar Widgets or Map */}
                  <div className="w-full lg:w-[320px] xl:w-[335px] shrink-0 lg:sticky lg:top-24 self-start">
                    {showMap ? (
                      <div className="rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                          <span className="text-xs font-bold text-gray-800">
                            Map View
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="text-xs text-[#1865F2] font-semibold hover:underline"
                          >
                            Hide Map
                          </button>
                        </div>
                        <ViewMap height="580px" properties={sortedProperties} />
                      </div>
                    ) : (
                      <ListingsSidebarWidgets />
                    )}
                  </div>
                </div>
              )}

              {/* Full-Width Bottom Section: Pagination & Why Choose Roofin Banner */}
              <div className="w-full mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  perPage={PER_PAGE}
                  onChange={handlePageChange}
                  text="Properties"
                />

                {/* Why choose Roofin Banner */}
                {view === "list" && <WhyChooseRoofinBanner />}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
