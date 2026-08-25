'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Search } from 'lucide-react'
import type { HeaderSidebarProps } from '@/types'
import { HEADER_SIDEBAR } from '@/data/headerData'

export const HeaderSidebar = ({ open, onClose }: HeaderSidebarProps) => {
    const { images, texts, contactNumber } = HEADER_SIDEBAR
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
                                <Image src={images.guestProfile} alt='' className='w-full h-auto' width={100} height={100} />
                            </div>
                            <div>
                                <h3 className='text-lg text-primary uppercase font-semibold'>{texts.greeting}</h3>
                                <p className='text-[12px] capitalize font-normal'>
                                    {texts.subtitle.split('\n').map((line, idx, arr) => (
                                        <span key={idx}>
                                            {line}
                                            {idx < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="block text-center  mt-2 bg-black text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black/90 transition-colors">
                            {texts.loginButton}
                        </Link>
                    </div>
                    <div className=" pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">{texts.myActivityTitle}</h4>
                        <div className="grid  grid-cols-4 gap-1">
                            {HEADER_SIDEBAR.quickStats.map(({ icon: Icon, label, count }) => (
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
                            <Image src={images.queryIllustration} alt='' className='' width={140} height={100} />
                            <div className='flex flex-col gap-2 p-3'>
                                <h1 className='text-base'>
                                    {texts.sellTitle}
                                </h1>
                                <button className='text-sm py-1 px-2 bg-white shadow-md'>
                                    {texts.postPropertyButton}
                                </button>
                            </div>

                        </div>

                        <div className="mt-4">
                            <ul className="flex flex-col">
                                {HEADER_SIDEBAR.moreLinks.map(({ label, href }) => (
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
                            <Image src={images.helpCenter} alt='' className='w-5 h-auto' width={20} height={20} />
                            <p className='text-base font-medium'>
                                {texts.helpCenter}
                            </p>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-900 mb-3 mt-4">{texts.followOn}</h4>
                        <div className="flex items-center gap-2">
                            {HEADER_SIDEBAR.socialLinks.map(({ name, href, path }) => (
                                <a
                                    key={name}
                                    href={href}
                                    aria-label={name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full  bg-primary/5 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                                </a>
                            ))}
                        </div>

                       <div className='flex justify-end'>
                         <div className='pt-10 max-w-[350px] gap-2 flex flex-col'>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder={texts.searchPlaceholder}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-1.5 pl-4 pr-12 text-[12px] outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md  text-gray-400 transition-transform hover:scale-105"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                            <h3 className='text-sm text-gray-700 '>{texts.contactLabel} <a href="" target='blank'>{contactNumber}</a></h3>
                        </div>
                       </div>



                    </div>

                </div>
            </aside>
        </>
    )
}
