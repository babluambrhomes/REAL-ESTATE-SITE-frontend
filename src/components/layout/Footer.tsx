"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const quickLinks = [
  { label: "Buy a Property", href: "/properties" },
  { label: "Rent a Property", href: "/properties" },
  { label: "New Projects", href: "/projects" },
  { label: "PG / Coliving", href: "/properties" },
  { label: "Commercial", href: "/properties" },
  { label: "Plot / Land", href: "/properties" },
];

const resources = [
  { label: "Property Valuation", href: "/resources" },
  { label: "Home Loan Guide", href: "/resources" },
  { label: "RERA Updates", href: "/resources" },
  { label: "Buying Tips", href: "/blog" },
  { label: "Selling Tips", href: "/blog" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

const socialIcons = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6h1.3V4.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3h2.5v7h2.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7-8.1L2 3h6.3l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.5L16.8 19.2Z" />
      </svg>
    ),
  },
];

export const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center  text-gray-300"
      style={{ backgroundImage: "url('/footer_bg.png')" }}
    >
      <div className="absolute inset-0 " />
      <div className="relative w-full px-6 py-12 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 ">
            <Image
              src="/logo.png"
              alt="AmbrHomes"
              width={100}
              height={40}
              className="rounded-md bg-white/90 object-contain p-1"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Find your dream home with AmbrHomes. Trusted property listings,
              verified agents and transparent deals across NCR and beyond.
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </h4>
              <form
                className="mt-3 flex max-w-sm items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>


          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-secondary" />
                Sector 62, Noida, Uttar Pradesh
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 transition-colors hover:text-secondary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ambrhomes.com"
                  className="flex items-center gap-2 transition-colors hover:text-secondary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  info@ambrhomes.com
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-2.5">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-secondary hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gray-800">
        <div className="mx-auto flex w-full  flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-gray-500 sm:flex-row sm:px-10">
          <p>© 2026 AmbrHomes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-secondary">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
