"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { NEWS_ITEMS } from "@/data/news.mock";

export default function UpdatesPage() {
  const items = [...NEWS_ITEMS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return (
    <div className="mx-auto max-w-7xl px-2 py-4">
      {/* <h1 className="text-2xl font-semibold text-primary">Latest News & Updates</h1> */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((n) => (
          <Card key={n.id}>
            <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image src={n.imageSrc} alt={n.title} fill className="object-cover" />
            </div>
            {/* timestamp removed per request */}
            <CardTitle className="mt-0.5">{n.title}</CardTitle>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{n.description}</p>
            <div className="mt-3">
              <Link href={n.href} className="text-sm text-primary hover:underline">
                Read more →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


