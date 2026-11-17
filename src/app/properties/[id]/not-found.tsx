import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md text-center">
        <p className="text-7xl font-black tracking-tight text-slate-200 sm:text-8xl">
          404
        </p>

        <div className="mx-auto mt-6 h-px w-12 bg-slate-300" />

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Property not found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          This property is no longer available or the link may be incorrect.
          Explore more verified listings instead.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/properties"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
