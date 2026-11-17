"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  List,
  Share2,
  UserRound,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import { ALL_ARTICLES } from "@/data/blogs";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogDetails() {
  const params = useParams<{ name: string }>();
  const rawParam = typeof params?.name === "string" ? params.name : "";

  const article = useMemo(() => {
    let decoded = rawParam;
    try {
      decoded = decodeURIComponent(rawParam);
    } catch { }

    const normalized = toSlug(decoded);

    return (
      ALL_ARTICLES.find(
        (item) =>
          item.slug === decoded ||
          item.slug === normalized ||
          toSlug(item.title) === normalized
      ) || null
    );
  }, [rawParam]);

  const { contentHtml, toc } = useMemo(() => {
    if (!article) {
      return {
        contentHtml: "",
        toc: [] as { id: string; label: string }[],
      };
    }

    const items: { id: string; label: string }[] = [];
    const parsedHtml = article.description.replace(
      /<h([23])>(.*?)<\/h\1>/g,
      (_match, level: string, inner: string) => {
        const label = inner.replace(/<[^>]*>/g, "").trim();
        const id = `${article.slug}-${toSlug(label)}`;
        items.push({ id, label });
        return `<h${level} id="${id}">${inner}</h${level}>`;
      }
    );

    return { contentHtml: parsedHtml, toc: items };
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];

    const others = ALL_ARTICLES.filter((item) => item.slug !== article.slug);

    return [
      ...others.filter((item) => item.category === article.category),
      ...others.filter((item) => item.category !== article.category),
    ].slice(0, 3);
  }, [article]);

  const handleShare = async () => {
    if (!article) return;

    const url =
      typeof window !== "undefined" ? window.location.href : "";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: article.title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      toast.success("Article link copied to clipboard");
    } catch {
      toast.error("Unable to share this article right now");
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1865F2]/10 text-[#1865F2]">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Article not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The article you are looking for may have been moved or removed.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1865F2] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <section className="bg-gradient-to-r from-[#0B132B] via-[#102A54] to-[#1865F2] text-white pt-10 sm:pt-14 pb-24 sm:pb-28 px-4 sm:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20 text-[#60A5FA]">
            <BookOpen className="h-4 w-4" />
            <span className="uppercase">{article.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <UserRound className="h-4 w-4" />
              <span>{article.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 w-full min-w-0">
            <div className="relative h-64 sm:h-80 md:h-[420px] w-full overflow-hidden rounded-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <article className="w-full py-8 sm:py-10">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 sm:px-8 py-6 sm:py-8 shadow-xs">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#1865F2]">
                    {article.category}
                  </span>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share article"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                <div
                  className="text-slate-600 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:scroll-mt-6 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:scroll-mt-6 [&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-7 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-[15px] [&_li]:leading-7 [&_li]:text-slate-600 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_a]:text-[#1865F2] [&_a]:underline [&_img]:my-6 [&_img]:w-full [&_img]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#1865F2] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="flex items-center gap-2 text-sm font-black text-[#0B132B]">
                <List className="h-4 w-4 text-[#1865F2]" />
                Table of Contents
              </h2>

              <nav className="mt-4 space-y-1">
                {toc.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-[#1865F2]/5 hover:text-[#1865F2]"
                  >
                    <span className="shrink-0 font-black text-[#1865F2]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865F2] hover:text-blue-800 transition-colors"
                >
                  Browse all articles
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-1.5 rounded-full bg-[#05A579]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
              Related <span className="text-[#1865F2]">Articles</span>
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#1865F2] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-[#1865F2] transition-colors">
                    {item.title}
                  </h3>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1865F2]">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
