import Link from "next/link";
import { cn } from "@/lib/utils";

type MessageCardProps = {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function MessageCard({
  icon,
  title,
  description,
  children,
  className,
}: MessageCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-1.5 p-6 text-center">
        <Link href="/" className="mb-2 block text-2xl font-bold text-primary">
          AmbrHomes
        </Link>
        {icon && (
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {children != null && <div className="p-6 pt-0">{children}</div>}
    </div>
  );
}
