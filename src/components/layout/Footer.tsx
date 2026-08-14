"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";

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

const FacebookIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6h1.3V4.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3h2.5v7h2.5Z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7-8.1L2 3h6.3l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.5L16.8 19.2Z" />
  </svg>
);

const socialIcons = [        
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FacebookIcon className="h-5 w-5" />, 
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramIcon className="h-4 w-4" />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <XIcon className="h-4 w-4" />,
  },
];

export const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center  text-gray-300"
      style={{ backgroundImage: "url('/layout/footer_bg.png')" }}
    >
      <div className="absolute inset-0 " />
      <div className="relative w-full px-6 py-12 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 ">
            <Image
              src="/layout/white_logo.png"
              alt="AmbrHomes"
              width={140}
              height={50}
              className="object-contain"
            />
            <p className="mt-2 text-white max-w-sm text-sm leading-relaxed">
              Explore the latest properties and market insights
            </p>

             <form
                className="mt-8 max-w-sm items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1 overflow-hidden rounded-full border ">
               
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg  bg-white py-2.5 pl-4 px-3 text-sm text-gray-500 placeholder:text-gray-500 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex bg-gold text-sm top-0 right-0 h-10 w-[38%] absolute z-30  items-center justify-center gap-1 text-white transition-transform duration-200"
                  >
                    <Send className="h-4 w-4" /> Subscribe
                  </button>
                  
                </div>
                <div className="mt-10 flex items-center gap-2">
                  <input
                    id="subscribe-terms"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0  cursor-pointer rounded-2xl accent-gold"
                  />
                  <label
                    htmlFor="subscribe-terms"
                    className="text-xs text-white"
                  >
                    I accept{" "}
                    <Link
                      href="/terms"
                      className="text-gold underline-offset-2 hover:underline"
                    >
                      terms and conditions
                    </Link>{" "}
                   <span className="text-gold">&</span>{" "}
                    <Link
                      href="/privacy"
                      className="text-gold underline-offset-2 hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
              </form>
          </div>

          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 text-base space-y-2 text-white">
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
            <h4 className="text-lg font-semibold uppercase tracking-wide text-white">
              Resources
            </h4>
            <ul className="mt-4 text-base space-y-2 text-white">
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
            <h4 className="text-lg font-semibold uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="mt-4 text-base space-y-2 text-white">
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
            <h4 className="text-lg font-semibold uppercase tracking-wide text-white">
              Contact Us
            </h4>
            <ul className="mt-4 text-base space-y-2 text-white">
             
              <li>
                <h3 className="text-base font-medium text-white">Toll free</h3>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 transition-colors hover:text-secondary"
                >
                  <Phone className="h-4 w-4 shrink-0 " />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <h3 className="text-base font-medium text-white">Email</h3>
                <a
                  href="mailto:info@ambrhomes.com"
                  className="flex items-center gap-2 transition-colors hover:text-secondary"
                >
                  <Mail className="h-4 w-4 shrink-0 " />
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative  text-white ">
        <div className="mx-auto flex w-full font-normal items-center justify-between gap-2 px-6 py-4 text-xs ">
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
