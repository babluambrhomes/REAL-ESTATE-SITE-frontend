import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb, BreadcrumbProps } from "@/types";

export const Breadcrumb = ({
  items,
  separatorIcon = true,
}: BreadcrumbProps) => {
  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-[12px] text-gray-800"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1">
            {index > 0 &&
               <ChevronRight className="h-4 w-4 " /> 
                
              }
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className=" hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className=""
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};
