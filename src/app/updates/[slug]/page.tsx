"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { NEWS_ITEMS } from "@/data/news.mock";
import { Card, CardTitle } from "@/components/ui/Card";

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const item = useMemo(() => {
    const slug = params.slug;
    return (
      NEWS_ITEMS.find((n) => n.href?.endsWith(`/updates/${slug}`)) ??
      NEWS_ITEMS.find((n) => n.href?.split("/").pop() === slug)
    );
  }, [params.slug]);

  const content = item?.content && item.content.length > 0 ? item.content : item ? [item.description] : [];

  function ensureMinWords(paras: string[], minWords: number): string[] {
    const out = [...paras];
    const mk = (i: number) =>
      `This is a demo article for “${item?.title ?? "Update"}” in the ${item?.tag ?? "News"} category. ` +
      `It provides additional narrative context suitable for presentation on a university site. ` +
      `The focus is on giving readers a clear sense of what is changing, why it matters, and how to take action. ` +
      `In practice, this section would include quotes from ${item?.author ?? "the relevant office"}, short examples, and links to resources. ` +
      `We emphasize responsible use, accessibility, and student success. Paragraph ${i + 1} expands on logistics, timelines, and next steps while remaining readable for a general audience.`;
    const mk2 =
      `Beyond logistics, this update underscores our commitment to thoughtful adoption of AI across teaching, research, and operations. ` +
      `We frame changes in terms of benefits for students and faculty—clearer expectations, improved support, and better access to tools. ` +
      `Readers should leave with confidence about what decisions were made, who to contact for help, and where to find documentation. ` +
      `Instructors can adapt materials to their courses, while students understand how the change affects day‑to‑day learning.`;
    const mk3 =
      `Implementation guidance often makes the difference between a good idea and a successful rollout. ` +
      `Accordingly, we outline concrete steps, sample communications, and tips for minimizing disruption. ` +
      `We also invite feedback so future iterations reflect real classroom experience. ` +
      `For events or workshops, we recommend a short pre‑read, a hands‑on activity, and a follow‑up survey to capture outcomes.`;
    const mk4 =
      `Equity and inclusion are at the center of this work. ` +
      `All resources are designed to be accessible, with multiple formats and captioned media. ` +
      `We aim to remove barriers to participation and to recognize the diverse needs of our community. ` +
      `Questions and suggestions are always welcome through the listed channels.`;

    let words = out.join(" ").split(/\s+/).filter(Boolean).length;
    let i = 0;
    const fillers = [mk, () => mk2, () => mk3, () => mk4];
    while (words < minWords) {
      const f = fillers[i % fillers.length];
      out.push(typeof f === "function" ? (f as any)(i) : (f as string));
      words = out.join(" ").split(/\s+/).filter(Boolean).length;
      i += 1;
    }
    return out;
  }

  const paddedContent = ensureMinWords(content, 300);
  const wordCount = paddedContent.join(" ").split(/\s+/).filter(Boolean).length;
  const readingMins = Math.max(1, Math.ceil(wordCount / 200));
  const dateStr =
    item
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "UTC",
        }).format(new Date(item.publishedAt))
      : "";

  if (!item) {
    return (
      <div className="mx-auto max-w-7xl px-2 py-6">
        <Card>
          <CardTitle>Update not found</CardTitle>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            The requested news item could not be located.
          </p>
          <div className="mt-4">
            <Link href="/updates" className="text-sm text-primary hover:underline">
              Back to updates →
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line/60 bg-white shadow-elevation-sm dark:bg-slate-900">
        <div className="relative aspect-[16/9] w-full">
          <Image src={item.imageSrc} alt={item.title} fill className="object-cover" priority />
        </div>
        <div className="p-5 md:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {item.tag}
            </span>
            {item.author && (
              <span className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink/10 text-[10px] font-semibold text-ink/80">
                  {item.author.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                </span>
                {item.author}
              </span>
            )}
            <span className="text-xs text-neutral-500" suppressHydrationWarning>{dateStr}</span>
            <span className="text-xs text-neutral-500">{readingMins} min read</span>
          </div>
          <h1 className="text-2xl font-medium text-primary">{item.title}</h1>
          <div className="prose mt-3 max-w-none text-neutral-700 prose-p:my-3 dark:text-neutral-300">
            {paddedContent.map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/updates" className="text-sm text-primary hover:underline">
              ← Back to all updates
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


