'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Search, FileEdit, Eye, BookmarkCheck, SlidersHorizontal, Headphones, LogOut } from 'lucide-react';
import type { HeaderSidebarProps } from '@/types';
import { HEADER_SIDEBAR } from '@/data/headerData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slice/authSlice';
import { authApi } from '@/lib/features/auth/authApi';
import { useWishlist } from '@/lib/wishlist';
import toast from 'react-hot-toast';

export const HeaderSidebar = ({ open, onClose }: HeaderSidebarProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const { count: wishlistCount } = useWishlist();
  const { images, contactNumber } = HEADER_SIDEBAR;
  const [isMounted, setIsMounted] = useState(false);
  const [propertyCode, setPropertyCode] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(' ') ||
    (user?.phone ? user.phone : user?.email ? user.email.split('@')[0] : 'Verified Member');

  const userContact = user?.phone || user?.email || 'Signed in account';

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {}
    dispatch(logout());
    toast.success('Logged out successfully');
    onClose();
  };

  const handleSearchPropertyCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!propertyCode.trim()) {
      toast.error('Please enter a property code');
      return;
    }
    toast.success(`Searching property: ${propertyCode.trim()}`);
    onClose();
  };

  const savedCountStr =
    wishlistCount > 0 ? (wishlistCount < 10 ? `0${wishlistCount}` : `${wishlistCount}`) : '00';

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto cursor-pointer' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Slide-over Profile Drawer matching Figma */}
      <aside
        className={`fixed right-2 sm:right-4 top-16 sm:top-20 bottom-3 sm:bottom-4 rounded-3xl z-50 max-w-[390px] w-full bg-white shadow-2xl border border-slate-200/90 transition-transform duration-300 ease-in-out overflow-hidden flex flex-col font-poppins ${
          open ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 relative px-5 py-5 text-left space-y-4">
          
          {/* 1. Header: Avatar + HELLO + Close Button */}
          <div className="pb-3 border-b border-slate-200/90 relative">
            {isMounted && isAuthenticated && user ? (
              /* Authenticated User View */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#00D1FF] p-0.5 bg-white">
                      {user?.person?.avatarUrl ? (
                        <Image
                          src={user.person.avatarUrl}
                          alt={displayName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Image
                          src="/common/guest_profile.png"
                          alt="User"
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-black text-[#1865F2] uppercase truncate">
                          {displayName}
                        </h3>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium truncate">{userContact}</p>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-7 h-7 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                    aria-label="Close profile drawer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/u/me"
                    onClick={onClose}
                    className="flex-1 text-center bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-xs"
                  >
                    My Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Guest / Default View matching Figma 1:1 */
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-[2.5px] border-[#00D1FF] p-0.5 bg-white">
                      <Image
                        src="/common/guest_profile.png"
                        alt="Guest User"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-base font-black text-[#1865F2] tracking-wide uppercase">
                        HELLO
                      </h3>
                      <p className="text-xs font-bold text-slate-700 leading-tight">
                        Easy Seller Contact
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight">
                        Connect directly with verified sellers.
                      </p>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-7 h-7 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs mt-0.5"
                    aria-label="Close profile drawer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href="/login"
                  onClick={onClose}
                  className="w-full block text-center py-2.5 rounded-full bg-black hover:bg-slate-900 text-white text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  Login/ Register
                </Link>
              </div>
            )}
          </div>

          {/* 2. My Activity Section */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-black text-[#0B132B] mb-2.5">
              My Activity
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {/* Capsule 1: Contracted Property */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-2 flex flex-col items-center justify-between text-center min-h-[96px] shadow-2xs hover:border-[#1865F2]/40 transition-colors">
                <div className="w-7 h-7 flex items-center justify-center text-slate-600">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M10 13l2 2 4-4" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 leading-tight">
                  Contracted Property
                </span>
                <span className="bg-[#00D26A] text-white px-2 py-0.5 rounded-full text-[9px] font-black mt-1 shadow-2xs">
                  00
                </span>
              </div>

              {/* Capsule 2: Recently Viewed (Highlighted with Blue Border) */}
              <div className="rounded-2xl border-2 border-[#1865F2] bg-[#F0F6FE] p-2 flex flex-col items-center justify-between text-center min-h-[96px] shadow-2xs">
                <div className="w-7 h-7 flex items-center justify-center text-[#1865F2]">
                  <svg className="w-5 h-5 text-[#1865F2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-black text-[#1865F2] leading-tight">
                  Recently Viewed
                </span>
                <span className="bg-[#1865F2] text-white px-2 py-0.5 rounded-full text-[9px] font-black mt-1 shadow-2xs">
                  00
                </span>
              </div>

              {/* Capsule 3: Saved Properties */}
              <Link
                href="/properties?saved=true"
                onClick={onClose}
                className="rounded-2xl border border-slate-200/90 bg-white p-2 flex flex-col items-center justify-between text-center min-h-[96px] shadow-2xs hover:border-[#1865F2]/40 transition-colors"
              >
                <div className="w-7 h-7 flex items-center justify-center text-slate-600">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <path d="M9 13l2 2 4-4" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 leading-tight">
                  Saved Properties
                </span>
                <span className="bg-[#00D26A] text-white px-2 py-0.5 rounded-full text-[9px] font-black mt-1 shadow-2xs">
                  {savedCountStr}
                </span>
              </Link>

              {/* Capsule 4: Recently Searched */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-2 flex flex-col items-center justify-between text-center min-h-[96px] shadow-2xs hover:border-[#1865F2]/40 transition-colors">
                <div className="w-7 h-7 flex items-center justify-center text-slate-600">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 leading-tight">
                  Recently Searched
                </span>
                <span className="bg-[#00D26A] text-white px-2 py-0.5 rounded-full text-[9px] font-black mt-1 shadow-2xs">
                  00
                </span>
              </div>
            </div>
          </div>

          {/* 3. First Link Set (Diamond bullets) */}
          <div className="pt-1 space-y-1">
            <Link
              href="/pay-for-results"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Pay for Results</span>
            </Link>

            <Link
              href="/u/me?tab=reviews"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>My Reviews</span>
            </Link>

            <Link
              href="/pricing"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Insights</span>
              <span className="bg-[#E6F0FD] text-[#1865F2] text-[9.5px] font-extrabold px-2 py-0.2 rounded-full border border-blue-200 ml-1">
                New
              </span>
            </Link>
          </div>

          {/* 4. Banner: "Looking to sell / rent your property?" */}
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#E8FAF5] p-3 flex items-center justify-between gap-3 shadow-2xs">
            <div className="w-[120px] h-[75px] relative shrink-0">
              <Image
                src="/common/query_illustrations.png"
                alt="Looking to sell or rent"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-2 text-left min-w-0 flex-1">
              <p className="text-xs font-black text-[#0B132B] leading-tight">
                Looking to sell / rent your property?
              </p>
              <Link
                href="/post-property"
                onClick={onClose}
                className="inline-block px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-[10.5px] font-bold text-slate-800 rounded-lg shadow-2xs transition-colors"
              >
                Post property for free
              </Link>
            </div>
          </div>

          {/* 5. Second Link Set (Diamond bullets) */}
          <div className="space-y-1">
            <Link
              href="/u/me"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/u/me?tab=enquiries"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Message</span>
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>About Us</span>
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Contact Us</span>
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Articles</span>
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-2.5 py-1.5 px-1 text-xs font-bold text-slate-700 hover:text-[#1865F2] transition-colors"
            >
              <span className="w-2 h-2 rotate-45 bg-[#00D26A] shrink-0" />
              <span>Report a Fraud</span>
            </Link>
          </div>

          {/* 6. Visit Help Center Box */}
          <Link
            href="/contact"
            onClick={onClose}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-3 transition-colors shadow-2xs"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#00C49F] flex items-center justify-center shrink-0">
              <Headphones className="w-3.5 h-3.5 text-[#00C49F]" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              Visit Help Center
            </span>
          </Link>

          {/* 7. Download Roofin app Card */}
          <div className="rounded-2xl bg-[#EBF2FE] p-3.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-2">
              <h5 className="text-xs font-black text-slate-900 leading-tight">
                Download Roofin app
              </h5>
              <div className="space-y-1.5">
                {/* App Store Badge */}
                <a
                  href="#"
                  className="flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-md hover:bg-slate-800 transition-colors w-[130px] shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.87-1.01 2.98 1.07.08 2.18-.51 2.84-1.33z" />
                  </svg>
                  <div className="leading-none text-left">
                    <span className="text-[6.5px] uppercase tracking-wider block text-slate-300">Download on the</span>
                    <span className="text-[10px] font-black">App Store</span>
                  </div>
                </a>

                {/* Google Play Badge */}
                <a
                  href="#"
                  className="flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-md hover:bg-slate-800 transition-colors w-[130px] shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.318 1.988 1.988 0 0 1-.5-.868c-.015-.052-.033-.102-.045-.155V3.155c.012-.053.03-.103.045-.155.08-.344.25-.65.5-.868.18-.154.387-.26.61-.318zM15.207 13.414l2.586 2.586-11.83 6.83 9.244-9.416zm0-2.828L5.963 1.17l11.83 6.83-2.586 2.586zm1.414 1.414l3.586 2.071c.78.45.78 1.187 0 1.637l-3.586 2.071-2.121-2.121 2.121-2.071v.413z" />
                  </svg>
                  <div className="leading-none text-left">
                    <span className="text-[6.5px] uppercase tracking-wider block text-slate-300">GET IT ON</span>
                    <span className="text-[10px] font-black">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Crisp QR Code */}
            <div className="w-[70px] h-[70px] rounded-xl bg-white p-1.5 border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0">
              <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="2" y="2" width="28" height="28" rx="3" fill="#0B132B" />
                <rect x="7" y="7" width="18" height="18" fill="white" />
                <rect x="11" y="11" width="10" height="10" fill="#0B132B" />

                <rect x="70" y="2" width="28" height="28" rx="3" fill="#0B132B" />
                <rect x="75" y="7" width="18" height="18" fill="white" />
                <rect x="79" y="11" width="10" height="10" fill="#0B132B" />

                <rect x="2" y="70" width="28" height="28" rx="3" fill="#0B132B" />
                <rect x="7" y="75" width="18" height="18" fill="white" />
                <rect x="11" y="79" width="10" height="10" fill="#0B132B" />

                <rect x="38" y="10" width="8" height="8" fill="#0B132B" />
                <rect x="52" y="10" width="8" height="8" fill="#0B132B" />
                <rect x="38" y="25" width="8" height="8" fill="#0B132B" />
                <rect x="52" y="25" width="8" height="8" fill="#0B132B" />
                <rect x="40" y="40" width="20" height="20" rx="3" fill="#1865F2" />
                <rect x="10" y="45" width="10" height="10" fill="#0B132B" />
                <rect x="75" y="45" width="10" height="10" fill="#0B132B" />
                <rect x="38" y="72" width="10" height="10" fill="#0B132B" />
                <rect x="54" y="76" width="8" height="8" fill="#0B132B" />
                <rect x="74" y="74" width="16" height="16" fill="#0B132B" />
              </svg>
            </div>
          </div>

          {/* 8. Social Links ("Fallow on") */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-bold text-slate-800">Fallow on</p>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-8 h-8 rounded-full bg-[#EBF2FE] text-[#1865F2] flex items-center justify-center hover:scale-105 transition-transform shadow-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-[#1865F2]" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 9. Property Code Search & Contact */}
          <div className="pt-2 space-y-2 pb-4">
            <form onSubmit={handleSearchPropertyCode} className="relative w-full">
              <input
                type="text"
                placeholder="Search a Property Code"
                value={propertyCode}
                onChange={(e) => setPropertyCode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#F1F5F9] py-2 pl-4 pr-10 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2]"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#1865F2] cursor-pointer"
                title="Search Code"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] font-bold text-slate-700">
              Contact Number : <span className="font-medium text-slate-900">{contactNumber}</span>
            </p>
          </div>

        </div>
      </aside>
    </>
  );
};
