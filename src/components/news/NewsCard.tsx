"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types/news";
import { cn } from "@/components/ui/Button";
import * as React from "react";

export default function NewsCard({ item }: { item: NewsItem }) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	const isNew = mounted && Date.now() - new Date(item.publishedAt).getTime() < 48 * 60 * 60 * 1000;

	return (
		<Link
			href={item.href}
			aria-label={item.title}
			className={cn(
				"group overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
			)}
		>
			<div className="relative aspect-[16/9] w-full">
				<Image
					src={item.imageSrc}
					alt={item.title}
					fill
					sizes="(min-width: 1024px) 33vw, 100vw"
					className="object-cover"
					priority={false}
				/>
				<div className="absolute left-3 top-3 flex items-center gap-2">
					<span className="rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">{item.tag}</span>
					{isNew && <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">New</span>}
				</div>
			</div>
			<div className="p-4">
				<h3 className="text-base font-semibold leading-tight group-hover:underline">{item.title}</h3>
				<p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
				<div className="mt-3 text-xs text-neutral-500" suppressHydrationWarning>
					{new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "short",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
						timeZone: "UTC",
					}).format(new Date(item.publishedAt))}
				</div>
			</div>
		</Link>
	);
}


