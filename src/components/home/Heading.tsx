import Link from "next/link";
import { MoveUpRight } from "lucide-react";

type HeadingProps = {
  title1?: string;
  title2?: string;
  title1Color?: string;
  title2Color?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllHref?: string;
};

export const Heading = ({
  title1,
  title2,
  title1Color ='#111827',
  title2Color ='#2563EB',
  subtitle,
  viewAllText = "View All",
  viewAllHref,
}: HeadingProps) => {
  return (
    <section className="mx-auto w-full px-6 pt-10 pb-6 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-3xl border-l-4 border-secondary pl-3">
          <h2 className="flex gap-1  text-2xl font-bold text-gray-900 ">
            {title1 && (
              <span style={title1Color ? { color: title1Color } : undefined}>
                {title1}
              </span>
            )}
            {title2 && (
              <span style={title2Color ? { color: title2Color } : undefined}>
                {title2}
              </span>
            )}
          </h2>
          {subtitle && (
            <p className=" text-sm text-gray-500 sm:text-base">{subtitle}</p>
          )}
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center font-normal gap-1.5 rounded-full border-[1px] border-primary bg-white px-3 py-1 text-primary shadow-inner shadow-primary/20 transition-colors hover:text-secondary"
          >
            {viewAllText}
            <MoveUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
};
