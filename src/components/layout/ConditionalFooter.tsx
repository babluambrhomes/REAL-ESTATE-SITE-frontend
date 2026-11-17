"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/contactupdate",
];

export function ConditionalFooter() {
  const pathname = usePathname();

  const isAuthPage = AUTH_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  if (isAuthPage) {
    return null;
  }

  return <Footer />;
}
