"use client";

import * as React from "react";
import { NEWS_ITEMS } from "@/data/news.mock";
import { NEWS_BY_NICHE } from "@/data/niche.news";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { NewsItem } from "@/types/news";

type RawItem = Record<string, any>;
type Item = { id: string | number; title: string; href: string; imageUrl: string; raw: RawItem };

function mapItem(r: RawItem, i: number): Item {
  const title = r.title ?? r.headline ?? r.name ?? `News ${i + 1}`;
  const href = r.href ?? r.url ?? r.link ?? "#";
  const imageUrl = r.imageUrl ?? r.image ?? r.cover ?? r.thumbnail ?? r.imageSrc ?? "/news/placeholder.jpg";
  const id = r.id ?? r.slug ?? `${i}`;
  return { id, title, href, imageUrl, raw: r };
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

export default function NewsCarousel() {
  const pathname = usePathname();
  const nicheKey = React.useMemo(() => {
    if (!pathname) return "";
    const first = pathname.split("/").filter(Boolean)[0] ?? "";
    // Only switch when inside a niche dashboard; fallback to SU news otherwise
    return [ "insurance-dashboard", "healthcare-dashboard", "fintech-dashboard", "retail-dashboard", "hospitality-dashboard" ].includes(first) ? first : "";
  }, [pathname]);

  const source = React.useMemo(() => {
    if (nicheKey && NEWS_BY_NICHE[nicheKey]) return NEWS_BY_NICHE[nicheKey];
    return NEWS_ITEMS;
  }, [nicheKey]);

  const normalized = React.useMemo(() => source.slice(0, 10).map(mapItem), [source]);
  const slides = React.useMemo(() => chunk2(normalized), [normalized]);
  const [idx, setIdx] = React.useState(0);
  const hoverRef = React.useRef(false);
  const [openItem, setOpenItem] = React.useState<NewsItem | null>(null);

  const viewAllHref = "/updates"; // existing listing route in this app

  const next = React.useCallback(() => setIdx((i) => (i + 1) % Math.max(slides.length, 1)), [slides.length]);
  const prev = React.useCallback(() => setIdx((i) => (i - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1)), [slides.length]);

  React.useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      if (!hoverRef.current) next();
    }, 7000);
    return () => clearInterval(id);
  }, [slides.length, next]);

  if (!slides.length) return null;

  return (
    <div
      className="mt-6 rounded-2xl border border-line/60 p-3 shadow-elevation-sm"
      style={{
        backgroundImage: "url(/latest-news-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-2 flex items-center justify-between px-1 md:px-2">
        <h2 className="text-lg font-semibold text-white">Latest News</h2>
        <Link href={viewAllHref} className="text-sm text-white hover:underline">
          View all
        </Link>
      </div>

      <div
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        {/* Arrows (md+) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center pl-3 md:flex">
          <button
            onClick={prev}
            aria-label="Previous"
            className="pointer-events-auto select-none h-full px-2 text-3xl text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:text-5xl"
          >
            ‹
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center pr-3 md:flex">
          <button
            onClick={next}
            aria-label="Next"
            className="pointer-events-auto select-none h-full px-2 text-3xl text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:text-5xl"
          >
            ›
          </button>
        </div>

        {/* Slide viewport */}
        <div className="relative h-[220px] sm:h-[260px] md:h-[300px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="grid h-full grid-cols-1 gap-3 md:grid-cols-2"
            >
              {slides[idx]?.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  className="group relative block h-full overflow-hidden rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    // Prefer full NewsItem shape when present
                    const raw = n.raw as Partial<NewsItem>;
                    const itm: NewsItem = {
                      id: String(n.id),
                      title: raw.title ?? n.title,
                      description: raw.description ?? "",
                      tag: (raw.tag as any) ?? "Announcement",
                      imageSrc: (raw.imageSrc as any) ?? n.imageUrl,
                      href: raw.href ?? n.href,
                      publishedAt: raw.publishedAt ?? new Date().toISOString(),
                      author: raw.author,
                      content: (raw.content as any) ?? [],
                      sources: (raw.sources as any) ?? [],
                    };
                    setOpenItem(itm);
                  }}
                >
                  <Image
                    src={n.imageUrl}
                    alt={n.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/55 transition group-hover:bg-black/70" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 md:p-5">
                    <h4 className="text-center text-xl font-bold tracking-tight text-white [text-transform:uppercase] md:text-2xl">
                      {n.title}
                    </h4>
                  </div>
                </Link>
              ))}
              {slides[idx]?.length === 1 && <div className="hidden md:block" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 py-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`p-0 !min-h-0 leading-none aspect-square h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition ${i === idx ? "bg-neutral-300" : "bg-white"}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenItem(null)}
        >
          {/* Minimal always-visible close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenItem(null);
            }}
            aria-label="Close"
            title="Close"
            className="fixed right-6 top-6 z-[60] inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-ink shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            ×
          </button>
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-line/60 bg-white shadow-elevation-sm dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full">
              <Image src={openItem!.imageSrc} alt={openItem!.title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-5 md:p-6">
              {(() => {
                const oi = openItem as NewsItem;
                // Pad content to at least 300 words for a richer modal article
                function ensureMinWords(paras: string[], minWords: number): string[] {
                  const out = [...paras];
                  const mk = (i: number) =>
                    `This update, “${oi.title}”, provides additional context and guidance for users across this dashboard. ` +
                    `It explains why the change matters, how to take advantage of it immediately, and where to find supporting resources. ` +
                    `We emphasize practical next steps, guardrails, and the value this improvement brings to day‑to‑day workflows. ` +
                    `Paragraph ${i + 1} includes more examples and tips so that teams can act confidently.`;
                  const mk2 =
                    `The article also clarifies ownership and decision paths, making it easier to escalate questions or share feedback. ` +
                    `The agent‑assisted workflows described here aim to reduce toil and highlight high‑impact decisions, ` +
                    `while keeping humans in control and maintaining a strong audit trail.`;
                  const mk3 =
                    `For teams adopting this feature, we recommend piloting with a small, representative set of tasks first. ` +
                    `Capture metrics such as time saved, error rates, and user sentiment to guide wider rollout.`;
                  const fillers = [mk, () => mk2, () => mk3];
                  let words = out.join(" ").split(/\s+/).filter(Boolean).length;
                  let i = 0;
                  while (words < minWords) {
                    const f = fillers[i % fillers.length];
                    out.push(typeof f === "function" ? (f as any)(i) : (f as string));
                    words = out.join(" ").split(/\s+/).filter(Boolean).length;
                    i += 1;
                  }
                  return out;
                }
                const core = oi.content && oi.content.length > 0 ? oi.content : [oi.description];
                const padded = ensureMinWords(core, 300);
                const readingMins = Math.max(1, Math.ceil(padded.join(" ").split(/\s+/).filter(Boolean).length / 200));
                return (
                  <>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {oi.tag}
                      </span>
                      {oi.author && (
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">{oi.author}</span>
                      )}
                      <span className="text-xs text-neutral-500" suppressHydrationWarning>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        }).format(new Date(oi.publishedAt))}
                      </span>
                      <span className="text-xs text-neutral-500">{readingMins} min read</span>
                    </div>
                    <h3 className="text-2xl font-medium text-primary">{oi.title}</h3>
                    {/* Author section under the title (requested) */}
                    <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                      By {oi.author ?? "Editorial Team"}
                    </div>
                    <div className="prose mt-3 max-w-none text-neutral-700 prose-p:my-3 dark:text-neutral-300">
                      {padded.map((p, i) => (
                        <p key={i} className="whitespace-pre-line">
                          {p}
                        </p>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

