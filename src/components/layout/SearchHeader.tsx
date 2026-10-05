'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { HeaderSelect } from './HeaderSelect'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import { Bell, Heart, Logs, User, Search, SlidersHorizontal, X, CircleX, TextAlignEnd, Mic, Sparkles } from 'lucide-react'
import { LocationButton } from './LocationButton'
import { SEARCH_HEADER } from '@/data/headerData'
import { cn } from '@/lib/utils'

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

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [budgetOpen, setBudgetOpen] = useState(false)
    const [logsOpen, setLogsOpen] = useState(false)
    const filterRef = useRef<HTMLDivElement>(null)
    const filterPanelRef = useRef<HTMLDivElement>(null)
    const logsRef = useRef<HTMLDivElement>(null)

    const [filters, setFilters] = useState<FilterState>({
        locations: ['Sector 108 Noida'],
        bhk: [],
        constructionStatus: [],
        postedBy: [],
        propertyTypes: [],
        amenities: [],
        budgetMin: BUDGET_MIN,
        budgetMax: BUDGET_MAX,
    })

    const toggleFilter = useCallback((key: keyof FilterState, value: string) => {
        setFilters(prev => {
            const arr = prev[key] as string[]
            const next = arr.includes(value)
                ? arr.filter(v => v !== value)
                : [...arr, value]
            return { ...prev, [key]: next }
        })
    }, [])

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
        })
    }, [])


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
        <header className={cn(
            "fixed left-0 right-0 z-50 px-3 sm:px-10 transition-all duration-300 pointer-events-none",
            hasAnnouncement ? "top-[44px] sm:top-[48px]" : "top-2 sm:top-3",
            className
        )}>
            <div className="bg-white py-2.5 px-5 rounded-full shadow-2xl justify-between flex gap-4 items-center pointer-events-auto">
                <div className="flex items-center gap-3">
                    <Link href="/" className="shrink-0 flex items-center">
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

                <div className="flex gap-6 text-sm items-center flex-1">
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
                                    onFocus={() => setBudgetOpen(true)}
                                    onClick={() => setBudgetOpen(true)}
                                    onChange={(e) => console.log(e.target.value)}
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
                                    onClick={() => setBudgetOpen(prev => !prev)}
                                    onFocus={() => setBudgetOpen(true)}
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
                                                onClick={() => setBudgetOpen(false)}
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
                            {/* 3 lines: top full, middle shorter, bottom shortest */}
                            <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5H19" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M1 6.5H13.5" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M1 11.5H8" stroke="#1865F2" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </button>
                        {logsOpen && (
                            <div className="absolute top-full -right-6 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden">
                                {MENU_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setLogsOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-light"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-6 w-[1px] bg-slate-200 shrink-0" />

                    <div className="flex gap-3 items-center shrink-0">
                        <Link href="/login" className="text-[#1865F2] hover:opacity-80 transition-opacity">
                            <Heart className="h-5 w-5 stroke-[1.8]" />
                        </Link>
                        <Link href="/login" className="text-[#1865F2] relative hover:opacity-80 transition-opacity">
                            <Bell className="h-5 w-5 stroke-[1.8]" />
                            <span className="right-0 top-0 absolute bg-[#FF3B30] rounded-full w-2 h-2"></span>
                        </Link>
                        <button onClick={() => setSidebarOpen(true)} className="text-[#1865F2] bg-[#EBF3FE] p-1.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                            <User className="h-4 w-4 text-[#1865F2]" />
                        </button>
                        <Link href="/login" className="text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#1865F2] to-[#00A86B] pl-3.5 pr-1.5 py-1.5 rounded-full shadow-xs hover:opacity-95 transition-opacity">
                            <span>✨ Post Property</span>
                            <span className="bg-white text-[#1865F2] py-0.5 px-2 rounded-full font-bold text-[10.5px]">Free</span>
                        </Link>
                    </div>
                </div>
            </div>
            <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </header>
    )
}


