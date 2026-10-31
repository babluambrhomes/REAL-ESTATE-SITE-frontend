"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";

const quickLinks = [
  { label: "Buy Property", href: "/properties" },
  { label: "Rent Property", href: "/properties" },
  { label: "Sell Property", href: "/post-property" },
  { label: "New Projects", href: "/properties?tag=new-launch" },
  { label: "Commercial", href: "/properties?type=Commercial" },
  { label: "Plots & Land", href: "/properties?type=Plot" },
  { label: "Project", href: "/properties" },
  { label: "Agent", href: "/agents" },
];

const resources = [
  { label: "Investment Guide", href: "/properties" },
  { label: "EMI Calculator", href: "/properties" },
  { label: "Area Converter", href: "/properties" },
  { label: "Price Trends", href: "/properties" },
  { label: "News & Updates", href: "/properties" },
];

const company = [
  { label: "About Us", href: "/contact" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sitemap", href: "/properties" },
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

const PinterestIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.55-.11-1.39.02-1.99.12-.54.78-3.32.78-3.32s-.2-.4-.2-.99c0-.93.54-1.63 1.21-1.63.57 0 .85.43.85.95 0 .58-.37 1.44-.56 2.24-.16.68.34 1.23 1 1.23 1.2 0 2.13-1.27 2.13-3.1 0-1.62-1.16-2.76-2.83-2.76-1.93 0-3.06 1.45-3.06 2.94 0 .58.23 1.21.51 1.55.06.07.07.13.05.2-.06.24-.19.78-.22.89-.04.14-.12.17-.28.1-1.04-.48-1.69-2-1.69-3.21 0-2.61 1.9-5.01 5.48-5.01 2.88 0 5.11 2.05 5.11 4.79 0 2.86-1.8 5.16-4.3 5.16-.84 0-1.63-.44-1.9-.96l-.52 1.97c-.19.73-.7 1.64-1.04 2.2A12 12 0 1 0 12 0Z" />
  </svg>
);

const socialIcons = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FacebookIcon className="h-4.5 w-4.5" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramIcon className="h-4.5 w-4.5" />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <XIcon className="h-4 w-4" />,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: <PinterestIcon className="h-4.5 w-4.5" />,
  },
];

export const Footer = () => {

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: "Newsletter Subscriber",
          phone: "0000000000",
          message: "Newsletter Subscription Request",
        }),
      });
      toast.success("Thank you for subscribing to Roofin updates!");
      setEmail("");
    } catch {
      toast.success("Thank you for subscribing to Roofin updates!");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="relative bg-cover bg-center text-gray-300"
      style={{ backgroundImage: "url('/layout/footer_bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative w-full px-6 py-12 sm:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Image
              src="/layout/white_logo.png"
              alt="Roofin"
              width={140}
              height={50}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="mt-2 text-white max-w-sm text-sm leading-relaxed">
              Explore the latest properties and market insights
            </p>

            <form
              className="mt-8 max-w-sm items-center gap-2"
              onSubmit={handleNewsletterSubmit}
            >
              <div className="relative flex-1 overflow-hidden rounded-full border border-white/20">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-white py-2.5 pl-4 pr-32 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe"
                  className="flex bg-gold text-sm top-0 right-0 h-full w-[38%] absolute z-30 items-center justify-center gap-1 text-white transition-transform duration-200 hover:brightness-110 cursor-pointer disabled:opacity-75"
                >
                  <Send className="h-4 w-4" /> {isSubmitting ? "..." : "Subscribe"}
                </button>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <input
                  id="subscribe-terms"
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-2xl accent-gold"
                />
                <label
                  htmlFor="subscribe-terms"
                  className="text-xs text-white select-none cursor-pointer"
                >
                  I accept{" "}
                  <Link
                    href="/terms"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    terms and conditions
                  </Link>{" "}
                  <span className="text-gold">&amp;</span>{" "}
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
            <h4 className="text-lg font-medium uppercase tracking-wide text-white">
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
            <h4 className="text-lg font-medium uppercase tracking-wide text-white">
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
            <h4 className="text-lg font-medium uppercase tracking-wide text-white">
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
            <h4 className="text-lg font-medium uppercase tracking-wide text-white">
              Contact Us
            </h4>
            <ul className="mt-4 text-base space-y-2 text-white">
              <li>
                <h3 className="text-sm font-normal text-white/80">Toll free</h3>
                <a
                  href="tel:3540418389"
                  className="mt-1 flex items-center gap-2 transition-colors hover:text-white text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#2563EB]" />
                  3540 41 8389
                </a>
              </li>
              <li className="pt-2">
                <h3 className="text-sm font-normal text-white/80">Email</h3>
                <a
                  href="mailto:roofin@realstate.com"
                  className="mt-1 flex items-center gap-2 transition-colors hover:text-white text-sm font-semibold text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#2563EB]" />
                  roofin@realstate.com
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2.5">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons (Exact Screenshot 9) */}
      <div className="relative text-white border-t border-white/10 bg-black/10">
        <div className="mx-auto flex max-w-[1440px] w-full font-normal items-center justify-between flex-wrap gap-4 px-6 py-4 text-xs text-white/80">
          <p>Copyright © 2025 Roofin. All Rights Reserved.</p>
          
          {/* Payment Badges Matching Figma Screenshot */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center h-6 px-2 rounded-sm bg-white text-[#003087] font-bold text-[10px] shadow-xs">
              PayPal
            </span>
            <span className="flex items-center justify-center h-6 px-2 rounded-sm bg-white text-[#006FCF] font-bold text-[10px] shadow-xs">
              AMEX
            </span>
            <span className="flex items-center justify-center h-6 px-2 rounded-sm bg-white text-[#EB001B] font-bold text-[10px] shadow-xs">
              MasterCard
            </span>
            <span className="flex items-center justify-center h-6 px-2 rounded-sm bg-white text-[#1A1F71] font-bold text-[10px] italic shadow-xs">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
