import Link from "next/link";
import { cn } from "@/lib/utils";

type FormCardProps = {
  title: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function FormCard({
  title,
  description,
  footer,
  children,
  className,
}: FormCardProps) {
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
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="p-6 pt-0">{children}</div>
      {footer && (
        <div className="flex items-center justify-center p-6 pt-0">{footer}</div>
      )}
    </div>
  );
}
