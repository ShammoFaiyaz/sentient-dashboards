"use client";

import * as React from "react";
import { NEWS_ITEMS } from "@/data/news.mock";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type RawItem = Record<string, any>;
type Item = { id: string | number; title: string; href: string; imageUrl: string };

function mapItem(r: RawItem, i: number): Item {
  const title = r.title ?? r.headline ?? r.name ?? `News ${i + 1}`;
  const href = r.href ?? r.url ?? r.link ?? "#";
  const imageUrl = r.imageUrl ?? r.image ?? r.cover ?? r.thumbnail ?? r.imageSrc ?? "/news/placeholder.jpg";
  const id = r.id ?? r.slug ?? `${i}`;
  return { id, title, href, imageUrl };
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

export default function NewsCarousel() {
  const normalized = React.useMemo(() => NEWS_ITEMS.slice(0, 10).map(mapItem), []);
  const slides = React.useMemo(() => chunk2(normalized), [normalized]);
  const [idx, setIdx] = React.useState(0);
  const hoverRef = React.useRef(false);

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
    <div className="mt-6 rounded-2xl border border-line/60 bg-white p-3 shadow-elevation-sm dark:bg-slate-900">
      <div className="mb-2 flex items-center justify-between px-1 md:px-2">
        <h2 className="text-lg font-semibold text-primary">Latest News</h2>
        <Link href={viewAllHref} className="text-sm text-primary hover:underline">
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
                <Link key={n.id} href={n.href} className="group relative block h-full overflow-hidden rounded-xl">
                  <Image
                    src={n.imageUrl}
                    alt={n.title}
                    fill
                    priority={false}
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/65 transition group-hover:bg-black/75" />
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
              className={`h-2.5 w-2.5 rounded-full transition ${i === idx ? "bg-primary" : "bg-ink/20 dark:bg-slate-600"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

