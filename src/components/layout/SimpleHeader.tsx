'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { HeaderSelect } from './HeaderSelect'
import { HeaderSidebar } from './HeaderSidebar'
import Link from 'next/link'
import { Bell, ChevronDown, Heart, User } from 'lucide-react'
import { SIMPLE_HEADER } from '@/data/headerData'

const { exploreItems: EXPLORE_ITEMS } = SIMPLE_HEADER

export const SimpleHeader = () => {

    const [exploreOpen, setExploreOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const exploreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!exploreOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
                setExploreOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [exploreOpen])

    return (
        <header className="fixed top-2 left-0 right-0 z-50 px-10  ">
            <div className="bg-white py-3 px-5 rounded-full shadow-2xl justify-between flex gap-4 items-center ">
                <div className="flex items-center gap-4">
                    {/* <Image
                        src="/layout/logo.png"
                        alt="AmbrHomes"
                        width={80}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        height={50}
                    /> */}
                    Hello
                    <div className='h-9 border-l-2 border-primary'></div>
                    <div className='border border-gray-300 rounded-lg hover:border-gray-100'>
                        <HeaderSelect />
                    </div>
                </div>
                <div className="flex gap-6 text-sm items-center">
                    <div ref={exploreRef} className="relative">
                        <div
                            className="flex items-center select-none gap-1 text-sm text-primary cursor-pointer"
                            onClick={() => setExploreOpen((prev) => !prev)}>
                            <h3>Explore</h3>
                            <ChevronDown
                                className={`h-4 w-4 text-primary transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
                        </div>
                        {exploreOpen && (
                            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden">
                                {EXPLORE_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setExploreOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-light"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href="/contact" className="text-primary text-sm">
                        Contact Us
                    </Link>
                    <button className="bg-white border-[1px] border-primary text-primary px-4 py-1.5 rounded-lg  transition-colors duration-200">
                        <Link href="/login" className="text-primary text-sm">Agent Pro/Builder Pro</Link>
                    </button>
                    <div className="flex gap-3 items-center border-l-2 border-primary pl-4">
                        <Link href="/login" className="text-primary text-sm">
                            <Heart className="h-6 w-6 text-primary" />
                        </Link>
                        <Link href="/login" className="text-primary text-sm relative">
                            <Bell className="h-6 w-6 text-primary" />
                            <span className="right-1 absolute top-[-2] bg-red-400 text-white text-xs rounded-full w-2 h-2"></span>
                        </Link>
                        <button onClick={() => setSidebarOpen(true)} className="text-primary bg-blue-100 p-[6px] rounded-3xl text-sm">
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
