"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useNewsCenter } from "@/context/NewsCenterContext";
import { NEWS_ITEMS } from "@/data/news.mock";

export default function NewsCenterSheet() {
  const { isOpen, setOpen } = useNewsCenter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[110] h-full w-[min(96vw,520px)] bg-white dark:bg-neutral-900 shadow-elevation-md border-l border-neutral-200/70 dark:border-neutral-800 flex flex-col"
            initial={{ x: 520 }}
            animate={{ x: 0 }}
            exit={{ x: 520 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <header className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800 px-4 py-3">
              <h2 className="text-base font-semibold">Latest News & Updates</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="p-4 space-y-3 overflow-y-auto">
              {NEWS_ITEMS.slice(0, 6).map((n) => (
                <article key={n.id} className="flex gap-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800 p-2">
                  <div className="relative h-20 w-32 overflow-hidden rounded">
                    <Image src={n.imageSrc} alt={n.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-neutral-500" suppressHydrationWarning>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "UTC",
                      }).format(new Date(n.publishedAt))}
                    </div>
                    <h3 className="text-sm font-semibold">{n.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{n.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


