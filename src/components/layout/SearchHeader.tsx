'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { HeaderSelect } from './HeaderSelect'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import { Bell, Heart, Logs, User, Search, SlidersHorizontal, X, CircleX, TextAlignEnd } from 'lucide-react'
import { LocationButton } from './LocationButton'
import { SEARCH_HEADER } from '@/data/headerData'

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

const formatBudget = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`
    return `₹${val}`
}

export const SearchHeader = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [budgetOpen, setBudgetOpen] = useState(false)
    const [logsOpen, setLogsOpen] = useState(false)
    const filterRef = useRef<HTMLDivElement>(null)
    const filterPanelRef = useRef<HTMLDivElement>(null)
    const logsRef = useRef<HTMLDivElement>(null)

    const [filters, setFilters] = useState<FilterState>({
        locations: [],
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
            {items.map(item => (
                <button
                    key={item}
                    onClick={() => toggleFilter(key, item)}
                    className={`px-3 py-[2px] rounded-full text-sm font-normal transition-all cursor-pointer ${selected.includes(item)
                        ? 'text-primary border border-primary text-white bg-primary'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                        }`}
                >
                    {item}
                </button>
            ))}
        </div>
    )

    return (
        <header className="fixed top-2 left-0 right-0 z-50 px-10">
            <div className="bg-white py-2.5 px-5 rounded-full shadow-2xl justify-between flex gap-4 items-center">
                <div className="flex items-center gap-4">
                    {/* <Image
                        src="/layout/logo.png"
                        alt="AmbrHomes"
                        width={80}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        height={50}
                    /> */}
                    Hello
                    <div className="pl-1 border-l-2 h-9 border-primary" />
                </div>

                <div className="flex gap-6 text-sm items-center flex-1">
                    {/* Search Bar */}
                    <div ref={filterRef} className="relative w-full">
                        <div className="rounded-full border border-gray-300 flex items-center hover:border-gray-400 transition-colors">
                            <HeaderSelect />
                            <div className="pl-4 border-l border-gray-300 h-6 my-auto" />
                            <div className="flex-1 px-1 relative">
                                {/* <label className=' text-[10px] text-gray-400 font-light capitalize'></label> */}
                                <input
                                    type="text"
                                    placeholder={SEARCH_PLACEHOLDER}
                                    onChange={(e) => console.log(e.target.value)}
                                    className="w-full outline-none text-sm capitalize text-gray-700 placeholder-gray-600 bg-transparent"
                                />

                            </div>
                            <LocationButton />
                            <div className=" border-l border-gray-300 h-6 my-auto" />
                            <button
                                onClick={() => setBudgetOpen(prev => !prev)}
                                className={` items-start  px-4  flex flex-col transition-colors cursor-pointer rounded-full text-gray-600 hover:text-gray-800`}
                            >
                                <p className=' text-[10px] text-gray-400 font-light capitalize'>Filter</p>
                                <span className='text-gray-700 text-[12px]'>Your Dream</span>

                            </button>
                            <button className=" bg-primary  text-white flex rounded-full px-6 py-2.5   items-center gap-2 hover:shadow-sm transition-shadow cursor-pointer ">
                                <span className='text-sm font-normal tracking-wide'>Search</span>
                                {/* <Search className="h-4 w-4" /> */}
                                <Image src='/icon/search_icon.png' width={14} height={14} alt='serach icon' />

                            </button>
                        </div>

                        {/* Filter Dropdown Panel */}
                        {budgetOpen && (
                        <div
                            ref={filterPanelRef}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                        >
                            <button className='absolute top-4 right-4 cursor-pointer'  onClick={() => setBudgetOpen(prev => !prev)} >
                                <CircleX className='text-gray-500 w-5 h-5 hover:text-gray-700'/>
                            </button>
                            <div className="p-6 grid grid-cols-2 gap-6">



                                <div className="grid gap-4">
                                    {/* Location */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Location in</h4>
                                        {renderChips(LOCATIONS, filters.locations, 'locations')}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">No. of BHK</h4>
                                        {renderChips(BHK, filters.bhk, 'bhk')}
                                    </div>

                                    {/* Construction Status */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Construction Status</h4>
                                        {renderChips(CONSTRUCTION_STATUS, filters.constructionStatus, 'constructionStatus')}
                                    </div>

                                    {/* Posted By */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Posted By</h4>
                                        {renderChips(POSTED_BY, filters.postedBy, 'postedBy')}
                                    </div>


                                </div>

                                <div className="grid gap-4">
                                    {/* Property Type */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Property Type</h4>
                                        {renderChips(PROPERTY_TYPES, filters.propertyTypes, 'propertyTypes')}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Amenities</h4>
                                        {renderChips(AMENITIES, filters.amenities, 'amenities')}
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-gray-800">Budget</h4>
                                            
                                        </div>
                                        <div className="relative px-1">
                                            <div className="relative h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="absolute h-2 bg-primary rounded-full"
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
                                                className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
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
                                                className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                                            />
                                        </div>
                                        <div className=" p-1 mt-6 text-xs bg-primary/10 text-primary  px-3 border border-primary inline-block rounded-4xl">
                                            <span className=" font-light">
                                                {formatBudget(filters.budgetMin)} - {formatBudget(filters.budgetMax)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-end gap-6 px-6 py-4  ">
                                        <button
                                            onClick={clearAll}
                                            className="text-sm px-4 py-2 text-gray-800  font-light cursor-pointer flex items-center gap-1 border border-gray-600 rounded-md"
                                        >
                                          
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setBudgetOpen(false)}
                                            className="bg-primary flex items-center gap-2  text-white px-4 py-2 rounded-md text-sm font-light hover:shadow-lg transition-shadow cursor-pointer"
                                        >
                                            Search
                                             <Image src='/icon/search_icon.png' width={12} height={12} alt='serach icon' />
                                        </button>
                                    </div>
                                </div>



                            </div>



                        </div>
                        )}

                    </div>

                    <div ref={logsRef} className="relative">
                        <button
                            onClick={() => setLogsOpen(prev => !prev)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                            <TextAlignEnd className="h-5 w-5 text-primary" />
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

                    <div className="flex gap-3 items-center border-l-2 border-primary pl-4">
                        <Link href="/login" className="text-primary text-sm">
                            <Heart className="h-6 w-6 text-primary" />
                        </Link>
                        <Link href="/login" className="text-primary text-sm relative">
                            <Bell className="h-6 w-6 text-primary" />
                            <span className="right-1 absolute top-[-2] bg-red-400 text-white text-xs rounded-full w-2 h-2"></span>
                        </Link>
                        <button onClick={() => setSidebarOpen(true)} className="text-primary bg-blue-100 p-[6px] rounded-3xl text-sm cursor-pointer">
                            <User className="h-5 w-5 text-primary" />
                        </button>
                        <Link href="/login" className="text-white text-sm flex items-center justify-center gap-1 bg-gradient-to-r from-primary to-secondary w-[190px] px-3 py-1.5 rounded-full">
                            <Image width={14} height={14} src="/icon/ai_icon.png" alt="Post Property" />  <span>Post Property</span> <span className="ml-1 bg-white text-primary py-1 rounded-4xl px-2 font-medium text-xs">Free</span>
                        </Link>
                    </div>
                </div>
            </div>
            <HeaderSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </header>
    )
}


