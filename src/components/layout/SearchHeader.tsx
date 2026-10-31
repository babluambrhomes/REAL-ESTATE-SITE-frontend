'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HeaderSelect } from './HeaderSelect'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import { Mic } from 'lucide-react'
import { LocationButton } from './LocationButton'
import { SEARCH_HEADER } from '@/data/headerData'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/lib/wishlist'
import { useAppSelector } from '@/store/hooks'
import { propertyApi } from '@/lib/features/property/propertyApi'

const {
    locations: LOCATIONS,
    bhkOptions: BHK,
    constructionStatus: CONSTRUCTION_STATUS,
    postedBy: POSTED_BY,
    propertyTypes: PROPERTY_TYPES,
    amenities: AMENITIES,
    menuItems: MENU_ITEMS,
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
}

export const SearchHeader = ({ hasAnnouncement = false, className }: SearchHeaderProps) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const selectedCity = useAppSelector((state) => state.location.selectedCity);
    const { count: wishlistCount } = useWishlist();

    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(false);
    const [logsOpen, setLogsOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const filterPanelRef = useRef<HTMLDivElement>(null);
    const logsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [liveLocations, setLiveLocations] = useState<string[]>(LOCATIONS);
    const [liveTypes, setLiveTypes] = useState<string[]>(PROPERTY_TYPES);

    useEffect(() => {
        propertyApi.getSuggestions({ city: selectedCity?.value })
            .then((res) => {
                if (res?.data?.cities && res.data.cities.length > 0) {
                    const dynamicCities = res.data.cities.map((c) => c.city).filter(Boolean);
                    setLiveLocations((prev) => Array.from(new Set([...prev, ...dynamicCities])));
                }
                if (res?.data?.propertyTypes && res.data.propertyTypes.length > 0) {
                    const dynamicTypes = res.data.propertyTypes.map((t) => t.type).filter(Boolean);
                    setLiveTypes((prev) => Array.from(new Set([...prev, ...dynamicTypes])));
                }
            })
            .catch(() => {});
    }, [selectedCity]);

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


    useEffect(() => {
        if (!budgetOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (
                filterRef.current && !filterRef.current.contains(e.target as Node) &&
                filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node)
            ) {
                setBudgetOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [budgetOpen])

    useEffect(() => {
        if (!logsOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (logsRef.current && !logsRef.current.contains(e.target as Node)) {
                setLogsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [logsOpen])

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
            <header className={cn(
                "fixed left-0 right-0 z-50 px-3 sm:px-8 pointer-events-none transition-all duration-300 font-poppins",
                hasAnnouncement ? "top-[44px] sm:top-[48px]" : "top-3 sm:top-4",
                className
            )}>
                <div className="mx-auto flex h-[58px] sm:h-[62px] w-full max-w-[1380px] items-center justify-between rounded-full bg-white px-3 sm:px-5 lg:px-7 shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-slate-100/90 pointer-events-auto gap-1.5 sm:gap-3 lg:gap-4">
                
                {/* 1. Left Brand Logo */}
                <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
                    <Link href="/" className="shrink-0 flex items-center">
                        <Image
                            src="/layout/logo.png"
                            alt="Roofin"
                            width={96}
                            height={28}
                            className="h-5 sm:h-7 w-auto object-contain"
                            style={{ width: "auto", height: "auto" }}
                            priority
                        />
                    </Link>
                    <Image
                        src="/banner/Line 82.svg"
                        alt="Divider"
                        width={1}
                        height={37}
                        className="hidden sm:block h-[37px] w-[1px] shrink-0 select-none self-center"
                        unoptimized
                    />
                </div>

                {/* 2. Middle Search Bar */}
                <div className="flex gap-1.5 sm:gap-2.5 lg:gap-3 text-sm items-center flex-1 min-w-0">
                    <div ref={filterRef} className="relative flex-1 min-w-0">
                        <div className="rounded-full border border-gray-300/80 bg-white shadow-2xs flex items-center hover:border-gray-400 transition-colors h-[40px] sm:h-[45px] pl-1.5 sm:pl-2 pr-0 py-0 overflow-hidden">
                            {/* City Selector */}
                            <div className="shrink-0">
                                <HeaderSelect />
                            </div>

                            <div className="h-5 w-[1px] bg-gray-200 my-auto ml-1 mr-1.5 sm:mr-2 shrink-0" />

                            {/* Dream Home Search Input */}
                            <div
                                className="flex-1 px-1.5 sm:px-2.5 relative flex flex-col justify-center cursor-pointer min-w-0"
                                onClick={() => setBudgetOpen(true)}
                            >
                                <span className="hidden sm:block text-[10px] sm:text-[11px] text-gray-500 font-normal leading-tight mb-0.5">Find Your Dream Home</span>
                                <input
                                    type="text"
                                    placeholder={SEARCH_PLACEHOLDER}
                                    value={searchQuery}
                                    onFocus={() => setBudgetOpen(true)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setBudgetOpen(true);
                                    }}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSearchSubmit();
                                        }
                                    }}
                                    className="w-full outline-none text-[12px] sm:text-[13px] text-gray-900 placeholder:text-gray-400 font-semibold bg-transparent leading-tight truncate"
                                />
                            </div>

                            {/* Budget Search Filter (Desktop) */}
                            <div className="hidden lg:flex items-center shrink-0">
                                <div className="h-5 w-[1px] bg-gray-200 my-auto mx-2 shrink-0" />
                                <button
                                    type="button"
                                    onClick={() => setBudgetOpen(prev => !prev)}
                                    className="items-start px-2.5 flex flex-col transition-colors cursor-pointer text-left shrink-0"
                                >
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-normal leading-tight mb-0.5">Budget</span>
                                    <span className="text-gray-900 text-[12px] sm:text-[13px] font-semibold leading-tight whitespace-nowrap">Search Filter</span>
                                </button>
                            </div>

                            {/* Search Button + Voice Search */}
                            <div className="self-stretch flex items-center bg-[#1865F2] hover:bg-[#1250C4] text-white shadow-xs transition-all shrink-0 rounded-l-full pl-3 sm:pl-4 lg:pl-5 pr-2 sm:pr-2.5 lg:pr-3 cursor-pointer ml-auto">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (searchQuery.trim() || budgetOpen) {
                                            handleSearchSubmit();
                                        } else {
                                            setBudgetOpen(true);
                                        }
                                    }}
                                    className="flex items-center gap-1.5 sm:gap-2 text-[12.5px] sm:text-[13.5px] font-medium tracking-wide cursor-pointer py-1"
                                >
                                    <span className="hidden md:inline">Search ...</span>
                                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                        <circle cx="8.5" cy="8.5" r="5.75" stroke="white" strokeWidth="1.8" />
                                        <path d="M12.8 12.8L17.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M12.5 3C12.5 4.5 14 5.5 15.5 5.5C14 5.5 12.5 6.5 12.5 8C12.5 6.5 11 5.5 9.5 5.5C11 5.5 12.5 4.5 12.5 3Z" fill="#00E5FF" />
                                    </svg>
                                </button>
                                <div className="hidden sm:block h-4 w-[1px] bg-white/35 shrink-0 mx-1.5 sm:mx-2" />
                                <button
                                    type="button"
                                    title="Voice Search"
                                    className="hidden sm:flex h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] items-center justify-center text-white shrink-0 shadow-xs transition-colors cursor-pointer"
                                >
                                    <Mic className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white stroke-[2]" />
                                </button>
                            </div>
                        </div>

                        {/* Filter Dropdown Panel matching Figma */}
                        {budgetOpen && (
                            <div
                                ref={filterPanelRef}
                                className="absolute top-[calc(100%+10px)] left-0 w-[720px] max-w-[calc(100vw-32px)] sm:max-w-[95vw] bg-white rounded-[20px] sm:rounded-[26px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-slate-100 p-4 sm:p-6 z-50 overflow-y-auto max-h-[80vh]"
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

                                            {/* Budget */}
                                            <div className="pt-1">
                                                <h4 className="text-[16px] font-medium text-[#0B132B] mb-3">Budget</h4>
                                                <div className="relative px-1 pt-1 pb-2">
                                                    <div className="relative h-1.5 bg-gray-200 rounded-full">
                                                        <div
                                                            className="absolute h-1.5 bg-[#1865F2] rounded-full"
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

                    <div ref={logsRef} className="relative hidden md:flex items-center shrink-0">
                        <button
                            onClick={() => setLogsOpen(prev => !prev)}
                            className="p-1.5 text-[#1865F2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex flex-col justify-center gap-1"
                            title="Menu"
                            aria-label="Menu"
                        >
                            {/* 3 parallel equal lines matching Figma */}
                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5H17" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M1 6.5H17" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M1 11.5H17" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </button>
                        {logsOpen && (
                            <div className="absolute top-[calc(100%+12px)] -right-3 w-40 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-100 z-50 overflow-hidden divide-y divide-slate-100">
                                {MENU_ITEMS.map((item, idx) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setLogsOpen(false)}
                                        className={cn(
                                            "block py-2.5 px-3 text-xs sm:text-[13px] text-center transition-colors font-medium",
                                            idx === 0
                                                ? "bg-[#1865F2] text-white hover:bg-blue-700"
                                                : "text-slate-700 hover:bg-slate-50 hover:text-[#1865F2] font-normal"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thin vertical divider matching SimpleHeader */}
                    <Image
                        src="/banner/Line 82.svg"
                        alt="Divider"
                        width={1}
                        height={37}
                        className="hidden sm:block h-[37px] w-[1px] shrink-0 select-none self-center"
                        unoptimized
                    />

                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                        {/* Wishlist Heart */}
                        <Link
                            href="/properties?saved=true"
                            aria-label="Wishlist"
                            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0"
                        >
                            <Image
                                src="/layout/nav/nav_heart.svg"
                                alt="Wishlist"
                                width={34}
                                height={30}
                                className="w-[20px] sm:w-[22px] h-auto object-contain hover:scale-105 transition-transform"
                                unoptimized
                            />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/login" aria-label="Notifications" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors shrink-0">
                            <Image
                                src="/layout/nav/nav_bell.svg"
                                alt="Notifications"
                                width={28}
                                height={37}
                                className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                                unoptimized
                            />
                        </Link>
                        <button onClick={() => setSidebarOpen(true)} aria-label="User Profile" className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#edf5ff] transition-colors cursor-pointer shrink-0">
                            {isMounted && isAuthenticated && user ? (
                                user?.person?.avatarUrl ? (
                                    <Image
                                        src={user.person.avatarUrl}
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-[#1865F2] uppercase">
                                        {(user?.person?.firstName || user?.email || user?.phone || "U").charAt(0)}
                                    </span>
                                )
                            ) : (
                                <Image
                                    src="/layout/nav/nav_user.svg"
                                    alt="User Profile"
                                    width={23}
                                    height={24}
                                    className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                                    style={{ width: "auto", height: "auto" }}
                                    unoptimized
                                />
                            )}
                            {isMounted && isAuthenticated && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                            )}
                        </button>
                    </div>

                    {/* Post Property Free Button with Circular Running Gradient Border (#22BC90 & #2563EB) */}
                    <Link
                        href="/post-property"
                        className="group relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#2563EB] transition-all duration-200 hover:scale-[1.02] shrink-0 translate-x-1 sm:translate-x-2"
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
                            <span className="relative z-10 flex h-[36px] sm:h-[38px] items-center gap-2 sm:gap-2.5 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#08389D] pl-3 sm:pl-3.5 pr-1 text-white">
                                {/* Green Sparkle Icon */}
                                <svg
                                    className="h-[17px] w-[17px] shrink-0"
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
                                <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
                                    Post Property
                                </span>

                                {/* White Free Badge */}
                                <span className="flex items-center justify-center h-[26px] sm:h-[28px] px-3 sm:px-3.5 rounded-full bg-white text-[12px] sm:text-[12.5px] font-medium text-[#1865F2] shadow-2xs leading-none shrink-0">
                                    Free
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
        </header>

        {/* Global Navigation Sidebar Drawer */}
        <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
)
}


