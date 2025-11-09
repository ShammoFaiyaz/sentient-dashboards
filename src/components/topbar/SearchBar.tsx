"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="hidden items-center gap-2 pr-2 md:flex">
      <input
        aria-label="Search"
        type="search"
        placeholder="Search agents, courses, news…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-[260px] rounded-full border border-line/60 bg-white px-3 py-1 text-sm outline-none placeholder:text-muted focus:border-primary md:w-[320px]"
      />
    </form>
  );
}


