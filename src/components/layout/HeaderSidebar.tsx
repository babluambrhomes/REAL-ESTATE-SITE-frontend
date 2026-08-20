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
    Building2,
    StarCheck,
    TextSearch,
    Eye,
} from 'lucide-react'
import type { HeaderSidebarProps } from '@/types'

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
                className={`fixed right-2 top-20 bottom-2 rounded-xl z-50 max-w-[400px] w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
                // className={`fixed right-2 top-20 bottom-2 rounded-xl z-50 max-w-[400px] w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden flex flex-col translate-x-0`}

            >
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-full bg-black absolute top-4 right-4 hover:bg-black/70 transition-colors z-10">
                    <X className="h-3 w-3 text-white" />
                </button>
                <div className='overflow-x-auto relative px-3 py-6'>

                    <div className='relative pb-3 border-b border-gray-400'>

                        <div className='flex justify-start items-center gap-5'>
                            <div className='w-20 h-20 overflow-hidden rounded-md'>
                                <Image src='/common/guest_profile.png' alt='' className='w-full h-auto' width={100} height={100} />
                            </div>
                            <div>
                                <h3 className='text-lg text-primary uppercase font-semibold'>Hello</h3>
                                <p className='text-[12px] capitalize font-normal'>
                                    Easy Seller Contact <br />
                                    Connect directly with verified sellers
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="block text-center  mt-2 bg-black text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black/90 transition-colors">
                            Login/ Register
                        </Link>
                    </div>
                    <div className=" pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">My Activity</h4>
                        <div className="grid  grid-cols-4 gap-1">
                            {[
                                { icon: Building2, label: "Contracted Property", count: "00" },
                                { icon: Eye, label: "Recently Viewed", count: "00" },
                                { icon: StarCheck, label: "Saved Properties", count: "00" },
                                { icon: TextSearch, label: "Recently Searched", count: "00" },
                            ].map(({ icon: Icon, label, count }) => (
                                <div key={label} className="group flex items-center flex-col gap-3 justify-between rounded-t-full border border-gray-200 bg-primary/5 p-2 transition-all duration-200 hover:border-primary hover:bg-primary/10">
                                    <Icon className="h-7 w-7 text-black transition-colors group-hover:text-primary" />
                                    <div className="flex items-center flex-col">
                                        <p className="text-[12px] pb-2 text-center font-medium text-gray-900 leading-tight transition-colors group-hover:text-primary">{label}</p>
                                        <span className="text-xs bg-secondary inline-block py-1 px-2 rounded-full font-normal text-white transition-colors group-hover:bg-primary">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pt-5' />
                        <div className='bg-secondary/30 p-2 overflow-hidden flex justify-between  items-center rounded-2xl border border-secondary '>
                            <Image src='/common/query_illustrations.png' alt='' className='' width={140} height={100} />
                            <div className='flex flex-col gap-2 p-3'>
                                <h1 className='text-base'>
                                    Looking to sell / rent your property?
                                </h1>
                                <button className='text-sm py-1 px-2 bg-white shadow-md'>
                                    Post property for free
                                </button>
                            </div>

                        </div>

                        <div className="mt-4">
                            <ul className="flex flex-col">
                                {[
                                    { label: "My Reviews", href: "/reviews" },
                                    { label: "Insights", href: "/insights" },
                                    { label: "Pay for Results", href: "/login" },
                                    { label: "Saved Properties", href: "/login" },
                                ].map(({ label, href }) => (
                                    <li key={label} className='relative'>
                                        <span className='w-2 h-2 rotate-45 bg-secondary top-4 left-1 absolute' />
                                        <Link
                                            href={href}
                                            onClick={onClose}
                                            className="flex items-center pl-6 justify-between py-2.5 px-2 text-sm font-medium text-gray-700 rounded-lg transition-colors hover:text-primary"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-8 px-3 py-3 border-2 border-gray-300 flex justify-start items-center gap-4 rounded-md'>
                            <Image src='/icon/help_center.png' alt='' className='w-5 h-auto' width={20} height={20} />
                            <p className='text-base font-medium'>
                                Visit Help Center
                            </p>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-900 mb-3 mt-4">Follow on</h4>
                        <div className="flex items-center gap-2">
                            {[
                                { name: "Facebook", href: "#", svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                                { name: "Instagram", href: "#", svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
                                { name: "X", href: "#", svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                                { name: "Pinterest", href: "#", svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg> },
                            ].map(({ name, href, svg }) => (
                                <a
                                    key={name}
                                    href={href}
                                    aria-label={name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full  bg-primary/5 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    {svg}
                                </a>
                            ))}
                        </div>

                       <div className='flex justify-end'>
                         <div className='pt-10 max-w-[350px] gap-2 flex flex-col'>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search a Property Code"
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-1.5 pl-4 pr-12 text-[12px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md  text-gray-400 transition-transform hover:scale-105"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                            <h3 className='text-sm text-gray-700 '>Contact Number: <a href="" target='blank'>+91 743755845</a></h3>
                        </div>
                       </div>



                    </div>

                </div>
            </aside>
        </>
    )
}
