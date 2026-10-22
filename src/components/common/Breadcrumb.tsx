import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb, BreadcrumbProps } from "@/types";

export const Breadcrumb = ({
  items,
  separatorIcon = true,
}: BreadcrumbProps) => {
  return (
    <nav
      className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] text-[#64748B]"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 && separatorIcon && (
              <ChevronRight className="h-3.5 w-3.5 text-[#64748B] stroke-[2]" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#1865F2] transition-colors font-normal text-[#64748B]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-normal text-[#64748B]">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};
