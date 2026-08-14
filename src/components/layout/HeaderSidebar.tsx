'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
    X,
    ChevronRight,
    FileSignature,
    History,
    Heart,
    Search,
    BadgeDollarSign,
    Star,
    BarChart3,
    LayoutDashboard,
    MessageCircle,
} from 'lucide-react'

interface HeaderSidebarProps {
    open: boolean
    onClose: () => void
}

const activityItems = [
    { label: 'Contracted Property', icon: FileSignature, href: '/login' },
    { label: 'Recently Viewed', icon: History, href: '/login' },
    { label: 'Saved Properties', icon: Heart, href: '/login' },
    { label: 'Recently Searched', icon: Search, href: '/login' },
    { label: 'Pay for Results', icon: BadgeDollarSign, href: '/login' },
    { label: 'My Reviews', icon: Star, href: '/login' },
    { label: 'Insights', icon: BarChart3, href: '/login' },
]

const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Message', icon: MessageCircle, href: '/messages' },
]

const bottomLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Articles', href: '/articles' },
    { label: 'Report a Fraud', href: '/login' },
    { label: 'Visit Help Center', href: '/login' },
]

export const HeaderSidebar = ({ open, onClose }: HeaderSidebarProps) => {
    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            />
            <aside
                className={`fixed right-2 top-20 bottom-2 rounded-xl z-50 max-w-[400px] w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full bg-black absolute top-4 right-4 hover:bg-black/70 transition-colors z-10">
                    <X className="h-4 w-4 text-white" />
                </button>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-primary mb-4">My Activity</h2>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
                            <h3 className="text-sm font-semibold text-primary">Easy Seller Contact</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Connect directly with verified sellers.
                            </p>
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="inline-block mt-3 bg-primary text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                                Login/ Register
                            </Link>
                        </div>

                        <ul className="space-y-1">
                            {activityItems.map(({ label, icon: Icon, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <Icon className="h-4 w-4 text-primary" />
                                        <span className="flex-1">{label}</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 mt-5 text-white">
                            <h3 className="text-sm font-semibold">Looking to sell / rent your property?</h3>
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="inline-flex items-center gap-2 mt-3 bg-white text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                                <Image width={14} height={14} src="/icon/ai_icon.png" alt="Post Property" />
                                Post property for free
                            </Link>
                        </div>

                        <ul className="space-y-1 mt-5 border-t border-gray-100 pt-5">
                            {menuItems.map(({ label, icon: Icon, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <Icon className="h-4 w-4 text-primary" />
                                        <span className="flex-1">{label}</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-100 py-4 px-6">
                        <ul className="space-y-3">
                            {bottomLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        onClick={onClose}
                                        className="text-sm text-gray-600 hover:text-primary transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}
