'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import {
    ChevronDown,
    Heart,
    LocateFixed,
    MapPin,
    Menu,
    Mic,
    Search,
    User,
} from 'lucide-react'
import { SEARCH_HEADER, LocationList } from '@/data/headerData'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/lib/wishlist'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCity, setCoordinates } from '@/store/slice/locationSlice'

const {
    locations: LOCATIONS,
    bhkOptions: BHK,
    constructionStatus: CONSTRUCTION_STATUS,
    postedBy: POSTED_BY,
    propertyTypes: PROPERTY_TYPES,
    amenities: AMENITIES,
    budgetMin: BUDGET_MIN,
    budgetMax: BUDGET_MAX,
    budgetStep: BUDGET_STEP,
    searchPlaceholder: SEARCH_PLACEHOLDER,
} = SEARCH_HEADER

interface FilterState {
    locations: string[]
    bhk: string[]
    constructionStatus: string[]
    postedBy: string[]
    propertyTypes: string[]
    amenities: string[]
    budgetMin: number
    budgetMax: number
}

const formatBudget = (val: number, isMax = false) => {
    if (val >= 10000000) {
        const cr = (val / 10000000).toFixed(1)
        return isMax && val >= BUDGET_MAX ? `${cr} CR+` : `${cr} CR`
    }
    if (val === 0) return '0.0 CR'
    if (val >= 100000) return `${(val / 100000).toFixed(1)} L`
    if (val >= 1000) return `${(val / 1000).toFixed(0)} K`
    return `${val}`
}

interface SearchHeaderProps {
    hasAnnouncement?: boolean;
    className?: string;
    variant?: "default" | "compare";
    isScrolled?: boolean;
}

export const SearchHeader = ({
    hasAnnouncement = false,
    className,
    variant = "default",
    isScrolled = true,
}: SearchHeaderProps) => {
    const isCompare = variant === "compare";
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const selectedCity = useAppSelector((state) => state.location.selectedCity);
    const { count: wishlistCount } = useWishlist();

    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState<"Buy" | "Rent" | "Commercial">("Buy");
    const [purposeOpen, setPurposeOpen] = useState(false);
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const filterPanelRef = useRef<HTMLDivElement>(null);
    const purposeRef = useRef<HTMLDivElement>(null);
    const cityDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [liveLocations] = useState<string[]>(LOCATIONS);
    const [liveTypes] = useState<string[]>(PROPERTY_TYPES);

    const [filters, setFilters] = useState<FilterState>({
        locations: [],
        bhk: [],
        constructionStatus: [],
        postedBy: [],
        propertyTypes: [],
        amenities: [],
        budgetMin: BUDGET_MIN,
        budgetMax: BUDGET_MAX,
    });

    const toggleFilter = useCallback((key: keyof FilterState, value: string) => {
        setFilters(prev => {
            const arr = prev[key] as string[];
            const next = arr.includes(value)
                ? arr.filter(v => v !== value)
                : [...arr, value];
            return { ...prev, [key]: next };
        });
    }, []);

    const clearAll = useCallback(() => {
        setFilters({
            locations: [],
            bhk: [],
            constructionStatus: [],
            postedBy: [],
            propertyTypes: [],
            amenities: [],
            budgetMin: BUDGET_MIN,
            budgetMax: BUDGET_MAX,
        });
    }, []);

    const handleSearchSubmit = useCallback(() => {
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set("q", searchQuery.trim());
        }

        if (selectedCity?.value) {
            params.set("city", selectedCity.value);
        }

        if (filters.locations.length > 0) {
            params.set("locality", filters.locations[0]);
        }

        if (filters.bhk.length > 0) {
            const bhkNums = Array.from(
                new Set(
                    filters.bhk
                        .map((b) => {
                            const match = b.match(/\d+/);
                            return match ? match[0] : "";
                        })
                        .filter(Boolean)
                )
            ).join(",");
            if (bhkNums) params.set("bhk", bhkNums);
        }

        if (filters.propertyTypes.length > 0) {
            const rawType = filters.propertyTypes[0].toLowerCase();
            let cleanType = rawType;
            if (rawType.includes("villa") || rawType.includes("house")) cleanType = "house";
            else if (rawType.includes("apartment") || rawType.includes("flat")) cleanType = "apartment";
            else if (rawType.includes("land") || rawType.includes("plot")) cleanType = "plot";
            else if (rawType.includes("builder")) cleanType = "builder-floor";
            else if (rawType.includes("studio") || rawType.includes("rk")) cleanType = "studio";
            params.set("type", cleanType);
        }

        if (filters.constructionStatus.length > 0) {
            params.set("status", filters.constructionStatus.join(","));
        }

        if (filters.postedBy.length > 0) {
            params.set("postedBy", filters.postedBy.join(","));
        }

        if (filters.amenities.length > 0) {
            params.set("amenities", filters.amenities.join(","));
        }

        if (filters.budgetMin > BUDGET_MIN) {
            params.set("minPrice", String(filters.budgetMin));
        }
        if (filters.budgetMax < BUDGET_MAX) {
            params.set("maxPrice", String(filters.budgetMax));
        }

        setBudgetOpen(false);
        router.push(`/properties?${params.toString()}`);
    }, [searchQuery, selectedCity, filters, router]);

    // 2-Way Sync: Sync filters state from current URL query parameters on load
    useEffect(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        const qParam = searchParams.get("q") || "";
        const bhkParam = searchParams.get("bhk") || "";
        const localityParam = searchParams.get("locality") || "";
        const statusParam = searchParams.get("status") || "";
        const postedByParam = searchParams.get("postedBy") || "";
        const amenitiesParam = searchParams.get("amenities") || "";
        const minPriceParam = searchParams.get("minPrice");
        const maxPriceParam = searchParams.get("maxPrice");

        if (qParam) setSearchQuery(qParam);

        if (bhkParam || localityParam || statusParam || postedByParam || amenitiesParam || minPriceParam || maxPriceParam) {
            setFilters((prev) => ({
                ...prev,
                locations: localityParam ? [localityParam] : prev.locations,
                bhk: bhkParam ? BHK.filter((b) => bhkParam.split(",").some((num) => b.includes(num))) : prev.bhk,
                constructionStatus: statusParam ? statusParam.split(",") : prev.constructionStatus,
                postedBy: postedByParam ? postedByParam.split(",") : prev.postedBy,
                amenities: amenitiesParam ? amenitiesParam.split(",") : prev.amenities,
                budgetMin: minPriceParam ? Number(minPriceParam) : prev.budgetMin,
                budgetMax: maxPriceParam ? Number(maxPriceParam) : prev.budgetMax,
            }));
        }
    }, [router]);

    // Click outside handler for dropdowns & panels
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                filterRef.current && !filterRef.current.contains(target) &&
                filterPanelRef.current && !filterPanelRef.current.contains(target)
            ) {
                setBudgetOpen(false);
            }
            if (purposeRef.current && !purposeRef.current.contains(target)) {
                setPurposeOpen(false);
            }
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
                setCityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDetectLocation = useCallback(() => {
        if (typeof window !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    dispatch(setCoordinates({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
                },
                () => {}
            );
        }
    }, [dispatch]);

    const renderChips = (items: string[], selected: string[], key: keyof FilterState) => (
        <div className="flex flex-wrap gap-2">
            {items.map(item => {
                const isSelected = selected.includes(item)
                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => toggleFilter(key, item)}
                        className={cn(
                            "px-3.5 py-1.5 rounded-full text-[12.5px] font-normal transition-all cursor-pointer",
                            isSelected
                                ? "bg-[#1865F2] text-white shadow-xs"
                                : "bg-[#F1F5F9] text-[#334155] hover:bg-slate-200"
                        )}
                    >
                        {item}
                    </button>
                )
            })}
        </div>
    )

    return (
        <>
            <header
                className={cn(
                    "fixed left-0 right-0 z-50 w-full bg-gradient-to-r from-[#1865F2] via-[#1A68F5] to-[#1250C4] font-poppins shadow-[0_4px_20px_rgba(24,101,242,0.16)] transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    hasAnnouncement ? "top-[40px] sm:top-[44px]" : "top-0",
                    className
                )}
            >
                <div className="mx-auto w-full max-w-[1380px] h-[60px] sm:h-[64px] px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
                    {/* 1. Left Brand Logo & Location */}
                    <div
                        className={cn(
                            "flex items-center gap-3 sm:gap-4 shrink-0 transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isScrolled
                                ? "translate-x-0 opacity-100 delay-75"
                                : "-translate-x-14 opacity-0 pointer-events-none delay-0"
                        )}
                    >
                        <Link href="/" className="shrink-0 flex items-center">
                            <Image
                                src="/layout/white_logo.png"
                                alt="Roofin"
                                width={115}
                                height={32}
                                className="h-6 sm:h-7.5 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Location Selector ("Buy in Noida ⌵") */}
                        {!isCompare && (
                            <div className="relative hidden md:flex items-center shrink-0" ref={cityDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setCityDropdownOpen((prev) => !prev)}
                                    className="flex items-center gap-1.5 text-white/95 hover:text-white text-[13px] sm:text-[13.5px] font-medium transition-colors cursor-pointer select-none py-1.5 px-2.5 rounded-lg hover:bg-white/12"
                                >
                                    <MapPin className="h-3.5 w-3.5 text-white/90 shrink-0" />
                                    <span>Buy in {selectedCity?.label || "Greater Noida"}</span>
                                    <ChevronDown
                                        className={cn(
                                            "h-3.5 w-3.5 text-white/90 transition-transform duration-200",
                                            cityDropdownOpen ? "rotate-180" : ""
                                        )}
                                    />
                                </button>
                                {cityDropdownOpen && (
                                    <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-slate-100 z-50 py-1.5 divide-y divide-slate-100">
                                        {LocationList.map((loc) => (
                                            <button
                                                key={loc.value}
                                                type="button"
                                                onClick={() => {
                                                    dispatch(setCity(loc));
                                                    setCityDropdownOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-xs sm:text-[13px] font-medium transition-colors hover:bg-blue-50 flex items-center justify-between cursor-pointer",
                                                    selectedCity?.value === loc.value
                                                        ? "text-[#1865F2] font-semibold bg-blue-50/60"
                                                        : "text-slate-700"
                                                )}
                                            >
                                                <span>{loc.label}</span>
                                                {selectedCity?.value === loc.value && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#1865F2]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 2. Middle Search Bar (Matching Project Aesthetic: Buy ⌵ | Input | GPS, Mic, Search) */}
                    {!isCompare && (
                        <div
                            ref={filterRef}
                            className={cn(
                                "flex-1 max-w-[580px] lg:max-w-[640px] min-w-0 relative transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center",
                                isScrolled
                                    ? "scale-100 opacity-100"
                                    : "scale-90 opacity-0 pointer-events-none"
                            )}
                        >
                            <div className="bg-white rounded-[16px] sm:rounded-[20px] h-[40px] sm:h-[42px] flex items-center px-2.5 sm:px-3 text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/80 focus-within:ring-2 focus-within:ring-white/40 transition-all">
                                {/* Property Purpose Dropdown: Buy ⌵ */}
                                <div className="relative shrink-0" ref={purposeRef}>
                                    <button
                                        type="button"
                                        onClick={() => setPurposeOpen((prev) => !prev)}
                                        className="flex items-center gap-1 text-[12.5px] sm:text-[13.5px] font-medium text-slate-800 hover:text-[#1865F2] transition-colors cursor-pointer select-none py-1 pr-1"
                                    >
                                        <span>{selectedPurpose}</span>
                                        <ChevronDown
                                            className={cn(
                                                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                                                purposeOpen ? "rotate-180" : ""
                                            )}
                                        />
                                    </button>
                                    {purposeOpen && (
                                        <div className="absolute top-[calc(100%+10px)] -left-2 w-36 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-slate-100 z-50 py-1 overflow-hidden">
                                            {(["Buy", "Rent", "Commercial"] as const).map((item) => (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedPurpose(item);
                                                        setPurposeOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full text-left px-3.5 py-2 text-xs sm:text-[13px] transition-colors hover:bg-slate-50 font-medium cursor-pointer",
                                                        selectedPurpose === item
                                                            ? "text-[#1865F2] bg-blue-50/60 font-semibold"
                                                            : "text-slate-700"
                                                    )}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Vertical Separator */}
                                <div className="h-4.5 w-[1px] bg-slate-200 mx-2 sm:mx-2.5 shrink-0" />

                                {/* Search Input */}
                                <input
                                    type="text"
                                    placeholder={SEARCH_PLACEHOLDER || "Search For Builders, Agents, Projects, Localities..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setBudgetOpen(true)}
                                    onClick={() => setBudgetOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSearchSubmit();
                                        }
                                    }}
                                    className="flex-1 bg-transparent text-[12.5px] sm:text-[13px] text-slate-800 placeholder:text-slate-400 outline-none truncate font-normal min-w-0"
                                />

                                {/* Right Action Icons in Input: GPS, Mic, Search */}
                                <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1">
                                    <button
                                        type="button"
                                        title="Current Location"
                                        onClick={handleDetectLocation}
                                        className="p-1 sm:p-1.5 text-[#1865F2] hover:bg-blue-50 rounded-full transition-colors cursor-pointer shrink-0"
                                    >
                                        <LocateFixed className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Voice Search"
                                        className="p-1 sm:p-1.5 text-[#1865F2] hover:bg-blue-50 rounded-full transition-colors cursor-pointer shrink-0"
                                    >
                                        <Mic className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Search"
                                        onClick={handleSearchSubmit}
                                        className="p-1 sm:p-1.5 text-slate-600 hover:text-[#1865F2] hover:bg-blue-50 rounded-full transition-colors cursor-pointer shrink-0"
                                    >
                                        <Search className="h-4 w-4 stroke-[2.3]" />
                                    </button>
                                </div>
                            </div>

                            {/* Filter Dropdown Panel matching Figma */}
                            {budgetOpen && (
                                <div
                                    ref={filterPanelRef}
                                    className="absolute top-[calc(100%+10px)] left-0 w-[720px] max-w-[calc(100vw-32px)] sm:max-w-[95vw] bg-white rounded-[20px] sm:rounded-[26px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.22)] border border-slate-100 p-4 sm:p-6 z-50 overflow-y-auto max-h-[80vh]"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Left Column */}
                                        <div className="flex-1 space-y-5">
                                            {/* Locations In Delhi NCR */}
                                            <div>
                                                <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Locations In Delhi NCR</h4>
                                                {renderChips(liveLocations, filters.locations, 'locations')}
                                            </div>

                                            {/* No. Of Bedrooms */}
                                            <div>
                                                <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">No. Of Bedrooms</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {renderChips(BHK, filters.bhk, 'bhk')}
                                                    <button
                                                        type="button"
                                                        className="text-[#1865F2] text-xs font-medium hover:underline self-center ml-1 cursor-pointer"
                                                    >
                                                        + 3 More
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Construction Status */}
                                            <div>
                                                <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Construction Status</h4>
                                                {renderChips(CONSTRUCTION_STATUS, filters.constructionStatus, 'constructionStatus')}
                                            </div>

                                            {/* Posted By */}
                                            <div>
                                                <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Posted By</h4>
                                                {renderChips(POSTED_BY, filters.postedBy, 'postedBy')}
                                            </div>
                                        </div>

                                        {/* Vertical Center Divider */}
                                        <div className="w-[1px] bg-slate-200 self-stretch my-1" />

                                        {/* Right Column */}
                                        <div className="flex-1 flex flex-col justify-between space-y-5">
                                            <div className="space-y-5">
                                                {/* Property Types */}
                                                <div>
                                                    <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Property Types</h4>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {renderChips(liveTypes, filters.propertyTypes, 'propertyTypes')}
                                                        <button
                                                            type="button"
                                                            className="text-[#1865F2] text-xs font-medium hover:underline self-center ml-1 cursor-pointer"
                                                        >
                                                            More Localities
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Amenities */}
                                                <div>
                                                    <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Amenities</h4>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {renderChips(AMENITIES, filters.amenities, 'amenities')}
                                                        <button
                                                            type="button"
                                                            className="text-[#1865F2] text-xs font-medium hover:underline self-center ml-1 cursor-pointer"
                                                        >
                                                            + 5 More
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Budget Range Slider */}
                                                <div>
                                                    <h4 className="text-[16px] font-medium text-[#0B132B] mb-2.5">Budget</h4>
                                                    <div className="relative pt-2 pb-1">
                                                        <div className="relative h-1.5 w-full rounded-full bg-slate-200">
                                                            <div
                                                                className="absolute h-full rounded-full bg-[#1865F2]"
                                                                style={{
                                                                    left: `${((filters.budgetMin - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%`,
                                                                    right: `${100 - ((filters.budgetMax - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min={BUDGET_MIN}
                                                            max={BUDGET_MAX}
                                                            step={BUDGET_STEP}
                                                            value={filters.budgetMin}
                                                            onChange={e => {
                                                                const val = Number(e.target.value)
                                                                if (val < filters.budgetMax) setFilters(prev => ({ ...prev, budgetMin: val }))
                                                            }}
                                                            className="absolute top-1 left-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1865F2] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                                                        />
                                                        <input
                                                            type="range"
                                                            min={BUDGET_MIN}
                                                            max={BUDGET_MAX}
                                                            step={BUDGET_STEP}
                                                            value={filters.budgetMax}
                                                            onChange={e => {
                                                                const val = Number(e.target.value)
                                                                if (val > filters.budgetMin) setFilters(prev => ({ ...prev, budgetMax: val }))
                                                            }}
                                                            className="absolute top-1 left-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1865F2] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                                                        />
                                                    </div>
                                                    <div className="mt-2.5">
                                                        <div className="inline-block rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-3.5 py-1 text-xs font-medium text-[#1865F2]">
                                                            {formatBudget(filters.budgetMin)} - {formatBudget(filters.budgetMax, true)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Buttons */}
                                            <div className="flex items-center justify-end gap-3 pt-3">
                                                <button
                                                    type="button"
                                                    onClick={clearAll}
                                                    className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
                                                >
                                                    Clear All
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleSearchSubmit}
                                                    className="rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white px-7 py-2 text-xs font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. Right Action Elements (Post Property FREE, Wishlist, User Profile, Hamburger) */}
                    <div
                        className={cn(
                            "flex items-center gap-1.5 sm:gap-3 lg:gap-3.5 shrink-0 transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isScrolled
                                ? "translate-x-0 opacity-100 delay-75"
                                : "translate-x-14 opacity-0 pointer-events-none delay-0"
                        )}
                    >
                        {/* Post Property Free Button with Circular Running Gradient Border matching SimpleHeader */}
                        <Link
                            href="/post-property"
                            className="hidden sm:inline-flex group relative items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#2563EB] transition-all duration-200 hover:scale-[1.02] shrink-0"
                        >
                            {/* Animated Slow Circular Gradient Border (Pure Green & Blue Shades) */}
                            <span
                                className="circular-rotating-gradient-disc"
                                style={{
                                    background:
                                        "conic-gradient(from 0deg, #22BC90 0%, #10B981 22%, #2563EB 50%, #1D4ED8 72%, #22BC90 100%)",
                                }}
                            />

                            {/* Inner Pill Body */}
                            <span className="relative z-10 flex h-[34px] sm:h-[36px] items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#08389D] pl-2.5 sm:pl-3 pr-1 text-white shadow-xs">
                                {/* Green Sparkle Icon */}
                                <svg
                                    className="h-[15px] w-[15px] shrink-0"
                                    viewBox="0 0 27 29"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.06311 8.18182C4.0109 5.55932 2.7023 4.19871 0 4.12609C2.67734 4.02963 4.03019 2.69626 4.09715 0C4.15163 2.72916 5.53853 4.0285 8.18182 4.07729C5.29452 4.64696 4.61355 4.71618 4.06311 8.18182Z"
                                        fill="#22BC90"
                                    />
                                    <path
                                        d="M26.82 5.39448C26.6568 5.46253 26.5009 5.55842 26.3306 5.5945C25.5631 5.75535 24.7854 5.8698 24.0252 6.05745C23.0854 6.28944 22.4677 6.906 22.2348 7.85045C22.0512 8.59694 21.9506 9.36507 21.7834 10.1167C21.7424 10.3033 21.5854 10.4642 21.4807 10.6364C21.3812 10.458 21.2335 10.2899 21.1914 10.0992C21.0334 9.38054 20.9359 8.64849 20.7677 7.93191C20.5307 6.92353 19.8884 6.275 18.8871 6.03373C18.1586 5.85845 17.4137 5.75535 16.6812 5.59553C16.5047 5.55739 16.3488 5.42026 16.1836 5.32849C16.3344 5.22642 16.4729 5.06867 16.6381 5.03258C17.3204 4.88308 18.015 4.78925 18.6983 4.64078C19.8197 4.39642 20.5543 3.72726 20.7985 2.5797C20.9452 1.89405 21.0437 1.19808 21.1955 0.513463C21.2366 0.328905 21.3905 0.170124 21.492 0C21.5936 0.170124 21.7475 0.328907 21.7865 0.512434C21.9229 1.1486 22.006 1.7961 22.1343 2.43329C22.3805 3.652 23.1121 4.40673 24.3309 4.65418C25.0327 4.79647 25.7417 4.90679 26.4444 5.04495C26.5717 5.0697 26.6866 5.15734 26.8076 5.21611C26.8118 5.27488 26.8159 5.33468 26.82 5.39448ZM18.371 5.29859C20.148 5.62647 21.1771 6.64824 21.4161 8.3103C21.7742 7.64837 22.0143 6.86579 22.5252 6.35336C23.0382 5.83783 23.82 5.59244 24.4941 5.22333C22.8002 4.98309 21.8101 3.95719 21.492 2.19202C21.1545 3.96544 20.1665 5.01299 18.371 5.29859Z"
                                        fill="#22BC90"
                                    />
                                    <path
                                        d="M12.0737 28.6364C11.809 20.7254 7.72529 16.9153 0 16.6042C7.78894 16.3845 11.7588 12.5575 12.0369 4.63635C12.3886 12.4696 16.2312 16.3676 24 16.5941C16.4221 17.0167 12.2546 20.6375 12.0737 28.6364Z"
                                        fill="#22BC90"
                                    />
                                </svg>

                                {/* Text */}
                                <span className="text-[12px] sm:text-[12.5px] font-medium text-white tracking-normal whitespace-nowrap">
                                    Post Property
                                </span>

                                {/* White Free Badge */}
                                <span className="flex items-center justify-center h-[24px] sm:h-[26px] px-2.5 sm:px-3 rounded-full bg-white text-[11px] sm:text-[11.5px] font-medium text-[#1865F2] shadow-2xs leading-none shrink-0">
                                    Free
                                </span>
                            </span>
                        </Link>

                        {/* Wishlist Heart Icon */}
                        <Link
                            href="/properties?saved=true"
                            aria-label="Wishlist"
                            className="relative flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center text-white/95 hover:text-white hover:bg-white/12 rounded-full transition-colors shrink-0"
                        >
                            <Heart className="h-5 w-5 stroke-[2]" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[9.5px] font-medium text-white shadow-xs">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* User Profile Avatar with Online Dot + ChevronDown */}
                        <button
                            type="button"
                            aria-label="User Profile"
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-1 p-0.5 hover:bg-white/12 rounded-full transition-colors cursor-pointer shrink-0 select-none"
                        >
                            <div className="relative flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full bg-white text-[#1865F2] font-semibold text-xs shadow-xs">
                                {isMounted && isAuthenticated && user ? (
                                    user?.person?.avatarUrl ? (
                                        <Image
                                            src={user.person.avatarUrl}
                                            alt="Profile"
                                            width={34}
                                            height={34}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[13px] font-medium text-[#1865F2] uppercase select-none leading-none">
                                            {(user?.person?.firstName || user?.email || user?.phone || "U").charAt(0)}
                                        </span>
                                    )
                                ) : (
                                    <User className="h-4 w-4 text-[#1865F2]" />
                                )}
                                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
                            </div>
                            <ChevronDown className="h-3.5 w-3.5 text-white/90" />
                        </button>

                        {/* Hamburger Menu (3 white lines) */}
                        <button
                            type="button"
                            aria-label="Open Menu"
                            onClick={() => setSidebarOpen(true)}
                            className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center text-white hover:bg-white/12 rounded-full transition-colors cursor-pointer shrink-0"
                        >
                            <Menu className="h-5.5 w-5.5 stroke-[2.2]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Global Navigation Sidebar Drawer */}
            <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    )
}
