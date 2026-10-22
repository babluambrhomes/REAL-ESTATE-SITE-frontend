'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HeaderSelect } from './HeaderSelect'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import { Bell, Heart, Logs, User, Search, SlidersHorizontal, X, CircleX, TextAlignEnd, Mic, Sparkles } from 'lucide-react'
import { LocationButton } from './LocationButton'
import { SEARCH_HEADER } from '@/data/headerData'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/lib/wishlist'
import { useAppSelector } from '@/store/hooks'

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

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={cn(
                "fixed left-0 right-0 z-50 px-3 sm:px-10 transition-all duration-300 pointer-events-none",
                isScrolled
                    ? "top-0 pt-2 pb-1 bg-gradient-to-b from-white/95 via-white/80 to-transparent backdrop-blur-[3px]"
                    : hasAnnouncement ? "top-[44px] sm:top-[48px]" : "top-2 sm:top-3",
                className
            )}>
                <div className="w-full max-w-[1380px] mx-auto bg-white py-2 px-3 sm:px-5 rounded-full shadow-2xl justify-between flex gap-2 sm:gap-4 items-center pointer-events-auto">
                <div className="flex items-center gap-3 shrink-0">
                    <Link href="/" className="shrink-0 flex items-center min-w-[85px] sm:min-w-[95px]">
                        <Image
                            src="/layout/logo.png"
                            alt="Roofin"
                            width={95}
                            height={32}
                            className="object-contain h-7 w-auto"
                            priority
                        />
                    </Link>
                    <div className="h-6 w-[1px] bg-slate-200" />
                </div>

                <div className="flex gap-4 sm:gap-6 text-sm items-center flex-1 min-w-0">
                    {/* Search Bar */}
                    <div ref={filterRef} className="relative w-full">
                        <div className="rounded-full border border-gray-200 bg-[#FBFDFF] shadow-2xs flex items-center hover:border-gray-300 transition-colors py-1 pl-1 pr-1.5">
                            <HeaderSelect />
                            <div className="h-6 w-[1px] bg-gray-200 my-auto ml-1 mr-2 shrink-0" />
                            <div
                                className="flex-1 px-2 relative flex flex-col justify-center cursor-pointer min-w-0"
                                onClick={() => setBudgetOpen(true)}
                            >
                                <span className="text-[10px] text-gray-400 font-normal leading-none mb-0.5">Find Your Dream Home</span>
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
                                    className="w-full outline-none text-[12px] text-gray-800 placeholder:text-gray-400 font-medium bg-transparent leading-tight truncate"
                                />
                            </div>
                            <LocationButton />
                            <div className="h-6 w-[1px] bg-gray-200 my-auto mx-2 shrink-0" />
                            <button
                                type="button"
                                onClick={() => setBudgetOpen(prev => !prev)}
                                className="items-start px-2 flex flex-col transition-colors cursor-pointer text-left shrink-0"
                            >
                                <span className="text-[10px] text-gray-400 font-normal leading-none mb-0.5">Budget</span>
                                <span className="text-gray-800 text-[12px] font-medium leading-tight">Search Filter</span>
                            </button>
                            <div className="flex items-center rounded-full bg-[#1865F2] hover:bg-blue-700 text-white shadow-xs transition-all shrink-0 my-0.5 ml-1">
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
                                    className="flex items-center gap-2 pl-4 pr-2.5 py-1.5 text-[12.5px] font-normal tracking-wide cursor-pointer"
                                >
                                    <span>Search ...</span>
                                    <div className="relative">
                                        <Search className="h-3.5 w-3.5 text-white" />
                                        <span className="absolute -top-1 -right-1 text-[8px] text-[#00E5FF]">✨</span>
                                    </div>
                                </button>
                                <div className="h-4 w-[1px] bg-white/30" />
                                <button
                                    type="button"
                                    title="Voice Search"
                                    className="p-1.5 pr-2.5 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
                                >
                                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                        <Mic className="h-3 w-3 text-white" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Filter Dropdown Panel matching Figma */}
                        {budgetOpen && (
                            <div
                                ref={filterPanelRef}
                                className="absolute top-[calc(100%+10px)] left-0 w-[720px] max-w-[95vw] bg-white rounded-[26px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-slate-100 p-6 z-50 overflow-hidden"
                            >
                                <div className="flex gap-6">
                                    {/* Left Column */}
                                    <div className="flex-1 space-y-5">
                                        {/* Locations In Delhi NCR */}
                                        <div>
                                            <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">Locations In Delhi NCR</h4>
                                            {renderChips(LOCATIONS, filters.locations, 'locations')}
                                        </div>

                                        {/* No. Of Bedrooms */}
                                        <div>
                                            <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">No. Of Bedrooms</h4>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {renderChips(BHK, filters.bhk, 'bhk')}
                                                <button
                                                    type="button"
                                                    className="text-[#1865F2] text-xs font-semibold hover:underline self-center ml-1 cursor-pointer"
                                                >
                                                    + 3 More
                                                </button>
                                            </div>
                                        </div>

                                        {/* Construction Status */}
                                        <div>
                                            <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">Construction Status</h4>
                                            {renderChips(CONSTRUCTION_STATUS, filters.constructionStatus, 'constructionStatus')}
                                        </div>

                                        {/* Posted By */}
                                        <div>
                                            <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">Posted By</h4>
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
                                                <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">Property Types</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {renderChips(PROPERTY_TYPES, filters.propertyTypes, 'propertyTypes')}
                                                    <button
                                                        type="button"
                                                        className="text-[#1865F2] text-xs font-semibold hover:underline self-center ml-1 cursor-pointer"
                                                    >
                                                        More Localities
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div>
                                                <h4 className="text-[16px] font-semibold text-[#0B132B] mb-2.5">Amenities</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {renderChips(AMENITIES, filters.amenities, 'amenities')}
                                                    <button
                                                        type="button"
                                                        className="text-[#1865F2] text-xs font-semibold hover:underline self-center ml-1 cursor-pointer"
                                                    >
                                                        + 5 More
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Budget */}
                                            <div className="pt-1">
                                                <h4 className="text-[16px] font-semibold text-[#0B132B] mb-3">Budget</h4>
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
                                                    <div className="inline-block rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-3.5 py-1 text-xs font-semibold text-[#1865F2]">
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
                                                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
                                            >
                                                Clear All
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSearchSubmit}
                                                className="rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white px-7 py-2 text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <div ref={logsRef} className="relative shrink-0 flex items-center">
                        <button
                            onClick={() => setLogsOpen(prev => !prev)}
                            className="p-2 text-[#1865F2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex flex-col justify-center gap-1"
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

                    <div className="h-6 w-[1px] bg-slate-200 shrink-0" />

                    <div className="flex gap-1.5 sm:gap-2 items-center shrink-0">
                        <Link
                            href="/properties?saved=true"
                            aria-label="Wishlist"
                            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-blue-50/70 transition-colors shrink-0"
                        >
                            <Image
                                src="/layout/nav/nav_heart.png"
                                alt="Wishlist"
                                width={34}
                                height={30}
                                className="w-[20px] sm:w-[22px] h-auto object-contain hover:scale-105 transition-transform"
                                unoptimized
                            />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/login" aria-label="Notifications" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-blue-50/70 transition-colors shrink-0">
                            <Image
                                src="/layout/nav/nav_bell.png"
                                alt="Notifications"
                                width={28}
                                height={37}
                                className="w-[18px] sm:w-[20px] h-auto object-contain hover:scale-105 transition-transform"
                                unoptimized
                            />
                        </Link>
                        <button onClick={() => setSidebarOpen(true)} aria-label="User Profile" className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#edf5ff] hover:bg-[#e0edff] transition-colors cursor-pointer shrink-0 border border-blue-100">
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
                                    src="/layout/nav/nav_user.png"
                                    alt="User Profile"
                                    width={18}
                                    height={18}
                                    className="w-[16px] h-auto object-contain"
                                    style={{ width: "auto", height: "auto" }}
                                />
                            )}
                            {isMounted && isAuthenticated && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                            )}
                        </button>
                        <Link
                            href="/post-property"
                            className="group relative flex h-[38px] sm:h-[40px] items-center gap-2 rounded-full bg-gradient-to-r from-[#1865F2] via-[#104ECC] to-[#073299] border-[1.5px] border-[#00D084] pl-2.5 sm:pl-3 pr-1 sm:pr-1 text-white shadow-[0_2px_10px_rgba(0,208,132,0.2)] transition-all duration-200 hover:scale-[1.02] shrink-0"
                        >
                            <svg 
                                className="h-[18px] w-[18px] shrink-0" 
                                viewBox="0 0 26 26" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.5 1C4.5 2.8 3.2 4 1.5 4C3.2 4 4.5 5.2 4.5 7C4.5 5.2 5.8 4 7.5 4C5.8 4 4.5 2.8 4.5 1Z" fill="#00D084" />
                                <path d="M20 1C20 3.3 18 5 15.5 5C18 5 20 6.7 20 9C20 6.7 22 5 24.5 5C22 5 20 3.3 20 1Z" stroke="#00D084" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                                <path d="M11.5 6C11.5 12 7 16 1.5 16C7 16 11.5 20 11.5 26C11.5 20 16 16 21.5 16C16 16 11.5 12 11.5 6Z" fill="#00D084" />
                            </svg>
                            <span className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-normal whitespace-nowrap">
                                Post Property
                            </span>
                            <span className="rounded-full bg-white px-2.5 sm:px-3 py-1 text-[12px] sm:text-[12.5px] font-semibold text-[#1865F2] shadow-xs leading-none">
                                Free
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>

        {/* Global Navigation Sidebar Drawer */}
        <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
)
}


