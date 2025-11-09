"use client";

import * as React from "react";
import { NEWS_ITEMS } from "@/data/news.mock";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsCarousel() {
  const [index, setIndex] = React.useState(0);
  const items = NEWS_ITEMS.slice(0, 8);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 2) % items.length);
    }, 4000);
    return () => clearInterval(id);
  }, [items.length]);

  const visible = [items[index], items[(index + 1) % items.length]];

  return (
    <div className="mt-6 rounded-2xl border border-line/60 bg-white p-3 shadow-elevation-sm">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Latest News</h2>
        <Link href="/updates" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${visible[0]?.id}-${visible[1]?.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 grid grid-cols-2 gap-3"
          >
            {visible.map((current) => (
              <div key={current.id} className="grid grid-cols-[120px_1fr] gap-3">
                <div className="relative h-full w-full">
                  <Image
                    src={current.imageSrc}
                    alt={current.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-muted">{new Date(current.publishedAt).toLocaleString()}</div>
                  <Link href={current.href} className="text-base font-semibold text-primary hover:underline">
                    {current.title}
                  </Link>
                  <p className="mt-1 line-clamp-3 text-sm text-neutral-700">{current.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1">
        {Array.from({ length: Math.ceil(items.length / 2) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex((i * 2) % items.length)}
            className={`h-2 w-2 rounded-full ${i === Math.floor(index / 2) ? "bg-primary" : "bg-ink/20"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


